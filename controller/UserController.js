import User from './../models/user.js';
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
        let saltRound = 10
        const hashedPW = await bcrypt.hash(password, saltRound);

        const newUser = new User({
            "username": username,
            "password": hashedPW
        })

        const createdUser = await newUser.save();

        res.status(201).json(createdUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//login
userRouter.post('/login', async(req, res) => {
    try {

        const {
            username,
            password
        } = req.body;

        const currentUser = await new Promise((resolve, reject) => {
            User.find({ "username": username }, function(err, user) {
                if (err)
                    reject(err)
                resolve(user)
            })
        })

        //cek apakah ada user?
        if (currentUser[0]) {
            //check password
            bcrypt.compare(password, currentUser[0].password).then(function(result) {
                if (result) {
                    //urus token disini
                    res.status(201).json({ "status": "logged in!" });
                } else
                    res.status(201).json({ "status": "wrong password." });
            });
        } else {
            res.status(201).json({ "status": "username not found" });
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//getalluser
userRouter.get('/user', async(req, res) => {
    const users = await User.find({})
    if (users) {
        res.json(users)
    } else {
        res.status(404).json({ message: 'Users not found' })
    }
})

//getuser by id
userRouter.get('/info/:id', async(req, res) => {
    const users = await User.findById(req.params.id)
    if (users) {
        res.json(users)
    } else {
        res.status(404).json({ message: 'Users not found' })
    }
})

//put update

userRouter.put('/update/:id', async(req, res) => {
    const {
        username,
        password
    } = req.body

    let saltRound = 10
    const hashedPW = await bcrypt.hash(password, saltRound);

    const user = await User.findById(req.params.id)
    if (user) {
        user.username = username
        user.password = hashedPW

        const updateUser = await user.save()
        res.json(updateUser)

    } else {
        res.status(404).json({ message: 'homework not found' })
    }

})

userRouter.delete('/del/:id', async(req, res) => {
    const users = await User.findById(req.params.id)
    if (users) {
        await User.remove()
        res.json({ message: 'terdelete 1  remove' })
    } else {
        res.status(404).json({ message: 'Users not found' })
    }
})



export default userRouter;