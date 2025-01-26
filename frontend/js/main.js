import {fetchStation} from './api.js'; //import는 최상단에.
window.onload = function() { //html의 DOM이 모두 로드 된 후에 js실행할 수 있게 함.

    function createLineImg(mapContainer, data){
        data.forEach(element => {
            let lineImg = document.createElement('img'); 
            lineImg.id = element.id; 
            lineImg.className = 'lineImg'
            lineImg.src = element.src;
            mapContainer.appendChild(lineImg);
        });
    }
    function deleteLineImg (mapContainer, lineIds){
        lineIds.forEach(id =>{
            const lineImg = document.getElementById(id);
            mapContainer.removeChild(lineImg);
        })
    }
    
    //서울 맵핀
    document.getElementById('seoul').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'gyeongbuLine', src: 'assets/image/gyeongbu.png'},
            {id: 'gyeongjeonLine', src: 'assets/image/gyeongjeon.png'},
            {id: 'gangneungLine', src: 'assets/image/gangneung.png'},
            {id: 'jungang', src: 'assets/image/jungang.png'}
            ]);
    })
    document.getElementById('seoul').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, ['gyeongbuLine', 'gyeongjeonLine', 'gangneungLine', 'jungangLine']);
    })
    //용산 맵핀
    document.getElementById('yongsan').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'honamLine', src: 'assets/image/honam.png'},
            {id: 'jeonraLine', src: 'assets/image/jeonra.png'},
            ]);
    })
    document.getElementById('yongsan').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, ['honamLine', 'jeonraLine']);
    })
    
    //수원 맵핀
    document.getElementById('suwon').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'gyeongbuLine', src: 'assets/image/gyeongbu.png'},
            ]);
    })
    document.getElementById('suwon').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, ['gyeongbuLine']);
    })
    //오송 맵핀
    document.getElementById('osong').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'gyeongbuLine', src: 'assets/image/gyeongbu.png'},
            {id: 'gyeongjeonLine', src: 'assets/image/gyeongjeon.png'},
            {id: 'honamLine', src: 'assets/image/honam.png'},
            {id: 'jeonraLine', src: 'assets/image/jeonra.png'}
            ]);
    })
    document.getElementById('osong').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, 
            ['gyeongbuLine', 'gyeongjeonLine', 'honamLine', 'jeonraLine']
        );
    })
    //광주송정 맵핀
    document.getElementById('gwangjusongjeong').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'honamLine', src: 'assets/image/honam.png'}
            ]);
    })
    document.getElementById('gwangjusongjeong').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, ['honamLine']);
    })
    //부산 맵핀
    document.getElementById('pusan').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        createLineImg(mapContainer, [
            {id: 'gyeongbuLine', src: 'assets/image/gyeongbu.png'}
            ]);
    })
    document.getElementById('pusan').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        deleteLineImg(mapContainer, ['gyeongbuLine']);
    })
    const input = document.getElementById('searchInput');
    input.addEventListener('keyup', async (event) =>{ //html에서 onkeyup말고 js에서 이벤트처리해야 유지보수하기 좋음.
        if(event.key == 'Enter'){
            fetchStation(input.value).then(response =>{
                console.log(response); //ok
            });
        }
    }) 
}