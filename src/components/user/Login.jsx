import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();

  const {login} =useContext(AppContext);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
const onChangeHandler=(e)=>{
  const {name,value}=e.target
  setFormData({...formData,[name]:value})
}

const {email,password}=formData
const submitHandler=async(e)=>{
  e.preventDefault();
  // alert("Your form has been submited")
 const result= await login(email,password);
 
 if(result.success){
  navigate('/')
 }
  // console.log(formData)
}

  return (
    <>
 
    <div className="container flex flex-col justify-center items-center  p-5">
    <h1 className="text-5xl p-3">User Login</h1>
    <form onSubmit={submitHandler} className="border-yellow-300 border-solid border-[2px] py-5 px-[50px] text-black rounded-lg flex flex-col justify-between gap-y-5">

  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input name="email" value={formData.email} onChange={onChangeHandler} type="email" className="form-control p-3 w-[450px] rounded-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input name="password" value={formData.password} onChange={onChangeHandler} type="password" className="form-control p-3 w-[450px] rounded-lg " id="exampleInputPassword1" placeholder="Password"/>
  </div>
 
  <button type="submit" className="btn btn-primary mt-5">Login</button>
</form>
    </div>
    </>
  )
}

export default Login