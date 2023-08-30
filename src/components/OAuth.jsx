import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
  return (
    <button className="flex justify-center items-center w-full mb-3 bg-red-700 hover:bg-red-800 px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out  ">
      <FcGoogle className="text-2xl bg-white rounded-full mr-3"/>
      continue with google
    </button>
  );
};

export default OAuth;
