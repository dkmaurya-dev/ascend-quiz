import React from "react";
import { User } from "lucide-react"; // icon library already available
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { checkStatus } from "../pages/lib/api";


export const Header: React.FC = () => {
  // Toast notifications
  const notify = (message: string) => {
    toast(message, {
    position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
    });
  };
 
//   setInterval(()=>{
//     const jobId = localStorage.getItem("jobId");
//                   console.log("jobId:",jobId);
//   // http://localhost:3000/api/question/8/status
// checkStatus(Number(jobId)??0).then((res)=>{
// if(res.data.state=="active"){
//       notify("processing",);
// }else{
//         notify("completed",);

// }
//     console.log(res.data);
//   });
//   },10000)
  return (
    <header className="w-full bg-white/80 backdrop-blur shadow-md border-b border-purple-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <h1 className="text-2xl font-extrabold text-purple-700 tracking-wide">
        HotKettle
      </h1>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          to="/login"
          className="text-gray-600 font-medium hover:text-purple-700 transition-all"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="text-gray-600 font-medium hover:text-purple-700 transition-all"
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          className="text-gray-600 font-medium hover:text-purple-700 transition-all"
        >
          Dashboard
        </Link>
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center shadow hover:scale-105 transition-all cursor-pointer">
          <User className="text-purple-700" size={22} />
        </div>
      </div>
         <ToastContainer />

      </nav>

      {/* Profile Icon */}
    </header>
  );
};
