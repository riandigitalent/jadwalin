 import mongoose from 'mongoose';

 const userSchema = mongoose.Schema({
     username: {
         type: String,
         required: true,
         unique: true
     },
     password: {
         type: String,
         required: true,
     },
     Role: {
         type: String,
         default: 'basic',
         enum: ["kasir", "manager", "bos"]
     },
     accessToken: {
         type: String
     }
 }, {
     timestamps: true,
 });
 const User = mongoose.model('User', userSchema)

 export default User