//main에서의 검색어 입력정보를 받아온다.
//서버로 넘겨준다.
//서버에서는 mock데이터를 넘겨준다.
//받은 mock데이터를 main.js로 넘겨준다.
//main.js에서 결과 역을 지도 위에 표시한다.

export async function fetchStation(departure){
    //GET 서울역에서 갈 수 있는 역 리스트로..
    const response = await fetch(`http://localhost:8080?departure=${departure}`); //뭐값넘겨준게 없음. stationName어떻게 넘겨?
    const data = await response.json(); 
    return data;
}