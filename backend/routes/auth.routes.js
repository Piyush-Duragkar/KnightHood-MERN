import express from 'express';

const router = express.Router();

router.get("/signup", (req, res) => {
    res.json({
        data: "we are on the signup page",
    });
});

export default router;
