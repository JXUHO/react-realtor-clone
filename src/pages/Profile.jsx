import { useEffect, useState } from "react";

import { db } from "../firebase";
import { getAuth, updateProfile } from "firebase/auth";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import ListingItem from "../components/ListingItem";

import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: name,
        });
      }
      toast.success("change success");
    } catch (error) {
      toast.error("failed to change name");
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {  // 데이터 가지고오기
      setIsLoading(true);
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      
      let listings = [];
      querySnapshot.forEach((doc) => {  // array.forEach아님. querySnapshot의 method.
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      // console.log(listings)

      setListings(listings);  // 데이터 state로 업데이트
      setIsLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

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
            <button
              onClick={() => {
                navigate("/create-listing");
              }}
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
              <div className="flex justify-center items-center">
                <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
                Sell or rent your home
              </div>
            </button>
          </form>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!isLoading && listings && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listing
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
