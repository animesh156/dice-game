import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/user/register',
        { name, email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Registered Successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userName", response.data.name);

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } 
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center"  style={{ backgroundImage: `url("https://res.cloudinary.com/dmdlgpurh/image/upload/v1741415613/bg_1_psbhmx.jpg")` }}>
      <ToastContainer />
      <div className="backdrop-blur-lg  bg-white/30  border  border-gray-600/20 shadow-lg rounded-lg p-8 w-80 md:w-96">
        <h1 className="text-center text-2xl mb-3 font-bold dark:text-white">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="required py-2 w-full px-3 bg-transparent  border-gray-400 focus:border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="required py-2 w-full px-3 bg-transparent  border-gray-400 focus:border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="required py-2 w-full px-3 bg-transparent  border-gray-400 focus:border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        
          <div>
            <button
              type="submit"
              className="py-2 w-full px-3 font-semibold cursor-pointer rounded-md bg-sky-400 hover:bg-sky-500 text-white transition duration-300"
            >
              Register
            </button>
          </div>

          <div>
            <p className="text-center dark:text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
