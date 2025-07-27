import { BASE_URL } from './config.js';

export async function fetchDestinationNames ( departure ) {
    //GET 서울역에서 갈 수 있는 역 리스트로..
    const response = await fetch(`${BASE_URL}/destinations?departure=${departure}`); 
    const data = await response.json(); 
    return data;
}

export async function fetchDestinationDetail ( departure, destination ) { 
    try{
        const response = await fetch(`${BASE_URL}/region?departure=${departure}&destination=${destination}`); 
        const data = await response.json(); 
        return data;
    } catch(e){
        console.error(e);
        return null; //반환값뭐하지..
    }
}

export async function fetchDestinationMapPointPosition ( destinationName ) {
    try {
        console.log('fetchDestinationMapPointPosition 진입');
        const response = await fetch(`${BASE_URL}/destinations/position`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                name : destinationName
            })
        })
        const data = await response.json(); //response는 문자열객체가 아니라 Response객체임.
        return data;
    } catch(e) {
        console.error(e);
        return null;
    }
}