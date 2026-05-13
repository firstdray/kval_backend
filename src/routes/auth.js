const router = require("express").Router();
const auth = require("../service/auth.js");

router.post("/reg", async (req, res) => {
    const { login, pass, fio, phone, email } = req.body;
    const userData = { login, pass, fio, phone, email };

    try {
        const newUser = await auth.createUser(userData);

        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        console.log('Registration error:', error);
        res.status(500).json({error: error.message});
    }
})

router.post("/login", async (req, res) => {
    const { login, pass } = req.body;

    try {
        const user = await auth.getUser(login, pass);

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({error: error.message});
    }
})

module.exports = router;