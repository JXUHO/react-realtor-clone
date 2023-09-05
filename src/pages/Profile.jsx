import { useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    navigate("/");
  };

  const editNameHandler = (event) => {
    setFormData((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const changeSubmitHandler = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name,
        })
      }
      toast.success("change success")
    } catch (error) {
      toast.error("failed to change name")
    }
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center flex-col items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form className="mb-6">
            <div className="mb-6 w-full">
              <input
                type="text"
                id="name"
                value={name}
                disabled={changeDetail ? false : true}
                onChange={editNameHandler}
                className={`w-full form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none false ${
                  changeDetail && "bg-red-200 focus:bg-red-200"
                } `}
              />
            </div>
            <div className="mb-6 w-full">
              <input
                type="text"
                id="name"
                value={email}
                disabled
                className="w-full form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none false"
              />
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex">
                Do want to change your name?
                <span
                  onClick={() => {
                    changeDetail && changeSubmitHandler();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 duration-200 transition ease-in-out ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={logoutHandler}
                className="text-blue-600 hover:text-blue-800 duration-200 transition ease-in-out cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
