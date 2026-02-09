import React, { useState } from "react";
import UploadPanel from "./components/UploadPanel";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import LoginPage from "./pages/login/page";
import RegisterPage from "./pages/register/page";
import DashboardPage from "./pages/dashboard/page";
import CreateAssessmentPage from "./pages/create/page";
import AdaptiveQuiz from "./pages/attend-assessment/page";
function App() {
  const [questions, setQuestions] = useState<any[]>([]);
 return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/assessment/create" element={<CreateAssessmentPage />} />
      <Route path="/assessment" element={<AdaptiveQuiz />} />
    </Routes>
  );
//   return (
//     <div className="min-h-screen flex justify-center ">
//       <div className=" max-w-3xl"> 
//         {/* 👆 This centers everything left-to-right */}

//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
//           AscendQuiz 🎓
//         </h1>

//         <UploadPanel onQuestions={(qs) => setQuestions(qs)} />

//         {questions.length > 0 && (
//           <>
//             <hr className="my-6 border-gray-300" />
//             <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
//               Quiz
//             </h2>

//             <div className="bg-white shadow-lg rounded-xl p-6">
//               <AdaptiveQuiz questions={questions} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
}


export default App;
