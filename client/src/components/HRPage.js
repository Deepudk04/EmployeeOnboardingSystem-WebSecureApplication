import React, { useEffect } from 'react';
import axios from 'axios'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HRpage=()=>{
    const instance = axios.create({
        baseURL: 'http://localhost:3001'
      });
    const navigate=useNavigate();  
    const [reqData,setReqData]=useState([])
    const [click,setClick]=useState(0);
    const [rend,setRend]=useState(false);
    useEffect(()=>{
        instance.get('/req-users')
                .then((result)=>{
                    const ans=result.data;
                    console.log(ans)
                    setReqData(ans)
                })
                .catch((err)=>{
                    console.log(err);
                })

    },[click])
    const handleClick=(e)=>{
        e.preventDefault();
        setRend(true);
    }
    const handleApprove=(e,id)=>{
        e.preventDefault();
        console.log(id);
        instance.post('/approve',{id})
                .then((result)=>{
                    console.log(result);
                    setClick((prevClick) => prevClick+1);
                    console.log(click);
                })
                .catch((err)=>{
                    console.log(err);
                })
    }
    const handleChat=(e)=>{
        e.preventDefault();
    }
    const handleReject=(e,id)=>{
        e.preventDefault();
        console.log(id);
        instance.post('/reject',{id})
                .then((result)=>{
                    console.log(result);
                    setClick((prevClick) => prevClick+1);
                    console.log(click);
                })
                .catch((err)=>{
                    console.log(err);
                })
    }
    return(
        <>
        <br></br>
        <br></br>
        <button onClick={handleClick}>Show Requests</button> 
        <button onClick={handleChat}>Show Requests</button> 
        <br></br>
        {rend && (
        <div className='behind'>
            {reqData.map(item => (<h3 key={item._id}>Name :  {item.firstname} {item.middlename} {item.lastname}<br></br>
                              Email id :  {item.email} <br></br> Phone number :  {item.phone}
                               <br></br><button onClick={(e)=>{handleApprove(e,item._id)}}>Approve</button><button onClick={(e)=>{handleReject(e,item._id)}}>Reject</button></h3>))}    
        </div>) }
        </>
    );
}

export default HRpage;