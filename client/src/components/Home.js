import React from "react";
import { Link } from 'react-router-dom'

function Home(){
    return (
        <>
        <br></br>
          <nav>
            <Link to='/login'>Login  </Link> OR 
            <Link to='/signup'>  Sign Up</Link>
          </nav>
        </>
    );
}

export default Home;