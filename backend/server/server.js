import http from 'http';
import { fetchDestination } from './fetchDestination.js';

let server = http.createServer(async function(request, response){
    
    response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');//CORS
    response.writeHead(200,{'Content-Type':'application/json; charset=utf8'}); 
    const urlParams = new URLSearchParams(request.url.split('?')[1]);
    const departure = urlParams.get('departure');
    let destinations = await fetchDestination(departure);
    console.log(destinations); //ok
    response.end(JSON.stringify(destinations)); 
    //아직 server.close() 안함.
})

server.listen(8080, function(){ 
    console.log('Server is running...');
});
//http://localhost:8080