import user from '../models/user.js'
import express from 'express'
import bcrypt from 'bcrypt'

const userRouter = express.Router();

// tambah user
userRouter.post('/add', async(req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        //
        var saltRound = 10
        const hashedPW = await bcrypt.hash(password, saltRound);

        const newUser = new user({
            "username": username,
            "password": hashedPW
        })

        const createdUser = await newUser.save();

        res.status(201).json(createdUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

export default userRouter