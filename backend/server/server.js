import http from 'http';
import url from 'url';

let server = http.createServer(function(request, response){
    
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');//CORS
    response.writeHead(200,{'Content-Type':'application/json; charset=utf8'}); 
    const urlParams = new URLSearchParams(request.url.split('?')[1]);
    const departure = urlParams.get('departure');
    console.log(urlParams.get('departure'));
    //departure과 같은 노선인 정착역을 DB에서 탐색 후 reponse.end로 보내야 함.
    
    response.end(); 
})

server.listen(8080, function(){ 
    console.log('Server is running...');
});
//http://localhost:8080