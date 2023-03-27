import { Router } from "express";
import User from "../db/schemas/User.js";
import { hashPassword, comparePassword } from "../utils/helper.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(!username || ! password)
        res.status(400).send('Username or Password required');

    const userDB = await User.findOne({username});
    if(!userDB) return res.sendStatus(401);

    if(comparePassword(password, userDB.password)){
        req.session.user = userDB;
        return res.sendStatus(200);
    }else{
        return res.sendStatus(401);
    }

})


router.post('/register', async (req, res) => {
    const { username } = req.body;
    const users = await User.findOne({username});
    if(users){
        res.status(400).send('User already exists');
    }else{
        const password = hashPassword(req.body.password);
        const newUser = await User.create({username, password});
        res.sendStatus(201);
    }
})

export default router;