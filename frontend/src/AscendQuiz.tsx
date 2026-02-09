import React, { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Question {
  question: string;
  options: string[];
  answer: string;
  cognitive_level: string;
  estimated_correct_pct: number;
  difficulty_label: number;
}

interface ApiResponse {
  status: string;
  total_questions: number;
  difficulty_distribution: Record<string, number>;
  sample_questions: Question[];
  invalid_count: number;
  mastery_score?: number;
}

const AscendQuiz: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a PDF first!");
    setLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post<ApiResponse>(
        "http://localhost:8000/generate-questions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating questions!");
    } finally {
      setLoading(false);
    }
  };

  const chartData =
    data &&
    Object.entries(data.difficulty_distribution).map(([difficulty, count]) => ({
      difficulty,
      count,
    }));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        AscendQuiz 🎓
      </h1>

      {/* File upload */}
      <div className="mb-6 border border-gray-300 p-6 rounded-xl bg-white shadow-sm">
        <label className="block text-sm font-medium mb-2">
          Upload a PDF file:
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {/* Results */}
      {data && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">📊 Difficulty Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData||[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="difficulty" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              🧠 Sample Questions ({data.sample_questions.length})
            </h2>
            {data.sample_questions.map((q, i) => (
              <div key={i} className="border-b border-gray-200 pb-4 mb-4">
                <p className="font-medium mb-2">
                  {i + 1}. {q.question}
                </p>
                <ul className="list-disc ml-6 mb-2">
                  {q.options.map((opt, j) => (
                    <li key={j}>{opt}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-700">
                  ✅ <strong>Answer:</strong> {q.answer} <br />
                  🧩 Level: {q.cognitive_level} | 🎯 Difficulty:{" "}
                  {q.difficulty_label} | 📈 Correct: {q.estimated_correct_pct}%
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold mb-2">🏆 Mastery Score</h2>
            <p className="text-3xl font-bold text-indigo-600">
              {data.mastery_score ?? 0}/100
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AscendQuiz;
