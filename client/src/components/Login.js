import { useState } from "react"
import axios from 'axios';
import QRCode from 'qrcode.react'
import { useNavigate } from "react-router-dom";
import { useAuthConsume } from "../contexts/Auth";
const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch } = useAuthConsume()
  const { state } = useAuthConsume()
  const [logged,setLogged]=useState(false);
  //   const {login, error, isLoading} = useLogin()
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/userlogin',{
        username,password
    }).then((result)=>{
        console.log(result.data)
        if(result.data!='Error'){
            console.log(result.data)

            dispatch({type: 'login', payload: result.data})
            //setLogged();
            localStorage.setItem('user',JSON.stringify(result.data))
            localStorage.setItem('name',username);
            console.log(logged)
            navigate('/qrcode');
        }
        else{
            alert("Wrong Credentials");
        }
     })
      .catch((err)=>{
        console.log(err);
      })  
    }    
  return (
    <>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
     {/* disabled={isLoading}   */}
      <button type="submit">Log in</button>
      {/* {error && <div className="error">{error}</div>} */}
      
    </form>
     
    {/* {logged  && <div className="error">{state}</div>} */}
    
    {/* <input type='text' ></input>
    <buttone */}
    </>
  )
}

export default Login;