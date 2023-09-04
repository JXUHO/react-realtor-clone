import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name, email} = formData;

  // const docRef = doc(db, "users", )
  console.log("Profile page")

  const logoutHandler = () => {
    auth.signOut()
    navigate("/")
  }


  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center flex-col items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form className="mb-6">
            <div className="mb-6 w-full">
              <input type="text" id="name" value={name} disabled className="w-full form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none false"></input>
            </div>
            <div className="mb-6 w-full">
              <input type="text" id="name" value={email} disabled className="w-full form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none false"></input>
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex">
              Do want to change your name?
              <span className="text-red-600 hover:text-red-700 duration-200 transition ease-in-out ml-1 cursor-pointer">Edit</span>
              </p>
              <p onClick={logoutHandler} className="text-blue-600 hover:text-blue-800 duration-200 transition ease-in-out cursor-pointer">Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )

}

export default Profile;