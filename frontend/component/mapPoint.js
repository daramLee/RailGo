function MapPoint ( name, position ) {

    console.log('맵포인트 컴포넌트 진입');
    console.log('in mapPoint.js :', position);

    const mapPinContainer = document.getElementById('map_pin_container');
    
    
    mapPinContainer.style.top = position.top + '%';
    mapPinContainer.style.left = position.left + '%';


    const mapPinName = document.getElementById('map_pin_name');
    mapPinName.textContent = name;


    //mapPinName에 이름이 추가되고
    //mapPointContainer 위치 결정


}

export default MapPoint;