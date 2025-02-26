import { fetchDestinationNames } from './api.js'; //import는 최상단에.

const destCountPerPage = 8;

window.onload = async function(){
    //프로젝트가 작기 때문에 반복이 적을 것이라고 생각된다.
    //그래서 페이지 별로 대응하는 각 파일에서
    //해당 페이지의 이벤트 처리와 랜더링을 모두 담당한다.
    const searchInput = localStorage.getItem('searchInput');
    const destinationNames = await fetchDestinationNames(searchInput);
    const btnPages = document.getElementsByClassName('btn_page');

    renderSearchInput(searchInput);
    renderSidebar(searchInput, destinationNames);

    Array.from(btnPages).forEach(btnPage => {
        btnPage.addEventListener('click', (event) =>{
            console.log(btnPage.id);
            document.getElementById('destinations_container').innerHTML = '';
            renderDestinationOfCurrentPage(event.target, destinationNames);
        })
    });

    

    //seachbox 재 검색시 관련 이벤트 추가. 나머지 다시 Render
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
function getTotalPageCount(totalDestCount){
    return Math.ceil(totalDestCount / destCountPerPage);
}
function renderDestinationOfCurrentPage(btnPage, destinationNames){
    console.log('현재 페이지 렌더링 함수 실행중');
    const btnPageIndex = btnPage.id.slice(-1);

    for(let i = 0; i < destCountPerPage; i++){
        const li = document.createElement('li');
        const btnDestination = document.createElement('button');

        btnDestination.className = 'btn_destination';        
        btnDestination.textContent = destinationNames[destCountPerPage * btnPageIndex + i];

        document.getElementById('destinations_container').appendChild(li);
        li.appendChild(btnDestination);
    }
}