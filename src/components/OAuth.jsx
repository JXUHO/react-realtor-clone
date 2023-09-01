import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const clickHandler = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // OAuth로 singup한 user firestore에 저장.
      // 기존에 존재하는지 확인. firestore에 저장된 id비교
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {  // firestore에 없으면 추가
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate("/")
      
    } catch (error) {
      toast.error("Error: faild to sign in");
      console.log(error)
    }
  };

  return (
    <button
      type="button"
      onClick={clickHandler}
      className="flex justify-center items-center w-full mb-3 bg-red-700 hover:bg-red-800 px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out  "
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-3" />
      continue with google
    </button>
  );
};

export default OAuth;
