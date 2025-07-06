import dotenv from 'dotenv';
import traveldb from 'mysql2';

dotenv.config({ path: '../../.env' }); 


const pool = traveldb.createPool({
    connectionLimit: 3,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool;