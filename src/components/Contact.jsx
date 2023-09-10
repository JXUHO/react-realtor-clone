import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contact = ({ userRef, listing, setContactLandlord }) => {
  const [landlord, setLandlord] = useState();
  const [message, setMessage] = useState("");

  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef); // 해당 doc의 user정보 가지고옴
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setLandlord(docSnap.data());
      } else {
        toast.error("can't get landlord data");
      }
    };

    getLandlord();
  }, [userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              onChange={messageHandler}
              name="message"
              id="message"
              rows="2"
              value={message}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};
export default Contact;
