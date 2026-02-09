"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Header } from "../../components/header";
import { checkStatus, createAssessment } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
// ---------------- VALIDATION SCHEMA ----------------
const AssessmentSchema = Yup.object().shape({
  title: Yup.string().required("Assessment title is required"),
  description: Yup.string().required("Description is required"),
  passPercentage: Yup.number()
    .min(20, "Minimum 20%")
    .max(100, "Maximum 100%")
    .required("Pass percentage is required"),
  // file: Yup.mixed()
  //   .required("PDF file is required")
  //   .test("fileType", "Only PDF allowed", (value: any) =>
  //     value ? value.type === "application/pdf" : false
  //   )
  //   .test("fileSize", "File size must be less than 5MB", (value: any) =>
  //     value ? value.size <= 5 * 1024 * 1024 : false
  //   ),
});

const CreateAssessmentPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [successLink, setSuccessLink] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
const [jobId,setJobId] = useState(0); 
  const navigate = useNavigate();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Assessment Link",
          text: "Attend this assessment:",
          url: successLink,
        });
      } catch (err) {}
    } else {
      setShareOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-pink-50">
      <Header />

      <div className="max-w-3xl mx-auto mt-12 pb-20 px-6">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          ✨ Create New Assessment
        </h2>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 animate-fadeIn">
          <Formik
            initialValues={{
              title: "",
              description: "",
              passPercentage: 70,
              file: null,
            }}
            validationSchema={AssessmentSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const socket = io("http://localhost:3001");

              try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("passPercentage", values.passPercentage.toString());
                formData.append("file", file||'');

                const res = await createAssessment(file, 1, values.title, values.description, values.passPercentage);
               console.log(res,"sjdhfkjshdajkfhsdkjfhkadjfhk=======");
                 localStorage.setItem("jobId", res.data.jobId);
                setJobId(+res.data.jobId);
                 socket.emit("join-assessment", res.data.assessmentCode);

  socket.on("assessment-status", (data) => {
    console.log("Live update:", data);
     alert("Failed to save assessment==========");
  });
                // Assume backend returns generated link
                setSuccessLink("http://localhost:3000/assessment/attend-assessment?id=" + res.data.id);
                navigate("/dashboard");
              } catch (err) {
                console.error(err);
                alert("Failed to save assessment");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* ---------------- Title ---------------- */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Assessment Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all text-gray-900"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* ---------------- Description ---------------- */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl h-28 outline-none focus:ring-2 focus:ring-purple-400 transition-all  text-gray-900"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* ---------------- PDF Upload ---------------- */}
                <div className="mx-auto bg-white rounded-3xl p-8 border border-gray-200 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
                    Upload PDF 📄
                  </h2>

                  <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-purple-400 rounded-2xl cursor-pointer hover:bg-purple-50 hover:border-purple-500 transition-all">
                    <p className="text-purple-700 font-semibold">
                    {file ? file.name : "Click to select a PDF"}
                    </p>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                  </label>

                  {errors.file && touched.file && (
                    <p className="text-red-500 text-sm mt-2">{errors.file}</p>
                  )}
                </div>

                {/* ---------------- Pass Percentage ---------------- */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    Pass Percentage
                  </label>
                  <Field
                    type="number"
                    name="passPercentage"
                    min={20}
                    max={100}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all  text-gray-900"
                  />
                  {errors.passPercentage && touched.passPercentage && (
                    <p className="text-red-500 text-sm mt-1">{errors.passPercentage}</p>
                  )}
                </div>

                {/* ---------------- Submit Button ---------------- */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:bg-purple-700 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Assessment generation in progress. Please wait..." : "Generate Assessment"}
                </button>
              </Form>
            )}
          </Formik>

          {/* ---------------- Success Message + Share ---------------- */}
          {successLink && (
            <div className="mt-8 p-6 bg-green-50 border border-green-300 rounded-2xl shadow-md animate-fadeIn">
              <h3 className="text-xl font-bold text-green-700 mb-3">
                🎉 Assessment Saved Successfully!
              </h3>

              <p className="text-gray-800 mb-3">
                Share this link with students:
              </p>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={successLink}
                  readOnly
                  className="flex-1 px-4 py-2 border rounded-xl bg-white  text-gray-900"
                />

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(successLink);
                    alert("Link copied!");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow"
                >
                  Copy
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl shadow"
                >
                  Share
                </button>
              </div>
            </div>
          )}

          {/* Custom Share Modal */}
          {shareOpen && (
            <div className="fixed inset-0 bg-amber-50 bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-80 animate-fadeIn space-y-4">
                <h3 className="text-lg font-bold text-purple-700 text-center">
                  Share Assessment
                </h3>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(successLink)}`}
                  target="_blank"
                  className="block bg-green-500 text-white text-center py-2 rounded-xl"
                >
                  WhatsApp
                </a>

                <a
                  href={`mailto:?subject=Assessment Link&body=${encodeURIComponent(
                    successLink
                  )}`}
                  className="block bg-blue-600 text-white text-center py-2 rounded-xl"
                >
                  Email
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    successLink
                  )}`}
                  target="_blank"
                  className="block bg-blue-500 text-white text-center py-2 rounded-xl"
                >
                  Facebook
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    successLink
                  )}`}
                  target="_blank"
                  className="block bg-blue-800 text-white text-center py-2 rounded-xl"
                >
                  LinkedIn
                </a>

                <button
                  onClick={() => setShareOpen(false)}
                  className="w-full py-2 bg-gray-300 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAssessmentPage;


//           {/* Generated Questions Preview */}

// {questions.length > 0 && (
//   <div className="mt-10 p-6 bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl border shadow-inner animate-fadeIn">
//     <h3 className="text-xl font-bold text-purple-700 mb-4">
//       📝 Generated Questions (Accordion)
//     </h3>

//     <div className="space-y-4">
//       {questions.map((q: any, index: number) => (
//         <div
//           key={index}
//           className="bg-white border rounded-2xl overflow-hidden shadow-md"
//         >
//           {/* Accordion Header */}
//           <button
//             className="w-full text-left px-4 py-4 flex justify-between items-center bg-purple-100 hover:bg-purple-200 transition-all"
//             onClick={() => toggleAccordion(index)}
//           >
//             <span className="font-semibold text-purple-800">
//               Q{index + 1}: {q.question}
//             </span>

//             <span className="text-purple-700 font-bold">
//               {openIndex === index ? "−" : "+"}
//             </span>
//           </button>

//           {/* Accordion Content */}
//           {openIndex === index && (
//             <div className="px-5 py-4 space-y-3 text-gray-700 bg-white animate-fadeIn">
//               {/* Options */}
//               <div>
//                 <p className="font-semibold text-purple-700 mb-1">
//                   Options:
//                 </p>
//                 <ul className="list-disc ml-6 space-y-1">
//                   {q.options.map((opt: string, i: number) => (
//                     <li key={i} className="text-gray-800">
//                       {opt}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Correct Answer */}
//               <div className="bg-green-50 p-3 rounded-xl border border-green-200">
//                 <p className="font-semibold text-green-700">
//                   ✅ Correct Answer:
//                 </p>
//                 <p className="text-green-800">{q.correct_answer}</p>
//               </div>

//               {/* Explanation */}
//               <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
//                 <p className="font-semibold text-blue-700">
//                   📘 Explanation:
//                 </p>
//                 <p className="text-blue-800">{q.explanation}</p>
//               </div>

//               {/* Cognitive Level */}
//               {q.cognitive_level && (
//                 <p className="text-sm text-purple-600 mt-2">
//                   🌐 Cognitive Level:
//                   <span className="font-semibold ml-1">
//                     {q.cognitive_level}
//                   </span>
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// )}