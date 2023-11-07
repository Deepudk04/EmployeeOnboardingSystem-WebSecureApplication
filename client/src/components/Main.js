import React from "react";
import {useState} from 'react';
import axios from 'axios';
import { useAuthConsume } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
function MainPage(){
    
    const [address,setAddress]=useState('');
    const [role,setRole]=useState('');
    const [branch,setBranch]=useState('');
    const [emergencyContact,setEmergencyContact]=useState('');
    const [aadhar,setAadhar]=useState(null);
    const [taxform,setTaxform]=useState(null);
    const [relatedCertification,setRelatedCertification]=useState(null);
    const navigate=useNavigate();

    const {dispatch} = useAuthConsume();
    const {state}=useAuthConsume();
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            address,role,branch,emergencyContact,aadhar,taxform,relatedCertification
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const token = state.user.token;
        console.log(token);
        try{
            const formData =new FormData();
            formData.append('trial',aadhar);
            axios.post('http://localhost:3001/upload',data,{
                headers : {"Content-Type":'multipart/form-data'},
                 Authorization: token 
            });
        }catch(err){

        }
        
        console.log(data);

    }
    const handleLogout=(e)=>{

        e.preventDefault();
        dispatch({type: 'logout'});
        localStorage.removeItem('user');
        navigate('/login');

    }

    return (
        <>
          {
          localStorage.getItem('user')!=undefined && localStorage.getItem('otp')? 
          (<div>
          <form onSubmit={handleSubmit}>
            
          <h1>Profile</h1>  
          <label>Address : </label>
          <textarea type="text" placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)}></textarea>
          <label>Role : </label>
          <input type="text" placeholder="Enter your role" onChange={(e)=>setRole(e.target.value)}></input>
          <label>Branch : </label>
          <input type="text" placeholder="Enter your branch" onChange={(e)=>setBranch(e.target.value)}></input>
          <label>Emergency contact : </label>
          <input type="text" placeholder="Enter a emergency contact" onChange={(e)=>setEmergencyContact(e.target.value)}></input>
          <label>Aadhar card : </label>
          <input type="file" placeholder="" onChange={(e)=>setAadhar(e.target.files[0])}></input>
          <label>Tax form : </label>
          <input type="file" placeholder="" onChange={(e)=>setTaxform(e.target.files[0])}></input>
          <label>Related Certifications : </label>
          <input type="file" placeholder="" onChange={(e)=>setRelatedCertification(e.target.files[0])}></input>
         <button type='submit'>Complete Profile</button>
         
         </form>
         <div><button onClick={handleLogout}>LOGOUT</button></div>
         </div>)
         : (<h2>You have not logged in or Verified by OTP</h2>) }
        </>
    );
    
}

export default MainPage;