import connection from "./travel_db.js";

export async function fetchDestinationNamesFromDB(departure){
    const rawDestinationIds = [];
    const destinationNames = [];
    console.log(departure);

    const [departureId] = await getQueryResult('select id from stations where name = ?', departure);
    const lineIds = await getQueryResult('select train_id from train_stations where station_id = ?', Object.values(departureId)); 
    for(const lineId of lineIds){
        let destinationIds = await getQueryResult('select station_id from train_stations where train_id = ?', Object.values(lineId));
        rawDestinationIds.push(...destinationIds);
    }
    const destinationIds = removeDuplicate(rawDestinationIds);
    for(const destinationId of destinationIds){
        let [destinationName] = await getQueryResult('select name from stations where id = ?', destinationId);
        destinationNames.push(Object.values(destinationName));
    }

    //자신도 배열에서 지워야 함. (예정)
    connection.end();
    console.log(destinationNames.flat());
    return destinationNames.flat();
}
function getQueryResult(query, param){
    return new Promise ((resolve, reject) =>{connection.query(query, [param], function(err, result){
        if(err){
            reject(err);
        }else{
            resolve(result);
        }
    })});
}
function removeDuplicate(rawDestinationIds){
    return new Set(rawDestinationIds.map((id) => Object.values(id)).flat());      
}



