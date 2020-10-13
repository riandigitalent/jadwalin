import mongoose from 'mongoose';
const { mongo } = mongoose;
const homeworkSchema = mongoose.Schema({
        course: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        due_date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    }, {
        timestamp: true,
    }

)

const Homework = mongoose.model('Homework', homeworkSchema)

export default Homework