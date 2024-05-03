import { useState } from "react"


export default function LoginRegisterForm(){

    const[login, setLogin] = useState(true);
    
    function handleClick(){

        setLogin(!login);
    }


    return(
        <>
        <div className="logreg-container">

        <form className="login-register-form">

        <div className="heading">

        <div className="headerLog">{login?("Login"):("Register")}</div>

        <div className="underline"></div>

        </div>


        {login?(null):(<input type="text" id="name" placeholder="Name" />)}
        <input type="text"  id="email" placeholder="Email"/>
        <input type="password"  id="password " placeholder="Password"/>

       {login?(<div className="logRegMessage" onClick={handleClick}> Already have an account? <span className="form-choice">Login</span></div>):(<div className="logRegMessage" onClick={handleClick}> Don't have an account? <span className="form-choice">Register</span></div>)} 

        {login?( <button className="loginBtn">Login</button>):( <button className="registerBtn">Register</button>)}
       
       

        </form>

        </div>
    
        </>

    )
   
}