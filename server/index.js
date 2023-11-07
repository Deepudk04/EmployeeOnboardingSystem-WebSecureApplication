import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fileUpload from 'express-fileupload';
import User from './models/UserSchema.js'
import speakeasy from 'speakeasy';
import  QRCode  from 'qrcode';
import fs from 'fs';
import nodemailer from 'nodemailer';
import Employee from './models/EmployeeSchema.js';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirname = dirname(currentFilePath);

console.log(currentDirname); 


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_STR,{ expiresIn: '3d' })
}


dotenv.config();
const app=express(); 
const mongoUri = process.env.MONGO_URI;

//multer file upload
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + '--' + file.originalname)
    }
});

const upload = multer({storage : fileStorageEngine})


console.log(currentDirname);
// app.post('/upload', upload.single('trial'),async (req, res) => {
//     if (req.file) {
//     const doc = await Employee.findById('6546f4150617631d06a225ee')
//     doc.aadhar = { data: fs.readFileSync(path.join(currentDirname)+'/files/'+req.file.filename),
//                  contentType: 'application/pdf'
//                 }
//     const result=await doc.save(); 
//     console.log(result); 
   
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   }
//   });


mongoose.connect(mongoUri)
        .then(()=>{
            app.listen(process.env.PORT,()=>{console.log("App running on port 3001")})
        })
        .catch((err)=>{ 
            console.log(err);
        })


    app.use(cors({
     origin: 'http://localhost:3000',
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true, 
    }));
    
    app.use(helmet());
    app.use(
        helmet({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", 'trusted-scripts.com'],
              styleSrc: ['style.com'],
            },
          },
        })
      );
    
    const logStream = fs.createWriteStream(path.join(currentDirname, 'regis_access.log'), { flags: 'a' });
    app.use(morgan('combined', { stream: logStream }));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));   
app.get('/req-users',(req,res)=>{
    User.find()
        .then((result)=>{
            console.log(result)
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/upload',async (req, res) => {
    if (req.body) {
    const doc = await Employee.findById(req.body);
    }
    // Employee.findByIdAndUpdate(,req.body , { new: true }, (err, updatedDocument) => {
    //   if (err) {
    //     console.error('Error updating document:', err);
    //   } else {
    //     console.log('Updated document:', updatedDocument);
    //   }
    // });
     const decode = jwt.verify(token, 'secret');
  }
  );

app.post('/regis',async (req,res)=>{
    const data=req.body;
    const user =User(data);
    user.save()
        .then((result)=>{
            console.log("Success");
            res.send("Success");
          
        })
        .catch((err)=>{
            console.log(err.message)
            res.status(400).json({error:err})
        })
})  
app.post('/reject',(req,res)=>{
    const _id = req.body.id;
    User.findOne({_id}).then(async(result)=>{
        //console.log(result);
        console.log(result);
        const htmlMain = `<h2>Sorry , you are not identified by the HR </h2>`;
        mailoptions.to=result.email;
        mailoptions.html = htmlMain;
        sendMail(transporter,mailoptions);
        User.deleteOne({_id}).then((result)).catch((err)=>{console.log(err)});
        res.status(200).json({mess:"success"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({error:err})
    })
})
let num;
let username='emp';
app.post('/approve',(req,res)=>{
    
    try {
        num = fs.readFileSync('userpass.txt', 'utf8');
        //console.log(typeof num, num);
        username=username+num;
        //console.log(username);
      } catch (err) {
        console.error(err);
      }
    let val=parseInt(num);  
    val++;
    try {
        fs.writeFileSync('userpass.txt', val+'');
        //console.log('Data written to file');
    } catch (err) {
        console.error(err);
    }  

    const _id = req.body.id;
    let password;
    //console.log(_id);

    User.findOne({_id}).then(async(result)=>{
        //console.log(result);
        let fname=result.firstname;
        fname=fname.toLowerCase();
        username=username+'_'+fname;
        console.log(username);
        fname=fname.substring(0,4);
        let dob=result.dob
        dob=dob.replace('/',"");
        dob=dob.substring(0,4);
        password=dob+fname;
       
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)

        result.userName=username;
        result.password=hash;

        console.log(result);
        const newdata={
        _id : result._id,
        username: username,
        password: hash,
        firstname:result.firstname,
        middlename:result.middlename, 
        lastname:result.lastname,
        email: result.email,
        phone: result.phone,
        dob: result.dob
        }
        const emp=Employee(newdata);
        emp.save().then((employee)=>{
            console.log("saved")
        }).catch((err)=>{
            console.log(err);
        })

        console.log(username);
        console.log(password);
        const htmlMain = `<h1>Welcome to 'The Quiet Crew'<h1>
<h2>We are happy to onboard you to our company</h2>
<p>Your usename is : ${username} </p><br></br>
<p>Your password should be of 8 characters. <br></br>
The first 4 characters should be your dob(ddmm) and the next 4 characters should be the first 4 characters of your name</p>`;
        mailoptions.to=result.email;
        mailoptions.html = htmlMain;
        sendMail(transporter,mailoptions);
        User.deleteOne({_id}).then((result)).catch((err)=>{console.log(err)});
        res.status(200).json({mess:"success"});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({error:err})
    })


    
})

app.post('/userlogin', async (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
   
    try {
      const user = await Employee.findOne({ username });
  
      if (!user) {
        res.status(404).send("No such user");
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createToken(user._id)
          console.log(token);
          res.status(200).json({email : user.email,token});
        } else {
          res.send("Error");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });


let secret;
let secretKey;
app.get('/otp',(req,res)=>{
    secret = speakeasy.generateSecret();
    secretKey = secret.base32;
    res.status(200).json({secretKey})
       
})

app.post('/validate',(req,res)=>{
    console.log(req.body)
    
    const verified = speakeasy.totp.verify(
        { secret: secretKey,
        encoding: 'base32',
        token: req.body.otpdata });
    console.log(verified);    
    if(verified)    
     res.status(200).json({mess:"success"})
    else
     res.status(200).json({mess:"failed"})        
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  
  const mailoptions = {
    from: {
       name: 'Sundar',
       address: process.env.USER,
    }, 
    to: '', 
    subject: "Sending mail with attachments",

    html: ''
  }

  const sendMail = async (transporter, mailoptions) => {

    try{
        await transporter.sendMail(mailoptions);
        console.log("Mail sent successfully!");
    }
    catch(error){
        console.error("Error sending email:", error);
    } 
  }