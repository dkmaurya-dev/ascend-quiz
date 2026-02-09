import { Header } from "../../components/header";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-pink-50">
      <Header />

      <div className="max-w-md mx-auto mt-20 bg-white/90 backdrop-blur p-10 shadow-2xl rounded-3xl border border-purple-100 animate-fadeIn">
        
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-8">
          Create an Account
        </h2>

        <form className="space-y-5">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all  text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>

          {/* Role Selection */}
          <div>
            <select className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400 transition-all bg-white text-gray-700">
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:scale-[1.02] transition-all"
          >
            Register
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
