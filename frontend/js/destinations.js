import { fetchDestinationNames, fetchDestinationDetail, fetchDestinationMapPointPosition } from './api.js'; //import는 최상단에.
import MapPoint from '../component/mapPoint.js';


const destCountPerPage = 8;

window.onload = async function(){
    const searchInput = localStorage.getItem('searchInput');
    const destinationNames = await fetchDestinationNames(searchInput); //전체 여행지 목록.
    const btnPageElements = document.getElementsByClassName('btn_page'); 
    // const btnDestinationNameElements = document.getElementsByClassName('btn_destination'); 
    const destinationListContainer = document.getElementById('destinations_container');
    const xButton = document.getElementById('x_button');
    const mapPinButton = document.getElementById('map_pin_button');

    console.log(destinationListContainer);

    renderSearchInput(searchInput);
    renderSidebar(searchInput, destinationNames);

    Array.from(btnPageElements).forEach(btnPage => {
        btnPage.addEventListener('click', (event) =>{
            console.log(btnPage.id);
            document.getElementById('destinations_container').innerHTML = '';
            renderDestinationOfCurrentPage(event.target, destinationNames); 
        })
    });

    destinationListContainer.addEventListener('click', async (event) =>{
        if (event.target.className == 'btn_destination'){
            console.log(event.target); //ok
            const destinationName = event.target.textContent;
            console.log(destinationName); //ok
            
            //사이드바에 여행지를 누르면 열차 상세정보(기차명, 평균 소요 시간, 평균 비용) 객체 배열이 반환됨.
            const destinationDetail = await fetchDestinationDetail(searchInput, destinationName);
            console.log(destinationDetail);
            await showMapPoint(destinationName); //지도에 맵핀이랑 상세정보가 출력.
            showTrainDetailBox(destinationDetail);
        }
    });

    mapPinButton.addEventListener('click', () => {
        document.getElementById('train_detail_box').style.display = 'block';
    });

    xButton.addEventListener('click', () => {
        document.getElementById('train_detail_box').style.display = 'none';
    });

}

function renderSearchInput(searchInput){
    console.log(searchInput);
    document.getElementById('search_input').value = `${searchInput}역`;       
}
function renderSidebar(searchInput, destinationNames){
    renderSidebarTitle(searchInput);
    renderDestination(destinationNames); //처음 8개만..
    renderBtnPage(getTotalPageCount(destinationNames.length));    
}
function renderSidebarTitle(searchInput){
    document.getElementById('side_bar_title').textContent = `${searchInput}역에서 갈 수 있는 여행지`;
}
function renderDestination(destinationNames){
    console.log(destinationNames);
    const liContainer = document.getElementById('destinations_container');
    for(let i = 0; i < destCountPerPage; i++){
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = destinationNames[i];
        button.className = 'btn_destination';

        liContainer.appendChild(li);
        li.appendChild(button);
    }
}
//페이지네이션 관련 함수
function renderDestinationOfCurrentPage(btnPage, destinationNames){
    console.log('현재 페이지 렌더링 함수 실행중');
    const btnPageIndex = btnPage.id.slice(-1);

    for(let i = 0; i < destCountPerPage; i++){
        const li = document.createElement('li');
        const btnDestinationName = document.createElement('button');

        btnDestinationName.className = 'btn_destination';        
        btnDestinationName.textContent = destinationNames[destCountPerPage * btnPageIndex + i];

        document.getElementById('destinations_container').appendChild(li);
        li.appendChild(btnDestinationName);
    }
    document.getElementsByClassName('btn_destination');
}
function renderBtnPage(totalPageCount){
    const btnPageContainer = document.getElementById('btn_page_container');
    for(let i = 0; i < totalPageCount; i++){
        const btnPageWrap = document.createElement('div');
        const btnPage = document.createElement('button');
        
        btnPageWrap.className = 'btn_page_wrap';
        btnPage.id = 'page_index_' + `${i}`;
        btnPage.className = 'btn_page';

        btnPageContainer.appendChild(btnPageWrap);
        btnPageWrap.appendChild(btnPage);
    }
}
function getTotalPageCount ( totalDestCount ) {
    return Math.ceil(totalDestCount / destCountPerPage);
}

async function showMapPoint ( destinationName ) {
    console.log('showMapPoint함수 실행');
    //여행지를 누르면 지도상 위치 반환하고 그 위치로 화면에 출력됨.
    const position = await fetchDestinationMapPointPosition(destinationName); 
    console.log(position);
    //ex) position = { top: 76, left: 88 }
    MapPoint(destinationName, position);
}

function showTrainDetailBox ( destinationDetail ) {
    console.log('showTrainDetailBox 함수 진입');
    const mapPin = document.getElementById('map_pin_container'); 
    const detailBox = document.getElementById('train_detail_box');

    // detailBox.innerText = destinationDetail;

    const rect = mapPin.getBoundingClientRect(); //뷰포트 기준으로 계산함.
    detailBox.style.position = 'absolute';

    detailBox.style.top = `${(rect.top + window.scrollY)- 120}px`;
    detailBox.style.left = `${(rect.left + window.scrollX) - 240}px`;

    console.log(rect);
}