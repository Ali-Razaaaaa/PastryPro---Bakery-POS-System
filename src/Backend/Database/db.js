import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool;

const connectDB = () => {
  if (!pool) {
    pool = mysql2.createPool({
      host: process.env.DBhost || 'localhost',
      user: process.env.DBuser || 'root',
      password: process.env.DBpassword || 'samsung',
      database: process.env.DBname || 'pastrypro',
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0
    });
   
  }
  return pool;
};

export default connectDB;
