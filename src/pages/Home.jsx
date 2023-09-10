import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "../components/Slider";
import Spinner from "../components/Spinner";

const Home = () => {

  return (
    <>
      <Slider />
      <p>home</p>
    </>
  );
};

export default Home;
