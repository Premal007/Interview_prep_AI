import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';

const Login = ({setCurrentPage}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState(null);

  const{updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle login from submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("please enter a valid email address");
      return ;
    }

    if(!password){
      setError("Please enter a valid passsword")
    }

    //login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data)
        navigate("/dashboard")
      }
    }
    catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again.")
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Welcome Back! Please Login
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to access your account.
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          Login
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account ? {" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => setCurrentPage('signup')}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login