import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { checkStatus, getAssessmentList, updateAssessmentStatus } from "../lib/api";
import { Header } from "../../components/header";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
// --------------------------------------------------
// Skeleton Loader Component
// --------------------------------------------------
const SkeletonCard = () => (
  <div className="bg-white/70 animate-pulse border border-purple-100 rounded-3xl p-7 shadow">
    <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
    <div className="h-10 bg-gray-300 rounded w-full"></div>
  </div>
);

// --------------------------------------------------
// Assessment Card Component
// --------------------------------------------------
const AssessmentCard = ({ item }: any) => {
  if(!item?.jobId) return;
  if(item?.status=="generating") {;
  setInterval(()=>{
checkStatus(Number(item?.jobId)??0).then((res)=>{
  let status="active";
if(res.data.state=="completed"){
  status="completed";
}
else if(res.data.state=="failed"){
  status="failed";
}

if(status!=="active"){
updateAssessmentStatus(item?.assessmentCode,status).then((res)=>{
      console.log("res:",res);
//     toast.success(`Assessment ${status} successfully!`, {
// position: "top-center",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// transition: Bounce,
//     });
    });
  }
 })
},60000)
  }
  return (
    <div className="bg-white/90 backdrop-blur border border-purple-100 shadow-xl rounded-3xl p-7 transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
      <h3 className="font-bold text-xl text-gray-800 mb-2">{item?.title}</h3>

      <p className="text-gray-700 mb-2">{item?.description}</p>

      <p className="text-sm text-blue-600 mb-4 underline">
        <a href={`/assessment/?id=${item?.assessmentCode}`}>
          Attend this assessment
        </a>
      </p>

      <p className="text-sm text-gray-500">Status: {item?.status}</p>

      <p className="text-sm text-gray-600 mb-4">
        📅 Created:{" "}
        <span>{new Date(item?.createdAt).toLocaleDateString()}</span>
      </p>

      <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-medium shadow hover:bg-purple-700 hover:scale-[1.03] transition-all">
        View Assessment <ArrowRight size={18} />
      </button>
    </div>
  );
};

// --------------------------------------------------
// Main Dashboard Component
// --------------------------------------------------
const DashboardPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const debounceRef = useRef<any>(null);

  // --------------------------------------------------
  // API Call
  // --------------------------------------------------
  const fetchData = useCallback(() => {
    setLoading(true);

    getAssessmentList({ search, sort, page, limit: 6 })
      .then((res) => {
        setData(res.data || []);
      })
      .finally(() => setLoading(false));
  }, [search, sort, page]);

  // Run API when sort/page changes
  useEffect(() => {
    fetchData();
  }, [sort, page, fetchData]);

  // Debounced Search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchData();
    }, 300);
  }, [search, fetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-pink-50 animate-fadeIn">
      <Header />

      <div className="max-w-6xl mx-auto mt-16 px-6">
        {/* -------------------------------------------------- */}
        {/* Dashboard Header */}
        {/* -------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-4xl font-extrabold text-purple-700">
            📊 Dashboard
          </h2>

          <div className="flex items-center gap-3 w-full sm:w-auto text-gray-600">
            {/* Search */}
            <input
              type="text"
              placeholder="Search assessments..."
              className="border px-4 py-2 rounded-lg w-full sm:w-64 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Sort */}
            <select
              className="border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>

          <Link
            to="/assessment/create"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:scale-[1.03] transition-all"
          >
            ➕ Create Assessment
          </Link>
        </div>

        {/* -------------------------------------------------- */}
        {/* Assessment Cards */}
        {/* -------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          {!loading &&
            data.map((item: any) => (
              <AssessmentCard key={item.assessmentCode} item={item} />
            ))}
        </div>

        {/* -------------------------------------------------- */}
        {/* Empty State */}
        {/* -------------------------------------------------- */}
        {!loading && data.length === 0 && (
          <div className="text-center mt-20 text-gray-600">
            <p className="text-lg">No assessments found.</p>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* Pagination (if you enable backend pagination) */}
        {/* --------------------------------------------------
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-lg border shadow text-gray-900 ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-100"
            }`}
          >
            ◀ Previous
          </button>

          <span className="font-semibold text-gray-700">
            Page {page}
          </span>

          <button
            disabled={data.length < 6}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-lg border shadow text-gray-900 ${
              data.length < 6 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-100"
            }`}
          >
            Next ▶
          </button>
        </div>
        -------------------------------------------------- */}
      </div>
    </div>
  );
};

export default DashboardPage;
