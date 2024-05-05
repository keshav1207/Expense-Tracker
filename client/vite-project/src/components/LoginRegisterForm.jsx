import { useState } from "react"
import axios from "axios";
import {useForm} from "react-hook-form"
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function LoginRegisterForm(){

    const[login, setLogin] = useState(true);
    const {register,handleSubmit,reset } = useForm();
    const navigate = useNavigate();


    function axiosLogin(data) {
        axios
          .post(" http://localhost:5000/api/loginUser", data)
          .then((response) => {
            const msg = response.data.message;
            toast.success(msg, {
                position: "top-center",
              });

              const userId = response.data.userId;

              setTimeout(() => {
                navigate(`/home/${userId}`);
              }, 2000); 

             

          }).catch(error => {
            const msg = error.response.data.error;
            toast.error(msg, {
                position: "top-center",
              });
          });
      }

    
      function axiosRegister(data) {
        axios
          .post(" http://localhost:5000/api/registerUser", data)
          .then((response) => {
            const msg = response.data.message;
            toast.success(msg, {
                position: "top-center",
              });

            setLogin(true);

          }).catch(error => {
            const msg = error.response.data.error;
            toast.error(msg, {
                position: "top-center",
              });
            
          });
      }

    
    function handleClick(){
        setLogin(!login);
        reset()
    }

      const onSubmit = async (data) => {
        login? (await axiosLogin(data)):(await axiosRegister(data))
        console.log(data);
        reset()
      };

    


    return(
        <>
        
        <div className="logreg-container">

        <form className="login-register-form" onSubmit={handleSubmit(onSubmit)}>

        <div className="heading">

        <div className="headerLog">{login?("Login"):("Register")}</div>

        <div className="underline"></div>

        </div>


        {login?(null):(<input type="text" id="name" placeholder="Name" {...register("userName")} />)}
        <input type="text"  id="email" placeholder="Email" {...register("email")}/>
        <input type="password"  id="password " placeholder="Password" {...register("password")}/>

       

       {login?(<div className="logRegMessage" onClick={handleClick}> Don't have an account? <span className="form-choice">Register</span></div>):( <div className="logRegMessage" onClick={handleClick}> Already have an account? <span className="form-choice">Login</span></div>)} 

        {login?( <button className="loginBtn" type="submit">Login</button>):( <button className="registerBtn" type="submit">Register</button>)}
       
        </form>

        </div>
    
        </>

    )
   
}