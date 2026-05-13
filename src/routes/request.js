const router = require('express').Router();
const Request = require('../service/request.js')

router.post('/request', async (req, res) => {
    const { users_id, name_course, start_date, type_pay, end_date } = req.body;
    const data = {users_id, name_course, start_date, type_pay, end_date};

    try {
        const request = await Request.createRequest(data);

        res.status(200).json({
          success: true,
          data: request
        })
    } catch (error) {
        console.error("Request error:", error);
        res.status(500).json({error: error.message});
    }
})

router.post('/request/status', async (req, res) => {
    const {users_id, name_course, status} = req.body;
    const data = {users_id, name_course, status};

    try {
        const request = await Request.updateStatus(data);

        res.status(200).json({
            success: true,
            data: request
        })
    } catch(error) {
        console.error("Request error:", error);
        res.status(500).json({error: error.message});
    }
})

router.post('/review', async (req, res) => {
    const { users_id, name_course, review } = req.body;
    const data = {users_id, name_course, review};

    try {
        const review = await Request.createReview(data)

        res.status(200).json({
            success: true,
            data: review
        })
    } catch (error) {
        console.error("Request error:", error);
        res.status(500).json({error: error.message});
    }
})

router.get('/request', async (req, res) => {
    const {users_id} = req.query

    try {
        const request = await Request.getRequest(parseInt(users_id));

        res.status(200).json({
            success: true,
            data: request
        })
    } catch (error) {
        console.error("Request error:", error);
        res.status(500).json({error: error.message});
    }
})

router.get('/request/all', async (req, res) => {
    try{
        const requests = await Request.getAllRequest()

        res.status(200).json({
            success: true,
            data: requests
        })
    }catch(error){
        console.error("Request error:", error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router