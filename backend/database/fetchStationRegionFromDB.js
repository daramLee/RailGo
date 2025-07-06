import pool from "./travel_db.js";

export async function fetchStationRegionFromDB(departure, destination){
    return new Promise((resolve, reject) =>{
        pool.getConnection(async (err, connection) =>{
            if(err){
                console.log("DB 연결 실패");
                reject(err);
            }
            console.log("DB 연결 성공");
            
            try{
                const [departureRegion] = await getQueryResult(connection, 'select region from stations where name = ?', departure);
                const [destinationRegion] = await getQueryResult(connection, 'select region from stations where name = ?', destination);
                const regions = {
                    'departureRegion' : Object.values(departureRegion),
                    'destinationRegion' : Object.values(destinationRegion)
                };
                console.log("여기 확인해야됨");
                console.log(departureRegion); //여기서 '서울특별시'만 나오게 해야됨. ON!
                connection.release();
                resolve(regions);
            } catch(error){
                console.log("상세정보 조회 진입 실패");
                connection.release();
                reject(error);
            }
        });

    })
}

function getQueryResult(connection, query, param){
    return new Promise ((resolve, reject) =>{connection.query(query, [param], function(err, result){
        if(err){
            reject(err);
        }else{
            resolve(result);
        }
    })});
}