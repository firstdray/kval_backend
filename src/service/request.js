const PostgreDB = require("../db/postgresql.js");
const validateDate = require("../validators/request.validators.js")

async function createRequest(data) {
    if(!validateDate.validate(data)) {
        console.error("Invalid data");
        throw new Error('Неверный формат данных');
    }

    return await PostgreDB.query(`INSERT INTO request (
        users_id,
        name_course,
        start_date,
        type_pay,
        status,
        end_date
    )
    VALUES ($1, $2, $3, $4, 'новая', $5) RETURNING *`,
        [data.users_id, data.name_course, data.start_date, data.type_pay, data.end_date]);
}

async function createReview(data) {
    if(!validateDate.validateReview(data)) {
        console.error("Invalid data");
        throw new Error('Неверный формат данных');
    }

    const reviews = await PostgreDB.query(`SELECT review FROM request WHERE users_id = $1 AND name_course = $2`, [data.users_id, data.name_course]);

    if(reviews === ''){
        console.error("Request already exists");
        throw new Error('Отзыв уже оставлен')
    }

    return await PostgreDB.query(`
        UPDATE request SET
        review = $3
        WHERE users_id = $1 AND name_course = $2
        RETURNING users_id, name_course, review`,
        [data.users_id, data.name_course, data.review]);
}

async function updateStatus(data) {
    if(!validateDate.validateStatus(data)) {
        console.error("Invalid data");
        throw new Error('Неверный формат данных');
    }

    return await PostgreDB.query(`UPDATE request SET status = $1 WHERE users_id = $2 AND name_course = $3`, [data.status, data.users_id, data.name_course])
}

async function getRequest(user_id) {
    return await PostgreDB.query(`SELECT * FROM request WHERE users_id = $1`, [user_id]);
}

async function getAllRequest() {
    return await PostgreDB.query(`SELECT * FROM request`);
}

module.exports = {createRequest, createReview, getRequest, getAllRequest, updateStatus};