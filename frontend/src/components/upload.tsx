import  { useState } from "react";
import { generateFromPdf } from "../pages/lib/upload";

interface UploadPanelProps {
  onQuestions: (qs: any[]) => void;
}

export default function UploadPanel({ onQuestions }: UploadPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return alert("Select a PDF first");
    setLoading(true);
    setMessage(null);
    try {
      const res = await generateFromPdf(file, setProgress);
      setMessage(
        `✅ Server: ${res.status} — ${res.total_questions} questions generated`
      );
      onQuestions(res.sample_questions || []);
    } catch (err: any) {
      setMessage("❌ Error: " + (err?.response?.data?.detail || err.message));
      console.error(err);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className=" mx-auto bg-white  rounded-3xl p-8 border border-gray-200 animate-fadeIn">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Upload PDF 📄
      </h2>

      {/* File Input */}
      <div className="flex flex-col items-center justify-center mb-6">
        <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed border-purple-400 rounded-2xl cursor-pointer hover:bg-purple-50 hover:border-purple-500 transition-all">
          <div className="flex flex-col items-center justify-center">
            <p className="text-purple-700 font-semibold">
              {file ? file.name : "Click to select a PDF"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF file only, max 5MB
            </p>
          </div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all hover:scale-105 ${
          loading || !file
            ? "bg-purple-300 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Generating Questions..." : "Generate Questions"}
      </button>

      {/* Progress Bar */}
      {loading && (
        <div className="mt-6">
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-purple-700 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm mt-2 text-purple-700 font-semibold">
            {progress}% Completed
          </p>
        </div>
      )}

      {/* Message */}
      {message && (
        <div
          className={`mt-6 text-center text-sm font-semibold p-2 rounded-lg ${
            message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}