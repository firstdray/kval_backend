function validate(data) {
    return (
        data &&
        typeof data.users_id === 'number' &&
        typeof data.name_course === 'string' &&
        typeof data.start_date === 'string' &&
        typeof data.type_pay === 'string' &&
        typeof data.end_date === 'string'
    )
}

function validateReview(data) {
    return (
        data &&
        typeof data.users_id === 'number' &&
        typeof data.name_course === 'string' &&
        typeof data.review === 'string'
    )
}

function validateStatus(data) {
    return (
        data &&
        typeof data.users_id === 'number' &&
        typeof data.name_course === 'string' &&
        typeof data.status === 'string'
    )
}

module.exports = {validate, validateReview, validateStatus};