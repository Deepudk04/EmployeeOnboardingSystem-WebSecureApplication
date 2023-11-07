import { useEffect, useState } from "react"
import axios from 'axios';
import QRCode from 'qrcode.react'
import { useNavigate } from "react-router-dom";
import { useAuthConsume } from "../contexts/Auth";

function QRcode(){

    const [otpurl,setOtpurl]=useState('');
    const [otpdata,setOtpdata]=useState(0);
    const navigate = useNavigate();
    const { dispatch } = useAuthConsume()
    const obj=useAuthConsume();

  
    const otpURL = `otpauth://totp/YourApp?secret=${otpurl}`;

    useEffect(()=>{
        console.log(obj,"hii");
        axios.get('http://localhost:3001/otp').then((result)=>{
            setOtpurl(result.data.secretKey)
            })
          .catch((err)=>{
            console.log(err);
          }) 
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/validate',{otpdata})
             .then((result)=>{
                console.log(result.data.mess);
                if(result.data.mess==='success'){
                    localStorage.setItem('otp',true);
                    navigate('/main')
                }
                else{
                    alert("Wrong OTP")
                }
             })   
    }
    return (
        <>
         { localStorage.getItem('user')!=undefined  ? 
            ( 
            <div>

            <h1>OTP Verification</h1>
              <br></br>
              <QRCode value={otpURL} />
            <br></br>
            <label>Enter OTP:</label>
            <input onChange={(e) => setOtpdata(e.target.value)}></input>
            <button onClick={handleSubmit}>Submit</button>
            </div>
             ): (<div>You have not logged In</div>)
        }
        </>
    );
}

export default QRcode;