function validate(data) {
    return (
        data &&
        typeof data.login === 'string' &&
        typeof data.pass === 'string' &&
        typeof data.fio === 'string' &&
        typeof data.phone === 'string' &&
        typeof data.email === 'string'
    )
}

module.exports = {validate};