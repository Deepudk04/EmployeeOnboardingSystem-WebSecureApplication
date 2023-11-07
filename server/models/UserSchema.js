import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Enter a valid email address'],
        unique: true,
    },
    phone: {
        type: Number,
        required: true
    },
    dob:{
        type:String,
        required : true
    },
    document: {
        data : String,
    }
});

const User = mongoose.model('user',userSchema);
export default User;