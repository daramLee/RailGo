// import axios from 'axios'; //서버에서 실행할 땐 활성화하기

export async function fetchDestinationNames(departure){
    //GET 서울역에서 갈 수 있는 역 리스트로..
    const response = await fetch(`http://localhost:8080?departure=${departure}`); 
    const data = await response.json(); 
    return data;
}

async function fetchDestinationDetail(departure, destination){ // ON! 
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo'; 
    //데이터 설정
    const queryParams = new URLSearchParams({
        // serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg%3D%3D', //인코딩 키
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json',
        depPlaceId : 'NAT750726', //임시
        arrPlaceId : 'NAT130126', //임시
        depPlandTime : '20250225' //임시
    }).toString();

    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    }); //서버에 요청
    console.log(JSON.stringify(response.data));
    // //도시코드 목록 조회 (출발역,도착역 도시 코드 조회)
    // fetchCityCodeList();
    // //시도별 기차역 목록 조회 (출발역,도착역 기차역 id 조회)
    // fetchStationIdsFromCityCode(11); //서울 도시 코드 전달, ktx이외의 일반 열차 정보도 전부 나옴 ㅡㅡ;;
    
}
//호출되는 메소드들
//시,도의 도시코드 목록 
async function fetchCityCodeList(){
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyCodeList';

    const queryParams = new URLSearchParams({
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json'
    });
    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    }); //서버에 요청
    console.log(JSON.stringify(response.data));
    return JSON.stringify(response.data);
}
async function fetchStationIdsFromCityCode(cityCode) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';
    const queryParams = new URLSearchParams({
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json',
        cityCode : cityCode,
        numOfRows : 100
    });

    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    }); //서버에 요청
    console.log(JSON.stringify(response.data));
    return JSON.stringify(response.data);
}
// fetchDestinationDetail(); //임시
// fetchCityCodeList(); //임시
fetchStationIdsFromCityCode(32);