import pool from "./travel_db.js";

export async function fetchDestinationNamesFromDB(departure){
    return new Promise((resolve, reject) =>{
        pool.getConnection(async (err, connection) =>{
            if(err){
                console.log("DB 연결 실패");
                reject(err); //return값 뭘로 해야하지..
            }
            console.log("DB 연결 성공");
            
            try{
                const rawDestinationIds = [];
                const destinationNames = [];
                console.log(departure);
            
                const [departureId] = await getQueryResult(connection, 'select id from stations where name = ?', departure);
                const lineIds = await getQueryResult(connection, 'select train_id from train_stations where station_id = ?', Object.values(departureId)); 
                for(const lineId of lineIds){
                    let destinationIds = await getQueryResult(connection, 'select station_id from train_stations where train_id = ?', Object.values(lineId));
                    rawDestinationIds.push(...destinationIds);
                }
                const destinationIds = removeDuplicate(rawDestinationIds);
                for(const destinationId of destinationIds){
                    let [destinationName] = await getQueryResult(connection, 'select name from stations where id = ?', destinationId);
                    destinationNames.push(Object.values(destinationName));
                }
                //자신도 배열에서 지워야 함. (예정)
                connection.release();
                console.log(destinationNames.flat());
                resolve(destinationNames.flat());
            } catch(error){
                connection.release();
                reject(error);
            }
        
        });

    })
}
function getQueryResult(connection, query, param){
    return new Promise ((resolve, reject) =>{
        connection.query(query, [param], function(err, result){
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



