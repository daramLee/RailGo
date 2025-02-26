import dotenv from 'dotenv';
import traveldb from 'mysql2';

dotenv.config({ path: '../../.env' }); 


const connection = traveldb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err.message);
        return;
    }
    console.log('MySQL 연결 성공!');
});

export default connection;