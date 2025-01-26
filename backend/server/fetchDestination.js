import connection from "../database/travel_db.js";

function getQueryResult(query, param){
    return new Promise ((resolve, reject) =>{connection.query(query, [param], function(err, result){
        if(err){
            reject(err);
        }else{
            resolve(result);
        }
    })});
}

export async function fetchDestination(departure){
    let rawDestinationIds = [];
    let destinationNames = [];
    console.log(departure);

    const stationId = await getQueryResult('select id from stations where name = ?', departure);
    const lineIds = await getQueryResult('select line_id from line_stations where station_id = ?', Object.values(stationId[0]));
    for(const element of lineIds){
        let temp = await getQueryResult('select station_id from line_stations where line_id = ?', Object.values(element));
        rawDestinationIds.push(...temp);
    }
    //destinationIds 중복 요소 제거
    const destinationIds = new Set(rawDestinationIds.map((element) => Object.values(element)).flat());

    for(const element of destinationIds){
        let temp = await getQueryResult('select name from stations where id = ?', element);
        destinationNames.push(Object.values(...temp));
    }
    connection.end();
    console.log(destinationNames.flat());
    return destinationNames.flat();
}


