
window.onload = function() { //html의 DOM이 모두 로드 된 후에 js실행할 수 있게 함.
    //서울 맵핀
    document.getElementById('seoul').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        //innerHTML은 기존 요소 리셋해버림, 요소 생성 후 직접 접근 불가
        //그래서 createElement&append 사용해야함.
        const gyeongbuLineImg = document.createElement('img'); 
        gyeongbuLineImg.id = 'gyeongbuLine';
        gyeongbuLineImg.className = 'lineImg'
        gyeongbuLineImg.src = 'image/gyeongbu.png';
        
        const gyeongjeonLineImg = document.createElement('img'); 
        gyeongjeonLineImg.id = 'gyeongjeonLine';
        gyeongjeonLineImg.className = 'lineImg'
        gyeongjeonLineImg.src = 'image/gyeongjeon.png';

        const gangneungLineImg = document.createElement('img'); 
        gangneungLineImg.id = 'gangneungLine';
        gangneungLineImg.className = 'lineImg'
        gangneungLineImg.src = 'image/gangneung.png';

        const jungangLineImg = document.createElement('img'); 
        jungangLineImg.id = 'jungangLine';
        jungangLineImg.className = 'lineImg'
        jungangLineImg.src = 'image/jungang.png';

        mapContainer.appendChild(gyeongbuLineImg); //appendChild는 문자열x, 노드만 삽입 가능
        mapContainer.appendChild(gyeongjeonLineImg); 
        mapContainer.appendChild(gangneungLineImg); 
        mapContainer.appendChild(jungangLineImg); 
    })
    document.getElementById('seoul').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const gyeongbuLineImg = document.getElementById('gyeongbuLine');
        const gyeongjeonLineImg = document.getElementById('gyeongjeonLine');
        const gangneungLineImg = document.getElementById('gangneungLine');
        const jungangLineImg = document.getElementById('jungangLine');
        
        mapContainer.removeChild(gyeongbuLineImg);       
        mapContainer.removeChild(gyeongjeonLineImg);  
        mapContainer.removeChild(gangneungLineImg); 
        mapContainer.removeChild(jungangLineImg);    
    })
    //용산 맵핀
    document.getElementById('yongsan').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const honamLineImg = document.createElement('img'); 
        honamLineImg.id = 'honamLine';
        honamLineImg.className = 'lineImg'
        honamLineImg.src = 'image/honam.png';

        const jeonraLineImg = document.createElement('img'); 
        jeonraLineImg.id = 'jeonraLine';
        jeonraLineImg.className = 'lineImg'
        jeonraLineImg.src = 'image/jeonra.png';
        
        

        mapContainer.appendChild(honamLineImg); //appendChild는 문자열x, 노드만 삽입 가능
        mapContainer.appendChild(jeonraLineImg); 
     
    })
    document.getElementById('yongsan').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const honamLineImg = document.getElementById('honamLine');
        const jeonraLineImg = document.getElementById('jeonraLine');
        
        mapContainer.removeChild(honamLineImg);       
        mapContainer.removeChild(jeonraLineImg);  
 
    })
    
    //수원 맵핀
    document.getElementById('suwon').addEventListener('mouseenter', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        //innerHTML은 기존 요소 리셋해버림, 요소 생성 후 직접 접근 불가
        //그래서 createElement&append 사용해야함.
        const gyeongbuLineImg = document.createElement('img'); 
        gyeongbuLineImg.id = 'gyeongbuLine';
        gyeongbuLineImg.className = 'lineImg'
        gyeongbuLineImg.src = 'image/gyeongbu.png';

        mapContainer.appendChild(gyeongbuLineImg); //appendChild는 문자열x, 노드만 삽입 가능
        console.log("mouse enter ing");
    })
    document.getElementById('suwon').addEventListener('mouseleave', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const gyeongbuLineImg = document.getElementById('gyeongbuLine');

        mapContainer.removeChild(gyeongbuLineImg);       

    })
    //오송 맵핀
    document.getElementById('osong').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        //innerHTML은 기존 요소 리셋해버림, 요소 생성 후 직접 접근 불가
        //그래서 createElement&append 사용해야함.
        const gyeongbuLineImg = document.createElement('img'); 
        gyeongbuLineImg.id = 'gyeongbuLine';
        gyeongbuLineImg.className = 'lineImg'
        gyeongbuLineImg.src = 'image/gyeongbu.png';
        
        const gyeongjeonLineImg = document.createElement('img'); 
        gyeongjeonLineImg.id = 'gyeongjeonLine';
        gyeongjeonLineImg.className = 'lineImg'
        gyeongjeonLineImg.src = 'image/gyeongjeon.png';

        const honamLineImg = document.createElement('img'); 
        honamLineImg.id = 'honamLine';
        honamLineImg.className = 'lineImg'
        honamLineImg.src = 'image/honam.png';

        const jeonraLineImg = document.createElement('img'); 
        jeonraLineImg.id = 'jeonraLine';
        jeonraLineImg.className = 'lineImg'
        jeonraLineImg.src = 'image/jeonra.png';
        
        mapContainer.appendChild(gyeongbuLineImg); //appendChild는 문자열x, 노드만 삽입 가능
        mapContainer.appendChild(gyeongjeonLineImg); 
        mapContainer.appendChild(honamLineImg); //appendChild는 문자열x, 노드만 삽입 가능
        mapContainer.appendChild(jeonraLineImg); 
    })
    document.getElementById('osong').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const gyeongbuLineImg = document.getElementById('gyeongbuLine');
        const gyeongjeonLineImg = document.getElementById('gyeongjeonLine');
        const honamLineImg = document.getElementById('honamLine');
        const jeonraLineImg = document.getElementById('jeonraLine');
        
        mapContainer.removeChild(gyeongbuLineImg);       
        mapContainer.removeChild(gyeongjeonLineImg);  
        mapContainer.removeChild(honamLineImg);       
        mapContainer.removeChild(jeonraLineImg);  
 
    })
    //광주송정 맵핀
    document.getElementById('gwangjusongjeong').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        //innerHTML은 기존 요소 리셋해버림, 요소 생성 후 직접 접근 불가
        //그래서 createElement&append 사용해야함.
        const honamLineImg = document.createElement('img'); 
        honamLineImg.id = 'honamLine';
        honamLineImg.className = 'lineImg'
        honamLineImg.src = 'image/honam.png';

        mapContainer.appendChild(honamLineImg); //appendChild는 문자열x, 노드만 삽입 가능
 
    })
    document.getElementById('gwangjusongjeong').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const honamLineImg = document.getElementById('honamLine');
        
        mapContainer.removeChild(honamLineImg);       
  
    })
    //부산 맵핀
    document.getElementById('pusan').addEventListener('mouseover', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        //innerHTML은 기존 요소 리셋해버림, 요소 생성 후 직접 접근 불가
        //그래서 createElement&append 사용해야함.
        const gyeongbuLineImg = document.createElement('img'); 
        gyeongbuLineImg.id = 'gyeongbuLine';
        gyeongbuLineImg.className = 'lineImg'
        gyeongbuLineImg.src = 'image/gyeongbu.png';

        mapContainer.appendChild(gyeongbuLineImg); //appendChild는 문자열x, 노드만 삽입 가능

    })
    document.getElementById('pusan').addEventListener('mouseout', (event) =>{
        const mapContainer = document.getElementById('mapContainer');

        const gyeongbuLineImg = document.getElementById('gyeongbuLine');
        
        mapContainer.removeChild(gyeongbuLineImg);       
        
    })
}