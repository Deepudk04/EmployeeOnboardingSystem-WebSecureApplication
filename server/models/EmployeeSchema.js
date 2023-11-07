import mongoose from 'mongoose';

const masterSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    username:{
        type: String ,
        required : true
    },
    password: {
        type: String,
        required : true
    },
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
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob:{
        type:String,
        required : true
    },
    emergencyContact: {
        type: Number
    },
    address: {
        type: String
    },
    role: {
        type: String
    },
    branch: {
        type: String
    },
    aadhar: {
        type: Buffer,
        contentType : String
    },
    taxform: {
        type: Buffer,
        contentType : String
    },
    relevantCertification: {
        type: Buffer,
        contentType : String
    },
});

const Employee = mongoose.model('Employee',masterSchema);
export default Employee;