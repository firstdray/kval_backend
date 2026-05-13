const PostgreDB = require('../db/postgresql.js')
const bcrypt = require('bcrypt')
const validateData = require("../validators/user.validators");

async function createUser(createData) {
    if(!validateData.validate(createData)) {
        console.error("Invalid data");
        throw new Error('Неверный формат данных');
    }

    await PostgreDB.query(`SELECT EXISTS(SELECT * FROM users WHERE login = $1)`, [createData.login]);

    const hashedPass = await bcrypt.hash(createData.pass, parseInt(process.env.SALT_ROUNDS));

    return await PostgreDB.query(`INSERT INTO users (
        login,
        pass,
        fio,
        phone,
        email
    )
    VALUES ($1, $2, $3, $4, $5) RETURNING *`, [createData.login, hashedPass, createData.fio, createData.phone, createData.email]);
}

async function getUser(login, pass) {
    if(!(typeof login === 'string') && (typeof pass === 'string')) {
        console.error("Invalid data");
        throw new Error('Неверный формат данных');
    }

    const users = await PostgreDB.query(`SELECT * FROM users WHERE login = $1`, [login]);
    const user = users[0];

    const decoded = await bcrypt.compare(pass, user.pass);
    if (!decoded) {
        console.error("Invalid password");
        throw new Error('Неверный логин или пароль')
    }

    return user;
}

module.exports = {createUser, getUser};