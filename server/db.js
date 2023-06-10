const { Pool } = require('pg');
require("dotenv").config();

const db = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDB,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  });

const createUser = async (userInfo) => {
    try {
        const query = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, password';
        const values = [userInfo.firstname, userInfo.lastname, userInfo.username, userInfo.email, userInfo.password];
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const login = async (username, password, session) => {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && password === user.password) {
        session.userId = user.id;
        return true;
    } else {
        throw new Error('Login failed');
    }
}

const addMedication = async (medInfo, userId) => {
    try {
        const query = 'INSERT INTO user_medications (user_id, med_name, amount_unit, amount_value, frequency_unit, frequency_value, time_of_day, prescriber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [userId, medInfo.med_name, medInfo.amount_unit, medInfo.amount_value, medInfo.frequency_unit, medInfo.frequency_value, medInfo.time_of_day, medInfo.prescriber];
        await db.query(query, values);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getUserMeds = async (userId) => {
    try {
        const query = 'SELECT * FROM user_medications WHERE user_id = $1';
        return await db.query(query, [userId]);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const deleteMeds = async (userId, medNames) => {
    try {
        const placeholders = medNames.map((_, i) => `$${i + 2}`).join(',');
        const query = `DELETE FROM user_medications WHERE user_id = $1 AND med_name IN (${placeholders})`;
        return await db.query(query, [userId].concat(medNames));
    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports = {createUser, login, addMedication, getUserMeds, deleteMeds}