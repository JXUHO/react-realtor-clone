import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    // console.log(email)
  };

  return (
    <>
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-center w-full mt-6 font-bold">Sign Up</h1>
        <div className="container px-6 py-12 max-w-6xl mx-auto flex justify-center items-top flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-6">
            <img
              src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="login-img"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="w-full md:w-8/12 lg:w-5/12 lg:ml-20">
            <form className="mb-6">
            <div className="mb-6 w-full">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Full name"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-6 w-full">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email address"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                {showPassword ? (
                  <AiFillEye
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                  />
                ) : (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="absolute right-3 top-3 text-xl cursor-pointer"
                  />
                )}
              </div>
              <div className="flex  justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="flex items-center mb-6 flex-wrap">
                  Have an account?
                  <Link
                    to="/sign-in"
                    className="text-red-600 hover:text-red-700 duration-200 transition ease-in-out ml-1"
                  >
                    Sign in
                  </Link>
                </p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Sign in
              </button>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300  before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">or</p>
              </div>
              <OAuth/>
             
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
