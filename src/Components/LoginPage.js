import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const navigate = useNavigate();
  const [login, SetLogin] = useState("flex");
  const [signup, setSignup] = useState("invisible w-0 h-0");
  const [toggle, setToggle] = useState("login");
  const [formData, setFormData] = useState({});
  const change = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  //check if a user is already logged in
  const getUserInfo=async()=>{
    const id=localStorage.getItem('auth-id');
    const idInfo={
      "authID":id
    }
    const info=await axios.post('https://furybackend.onrender.com/activeUser',idInfo);
    console.log(info);
    const data=info.data;
    if(info.data!=null) {
      navigate('/UserPage',{state :{ userdata :{data} }})
    }
  }
  getUserInfo();

 
  const submit = (e) => {
    e.preventDefault();
    addLog(formData);
    // setFormData({});
  };
  const addLog = async (formData) => {
    console.log(formData);
    console.log(`https://furybackend.onrender.com/newUser`)
    const res = await axios.post(`https://furybackend.onrender.com/${toggle}`, formData);
    console.log(res);
    localStorage.setItem('auth-id',res.data)
    Swal.fire("Welcome Back !");
    if (res.data) {
      navigate("/");
    }
  };


  const click = () => {
    if (login === "flex" ? SetLogin("invisible h-0 w-0 flex") : SetLogin("flex"));
    if (
      signup === "invisible w-0 h-0"
        ? setSignup("w-full")
        : setSignup("invisible w-0 h-0")
    );
    if (toggle === "login" ? setToggle("newUser") : setToggle("login"));
  };
  return (
    <div className="h-full my-14 bg-gradient-to-br text-white  from-red-600 via-blue-900 to-black w-full    justify-center items-center drop-shadow-2xl ">
      <div className="text-3xl flex justify-center font-bold">
        <button onClick={click} className="w-1/2 hover:underline">
          Login
        </button>
        <button onClick={click} className="w-1/2 hover:underline">
          SignUp
        </button>
      </div>

      {/* Login */}
      <div className="flex my-32">
        <div className={login}>
          <form className="w-full mx-10 ">
            <p className="text-3xl mb-5 font-bold "> Login</p>

            {/* Login details section */}
            <input
              onChange={change}
              name="email"
              value={formData.email || ""}
              className="w-3/5 h-10 rounded-md  my-2 text-black"
              type="text"
              placeholder="Enter your Email-address"
            />

            <input
              type="password"
              onChange={change}
              name="password"
              value={formData.password || ""}
              className="w-3/5 h-10 rounded-md  my-16 text-black"
              placeholder="Enter your Password"
            />
          
            <button
              onClick={submit}
              className="mx-52 w-40 bg-blue-600 text-white  h-10 rounded-md my-10"
            >
              Submit
            </button>
          </form>
          
        </div>

        {/* Signup */}
        <div className={signup}>
          <div className="text-5xl font-bold flex justify-center">Sign-up</div>
          <form className="my-5">
            <div className="  flex justify-center mx-5">
              <input
                onChange={change}
                name="name"
                value={formData.name || ""}
                className=" mx-7 w-1/4 h-10 rounded-md text-black"
                type="text"
                placeholder="Enter your Name"
              />
            </div>
            <div className="  flex justify-center my-3 mx-5">
              <input
                onChange={change}
                name="phone"
                value={formData.phone || ""}
                className=" mx-5 w-1/4 h-10 rounded-md  text-black"
                type="text"
                placeholder="Enter your Phone No."
              />
            </div>
            <div className="  flex justify-center my-3 mx-5">
              <input
                onChange={change}
                name="email"
                value={formData.email || ""}
                className=" mx-5 w-1/4 h-10 rounded-md  text-black"
                type="text"
                placeholder="Enter your Email Address"
              />
            </div>
            <div className="  flex justify-center my-3 mx-5">
              <input
                onChange={change}
                name="password"
                value={formData.password || ""}
                className=" mx-5 w-1/4 h-10 rounded-md  text-black"
                type="text"
                placeholder="Enter your Password"
              />
            </div>
            <div className="flex justify-center my-3 mx-5">
              <button onClick={submit} className="bg-blue-600 w-20 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
