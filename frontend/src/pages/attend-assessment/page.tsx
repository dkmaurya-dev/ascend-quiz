'use client';
import  { useState, useEffect } from "react";
import { publishAssessment } from "../lib/api";
import { useSearchParams } from "react-router-dom";

type Question = {
  question: string;
  options: string[];
  correct_answer: string;
  cognitive_level: string;
  estimated_correct_pct: number;
  difficulty_label: number;
  reasoning?: string; // Added reasoning field
  explanation?: string; // Added explanation field
};

interface QuizProps {
  questions: Question[];
}

const difficultyNames: Record<number, string> = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Very Hard",
  6: "Expert",
  7: "Genius",
  8: "Impossible",
};

// Difficulty color mapping is not strictly used in the final design but kept for potential future use
/*
const difficultyColors: Record<number, string> = {
  1: "bg-green-200 text-green-800",
  2: "bg-lime-200 text-lime-800",
  3: "bg-yellow-200 text-yellow-800",
  4: "bg-orange-200 text-orange-800",
  5: "bg-red-200 text-red-800",
  6: "bg-purple-200 text-purple-800",
  7: "bg-indigo-200 text-indigo-800",
  8: "bg-black text-white",
};
*/
interface Result {
  score: number;
  total_questions: number;
}


interface Assessment {
  id: number;
  teacher_id: number;
  title: string;
  description: string;
  pdf_path: string | null;
  pass_percent: number;
  total_questions: number;
  difficulty_distribution: Record<number, number>;
  created_at: string;
} 
export default function AdaptiveQuiz() {
  const [questions, setQuestions] = useState<Question[]>([
  
  ]);
  const [assessment, setAssessment] = useState<Assessment>({
    id: 0,
    teacher_id: 0,
    title: "",
    description: "",
    pdf_path: "",
    pass_percent: 0,
    total_questions: 0,
    difficulty_distribution: {},
    created_at: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [askedIndices, setAskedIndices] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(1);
  const [result, setResult] = useState<Result | null>(null);
   const [searchParams, _] = useSearchParams();

      // Get a specific query parameter by name
      const assessmentId = searchParams.get('id');
  // Group questions by difficulty
  const questionsByDifficulty: Record<number, Question[]> = {};
  for (let i = 1; i <= 8; i++) {
    questionsByDifficulty[i] = questions.filter(
      (q) => q.difficulty_label === i
    );
  }
// Call API to get questions
useEffect(() => {
  console.log("Assessment ID:",assessmentId);

  publishAssessment(assessmentId||'').then((res) => {
    const {questions,...assessment} = res.data;
    setAssessment(assessment);
    setQuestions(questions);
    console.log(res,"assessment");
    // setQuestions(res);
  });
},[assessmentId])

  // Initialize first question randomly
  useEffect(() => {
    if (!questions || questions.length === 0) return;
    const allQs = questions.filter(
      (q) => q.difficulty_label >= 1 && q.difficulty_label <= 8
    );
    const first = allQs[Math.floor(Math.random() * allQs.length)];
    setCurrentQuestion(first);
    setCurrentDifficulty(first.difficulty_label);
    setAskedIndices([questions.indexOf(first)]);
    setScore(0);
    setProgress(0);
  }, [questions]);

  if (!currentQuestion) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-xl font-medium text-gray-700">Loading or No questions available.</div>
    </div>
  );

  // Helper to find the correct option index based on the answer letter (A, B, C, D)
  const correctIndex = currentQuestion.options.findIndex((opt) =>
    opt.toUpperCase().startsWith(currentQuestion.correct_answer.toUpperCase() + ".")
  );

  function handleSubmit() {
    if (selected === null) return;

    const correct = selected === correctIndex;
    setShowAnswer(true);
    if (correct) setScore((s) => s + 1);

    // Update progress calculation only if the submission is correct (as per the original logic intent)
    // const totalAnswered = askedIndices.length;
    // const newProgress = ((correct ? score + 1 : score) / totalAnswered) * 100;
    const sections = 100/Number(questions.length);
    const wrong = askedIndices.length-1 - score;
    const percentage = correct?sections*(score+Number(correct))-(sections/2)*wrong:sections*(score)-(sections/2)*(wrong+1);
console.log("sections:",sections,"wrong:",wrong,"score:",score,"questions:",questions.length,"percentage:",percentage);
    setProgress(percentage);
  }

  function handleNext() {
    setShowAnswer(false);
    setSelected(null);

    const answeredCorrectly = selected === correctIndex;

    // Determine next difficulty
    let nextDifficulty = currentDifficulty;
    if (answeredCorrectly && currentDifficulty < 8) nextDifficulty++;
    if (!answeredCorrectly && currentDifficulty > 1) nextDifficulty--;

    // Pick next question from that difficulty not yet asked
    const candidates = questionsByDifficulty[nextDifficulty]?.filter(
      (q) => !askedIndices.includes(questions.indexOf(q))
    ) || [];

    let nextQ: Question;
    if (candidates.length === 0) {
      // Fallback: Check all remaining questions regardless of difficulty
      const remaining = questions.filter(
        (_, idx) => !askedIndices.includes(idx)
      );
      if (remaining.length === 0) {
        setResult({ score: score, total_questions: questions.length });
        return;
      }
      nextQ = remaining[Math.floor(Math.random() * remaining.length)];
      nextDifficulty = nextQ.difficulty_label; // Reset difficulty to the new question's label
    } else {
      nextQ = candidates[Math.floor(Math.random() * candidates.length)];
    }

    setCurrentQuestion(nextQ);
    setCurrentDifficulty(nextDifficulty);
    setAskedIndices((a) => [...a, questions.indexOf(nextQ)]);
  }


/* ----- PREMIUM BEAUTIFUL UI DESIGN ----- */

// Outer container for centering the entire component
return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 bg-yellow shadow-2xl   border border-blue-200 animate-fadeIn">
    <div className="w-full max-w-3xl">
      {result ? (
        // Result Screen (Centered)
        <div className="text-center">
          <div className="bg-white shadow-2xl rounded-3xl p-12 border border-blue-200 animate-fadeIn">
            <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm mb-4">
              🎉 Quiz Completed!
            </h2>

            <p className="text-lg text-gray-700 mb-8">
              Your Score:
              <span className="font-bold text-blue-700">
                {" "}
                {result.score} / {result.total_questions}
              </span>
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      ) : (
        // Quiz Main Body
        <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-blue-100 animate-fadeIn">
          
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight ">{assessment.title}<h4 className="text-gray-500 text-xl sm:text-xl">  ({assessment.description})</h4></h2>
          
          <div className="flex items-center justify-between mb-8 border-b pb-4">
         
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Question {askedIndices.length}
              <span className="text-gray-500 text-xl sm:text-2xl"> / {questions.length}</span>
            </h3>

            <span
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-md 
                bg-blue-100 text-blue-700`}
            >
              {difficultyNames[currentDifficulty]}
            </span>
          </div>
            {/* Progress Bar */}
<div className="my-6">
  <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-300">
    <div
      className={`h-full bg-blue-700 transition-all duration-700 ease-out  `}
      style={{ width: `${Math.ceil(progress)}%`}}
    ></div>
  </div>

  <p className="text-center text-sm mt-2 font-semibold text-blue-700">
    {Math.ceil(progress)}% Score
  </p>
</div>



          {/* Question Body */}
          <div className="mb-10">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed drop-shadow-sm">
              {currentQuestion.question}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              🧠 Level:{" "}
              <span className="font-semibold text-gray-700">
                {currentQuestion.cognitive_level}
              </span>{" "}
              | 📊 Estimated Correct:{" "}
              <span className="font-semibold text-gray-700">
                {currentQuestion.estimated_correct_pct}%
              </span>
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((opt, i) => {
              const isCorrect = showAnswer && i === correctIndex;
              const isSelected = selected === i;
              const wrongSelected = showAnswer && isSelected && i !== correctIndex;

              return (
                <label
                  key={i}
                  className={`flex items-start p-4 text-base sm:text-lg rounded-2xl transition-all shadow-md
                  ${
                    showAnswer
                      ? (isCorrect
                        ? "bg-blue-50 border border-blue-500 shadow-lg scale-[1.01] cursor-default"
                        : wrongSelected
                        ? "bg-red-50 border border-red-500 shadow-lg scale-[1.01] cursor-default"
                        : "bg-gray-50 border border-gray-200 cursor-default")
                      : (isSelected
                        ? "bg-blue-50 border border-blue-400 shadow-lg scale-[1.01] cursor-pointer"
                        : "bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer")
                  }`}
                >
                  <input
                    type="radio"
                    name={`q_${askedIndices.length}`}
                    checked={isSelected}
                    onChange={() => setSelected(i)}
                    disabled={showAnswer}
                    className="mt-1 mr-4 h-5 w-5 accent-blue-600 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-gray-800 flex-grow">{opt}</span>
                  <br />
                </label>
              );
            })}
          </div>

          {/* Buttons + Score */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-4 border-t">
            {!showAnswer ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg 
                transition-all disabled:opacity-40 transform hover:scale-105 order-2 sm:order-1"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-lg 
                transition-all transform hover:scale-105 order-2 sm:order-1"
              >
                {askedIndices.length < questions.length ? "Next Question" : "See Result"}
              </button>
            )}

            <div className="text-gray-600 font-semibold text-lg mb-4 sm:mb-0 order-1 sm:order-2">
              Total Score:{" "}
              <span className="text-blue-700 font-bold">
                {score}
              </span>{" "}
              / {questions.length}
            </div>
          </div>

          {/* Answer Feedback */}
          {showAnswer && (
            <div className="mt-8">
              {selected === correctIndex ? (
                <p className="text-blue-600 font-bold text-xl">✅ Correct!</p>
              ) : (
                <p className="text-red-600 font-bold text-xl">
                  ❌ Incorrect — Correct Answer:{" "}
                  <span className="font-semibold">{currentQuestion.correct_answer}</span>
                </p>
              )}
            </div>
          )}

          {/* Explanation */}
          {showAnswer && currentQuestion.explanation && (
            <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-xl shadow">
              <p className="font-bold text-blue-700 text-lg">📘 Explanation</p>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
}