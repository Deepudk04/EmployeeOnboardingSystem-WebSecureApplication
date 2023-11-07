import React, { useReducer, useState } from 'react';
import axios from 'axios';
import '../regis.css'

function Registration() {

  const [firstname,setFname]=useState('');
  const [middlename,setMname]=useState('');
  const [lastname,setLname]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [dob,setDob]=useState('');
  const [document,setDoc]=useState(null);
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneRegex = /^[0-9]{10}$/;

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert('Invalid phone number');
      return;
    }
    const data={
      firstname,
      middlename,
      lastname,
      email,
      phone,
      dob,
      document
    }
    console.log(data);
    // const formData = new FormData();
    // formData.append('requestData', JSON.stringify(data));
    // formData.append('document', document)
    // console.log(formData);
    try{
    const result=await axios.post('http://localhost:3001/regis',data)  
    //console.log(result)
      if(result.data==='Success'){
        alert("Submitted , HR will get back to you");
        window.location.reload();
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='behind'>
        <div className='main'>
            <div className='register'>
        <form onSubmit={(e)=>handleSubmit(e)} encType="multipart/form-data">
          <label>Registration</label>
          <input type="text" placeholder="First Name" onChange={(e)=>setFname(e.target.value) }></input>
          {/* <label>Middle Name: </label> */}
          <input type="text" placeholder="Middle Name" onChange={(e)=>setMname(e.target.value)}></input>
          {/* <label>Last Name: </label> */}
          <input type="text" placeholder="Last Name" onChange={(e)=>setLname(e.target.value)}></input>
          {/* <label>E-mail: </label> */}
          <input type="email" placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)}></input>
          {/* <label>Phone No: </label> */}
          <input type="text" placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}></input>
          {/* <label>Document (CollegeID,Aadhar card,Driving licence):</label> */}
          <input type="text" placeholder="DOB" onChange={(e)=>setDob(e.target.value)}></input>
          <input type="file" placeholder="Photo ID" name ="document" onChange={(e)=>setDoc(e.target.files[0])}></input>
          <button type='submit'>Submit</button>
        </form>
         </div>
        </div>
    </div>
  );
}

export default Registration;
