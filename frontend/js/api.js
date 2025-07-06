export async function fetchDestinationNames(departure){
    //GET 서울역에서 갈 수 있는 역 리스트로..
    const response = await fetch(`http://localhost:8080/destinations?departure=${departure}`); 
    const data = await response.json(); 
    return data;
}

export async function fetchDestinationDetail(departure, destination){ 
    console.log("api진입");
    try{
        const response = await fetch(`http://localhost:8080/region?departure=${departure}&destination=${destination}`); 
        const data = await response.json(); 
        return data;
    } catch(e){
        console.error(e);
        return null; //반환값뭐하지..
    }
}