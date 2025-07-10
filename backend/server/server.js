import axios from 'axios';
// import axios from '../../node_modules/axios/dist/axios.min.js';
import http from 'http';
import { fetchDestinationNamesFromDB } from '../database/fetchDestinationNamesfromDB.js';
import { fetchStationRegionFromDB } from '../database/fetchStationRegionFromDB.js';


let server = http.createServer(async function(request, response){
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === 'OPTIONS') {
        response.writeHead(204, {
            'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        response.end();
        return;
    }

    if (url.pathname == '/destinations') { 
        console.log("/destinations 진입 성공");
        response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');//CORS

        const departure = url.searchParams.get('departure');
        const destinations = await fetchDestinationNamesFromDB(departure);
        console.log(destinations);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(destinations));
        
        return ;

    } else if (url.pathname == '/region') {
        console.log("1. /region 진입 성공");
        response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');//CORS

        const departure = url.searchParams.get('departure');
        const destination = url.searchParams.get('destination');

        const regions = await fetchStationRegionFromDB(departure, destination);
        console.log(`2. 지역정보 조회 성공 : ${JSON.stringify(regions)}`);
        const cityCodes = await fetchCityCode(regions);
        console.log(`4. 도시코드 조회 성공 : ${JSON.stringify(cityCodes)}`);
        const stationIds = {};

        stationIds.departureId = await fetchStationIdsFromCityCode(departure, cityCodes.departureCode);
        console.log(`5. 출발역 코드 조회 성공 : ${JSON.stringify(stationIds.departureId)}`);
        stationIds.destinationId = await fetchStationIdsFromCityCode(destination, cityCodes.destinationCode);
        console.log(`6. 도착역 코드 조회 성공 : ${JSON.stringify(stationIds.destinationId)}`);

        const totalTrainInfo = await fetchTrainInfo(stationIds);
        console.log(`8. 열차정보 조회 성공 : ${JSON.stringify(totalTrainInfo)}`); //adultcharge는 왜 0으로 나오는지 해결해야함.
        const essentialTrainInfo = extractTrainInfoFrom(totalTrainInfo);
        
// 10. 차량 종류명에 따라 운임, 소요시간(도착-출발)시간의 평균을 계산한다.  
// 11. 운임 - 심야,새벽 시간대를 제외시킨 뒤 평균 계산.
// 12. 소요시간 - 도착시간에서 출발시간을 뺀 뒤 평균 계산.

        //ON! 아래 average뭐시기 함수 구현해야됨.
        const averageTrainInfo = averageChargeAndTime(essentialTrainInfo);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(essentialTrainInfo));
        
        return ;

    } else if (request.method == 'POST' && url.pathname == '/destinations/position') {
        console.log('destinations/position 진입 성공');
        response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');//CORS

        let body = '';
        request.on('data', chunk => {
            body += chunk;
        });
        request.on('end', () => {
            const data = JSON.parse(body);
            //destinations 이름 받아야 함.
            const position = fetchMapPointPosition(data.name);
            //ex) position = { top: 76, left: 88 }

            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(position));
        })
        return;
    }

    // response.writeHead(404);
    // response.end('Not Found');
    //아직 server.close() 안함.
})

server.listen(8080, function () { 
    console.log('Server is running...');
});
//http://localhost:8080

//호출되는 메소드들
async function fetchTrainInfo ( stationIds ) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo'; 
    //데이터 설정
    const queryParams = new URLSearchParams({
        // serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg%3D%3D', //인코딩 키
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json',
        depPlaceId : stationIds.departureId, 
        arrPlaceId : stationIds.destinationId, 
        depPlandTime : '20250225' //임시
    });

    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    }); //서버에 요청
    return response.data.response.body.items.item;
}
async function fetchCityCode ( regions ) {
    const codeList = await fetchCityCodeList();
    const cityCodes = {};
    //codeList에서 regions.departureRegion과 regions.destinationRegion과 같은 코드 찾기 
    console.log("이거 이제 확인");
    console.log(regions.departureRegion); //결과 :  [ '서울특별시' ]
    codeList.forEach((city) => {
        if(city.cityname == regions.departureRegion){
            console.log("출발지 됐어");
            cityCodes.departureCode = city.citycode;
        }
        if(city.cityname == regions.destinationRegion){
            console.log("도착지 됐어");
            cityCodes.destinationCode = city.citycode;
        }               
    })

    return cityCodes;
}  

async function fetchCityCodeList () {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyCodeList';

    const queryParams = new URLSearchParams({
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json'
    });
    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    }); //서버에 요청
    // console.log(JSON.stringify(response.data));
    if(response.status == 200){
        console.log("3. 도시코드목록 조회 성공");
        return response.data.response.body.items.item; //ok
    }
}
async function fetchStationIdsFromCityCode ( stationName, cityCode ) {
    const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';
    const queryParams = new URLSearchParams({
        serviceKey : 'Dc0zKWMbPqEIYgR5dg5v2ETstlPOsoWXdTLVCkl6p8MdZYeNVHyReg0L0gU3DtXEjt4PRnpqsrWpQXqtwKXnPg==', //디코딩 키
        _type : 'json',
        cityCode : cityCode,
        numOfRows : 100
    });

    const response = await axios.get(`${url}?${queryParams}`).catch(e =>{
        console.error(e);
    });
    for(const item of response.data.response.body.items.item){
        if(item.nodename == stationName){
            console.log(`7. 역 코드 조회 성공 : ${item.nodeid}`);
            return item.nodeid;
        }
    }
}
function extractTrainInfoFrom ( totalTrainInfo ) {
    //9. 상세정보 결과에서 열차번호, 차량 종류명,
        // 운임, 출발 시간, 도착 시간을 추출한다. 
    const essentialTrainInfo = totalTrainInfo.map(({adultcharge, arrplandtime, depplandtime, traingradename, trainno}) => {
        return {adultCharge : adultcharge, arriveTime : arrplandtime, departTime : depplandtime, trainGradeName : traingradename, trainNumber : trainno};
    })
    return essentialTrainInfo;
}
function averageChargeAndTime ( essentialTrainInfo ) {
            
// 10. 차량 종류명에 따라  essentialTrainInfo의 요소를 각 배열에 저장한다.
// 11. 소요시간 - 도착시간에서 출발시간을 뺀 뒤 평균 계산.  -> 다음날엔 00시인지 24시인지 확인해봐야 함.
//11-1. 각 배열의 요소를 map해서 도착-출발시간해서 새로운 배열에 넣는다.
//11-2. 그 배열을 또 map 돌려서 시간을 초로 계산한 값을 새로운 배열에 넣는다.
//11-3. 그 배열을 reduce를 통해 초의 평균을 구한다.
//결과로 나온 초의 평균을 다시 시간으로 바꾸면 끄읕.
// 12. 운임 - 심야,새벽 시간대를 제외시킨 뒤 평균 계산.
}
function fetchMapPointPosition ( destinationName ) {
    console.log('fetchMapPointPosition 함수 진입');
    //여행지 이름으로 조회해서 position 반환.
    const positionByDestinations = {
        서울: {
            top: 20,
            left: 32
        },
        부산: {
            top: 76,
            left: 88
        }
    };

    for (const key in positionByDestinations) {
        if (key == destinationName) {
            console.log('fetchMapPointPosition에서 조회 결과 :', positionByDestinations[key]);
            return positionByDestinations[key];
        }
    }

}


// fetchDestinationDetail(); //임시
// fetchStationIdsFromCityCode(32);