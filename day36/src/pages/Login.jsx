import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { httpRequest } from "../tools/httpRequest";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const continueUrl = searchParams.get("continue") ?? "/";
  const navigate = useNavigate();
  const { user, getProfile } = useAuth();
  const accessToken = localStorage.getItem("access_token");
  const formRef = useRef();
  useEffect(() => {
    formRef.current[0].focus();
  }, []);
  if (user.name) {
    return <Navigate to={"/"} replace />;
  }
  const handleEnterEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleEnterPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      setError("");
      if (!email) {
        setError("Vui lòng nhập email");
        return;
      }
      if (!password) {
        setError("Vui lòng nhập password");
        return;
      }
      setLoading(true);
      const response = await httpRequest.post(`/login`, { email, password });
      if (!response) {
        throw new Error("Unauthorized");
      }
      const data = response.data;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      getProfile();
      navigate(continueUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {accessToken ? (
        <p className="max-w-300 mx-auto text-center font-semibold text-3xl">
          Loading...
        </p>
      ) : (
        <div className="max-w-300 mx-auto flex flex-col justify-center items-center py-2 ">
          <form
            onSubmit={handleSubmitForm}
            className="w-100 border border-gray-500 rounded-lg p-4"
            ref={formRef}
          >
            <h1 className="text-3xl font-bold text-center">LOGIN</h1>
            {error && (
              <p className="my-2 py-2 bg-red-200 rounded-md border border-red-500 text-red-500 font-semibold text-center ">
                {error}
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="text-lg font-medium cursor-pointer"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email..."
                value={email}
                onChange={handleEnterEmail}
                className="w-full outline-none border border-gray-400 rounded-sm mb-3 mt-1 px-2 py-1 text-lg focus:border-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-lg font-medium cursor-pointer"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={handleEnterPassword}
                className="w-full outline-none border border-gray-400 rounded-sm mb-3 mt-1 px-2 py-1 text-lg focus:border-red-500"
              />
            </div>

            <button className="w-full mt-2 py-1 bg-red-400 border border-red-500 rounded-sm font-medium text-white cursor-pointer hover:bg-red-500">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/* Yêu cầu
  - Submit form
  - Lấy email, password
  - So sánh email = 'admin@gmail.com', password = '123456'
  - Nếu đúng -> Chuyển hướng về trang trước khi bị chuyển hướng
  - 
*/
