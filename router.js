import express from 'express'
import Homework from './database.js'

const router = express.Router()

export default router

router.post('/homeworks', async(req, res) => {
    try {
        const {
            course,
            title,
            due_date,
            status,
        } = req.body
        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        })

        const createdHomework = await homework.save()
        res.status(201).json(createdHomework)
    } catch (err) {
        res.status(500).json({ error: 'database creation error' })
    }
})

router.get('/homeworks', async(req, res) => {
    const homeworks = await Homework.find({})
    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({ message: 'homework not found' })
    }
})

router.get('/homeworks/:id', async(req, res) => {
    const homeworks = await Homework.findById(req.params.id)
    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({ message: 'homework not found' })

    }
})

router.put('/homeworks/:id', async(req, res) => {
    const {
        course,
        title,
        due_date,
        status,
    } = req.body

    const homework = await Homework.findById(req.params.id)
    if (homework) {
        homework.course = course
        homework.title = title
        homework.due_date = due_date
        homework.status = status

        const updateHomework = await homework.save()
        res.json(updateHomework)

    } else {
        res.status(404).json({ message: 'homework not found' })
    }

})


router.delete('/homeworks/:id', async(req, res) => {
    const homework = await Homework.findById(req.params.id)
    if (homework) {
        await homework.remove()
        res.json({ message: 'homework remove' })

    } else {
        res.status(404).json({ message: 'homework not found' })
    }

})