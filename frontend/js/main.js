window.onload = function(){ //html의 DOM이 모두 로드 된 후에 js실행할 수 있게 함.
    const input = document.getElementById('search_input');
    input.addEventListener('keyup', async (event) =>{ 
        if(event.key == 'Enter'){
            //!input.value말고도 없는 역을 검색했을때의 예외처리 해야함.
            if(!input.value){
                console.log("검색어를 다시 입력해주세요");
            }else{
                localStorage.setItem('searchInput', input.value);
                location.href = './pages/destinations.html';
            }
        }
    }) 
}