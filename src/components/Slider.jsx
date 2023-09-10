import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      let listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, doc: doc.data() });
      });
      setLoading(false);
      setListings(listings);
      // console.log(listings);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    // console.log("listings empty");
    return <></>;
  }

  return (
    <>
      <Swiper
        effect={"fade"}
        pagination={{
          type: "progressbar",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
      >
        {listings.map((listing) => (
          <SwiperSlide
            key={listing.id}
            onClick={() => {
              navigate(`/category/${listing.doc.type}/${listing.id}`);
            }}
            className="cursor-pointer"
          >
            <div
              style={{
                background: `url(${listing.doc.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="relative w-full overflow-hidden h-[300px]"
            ></div>
            <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
              {listing.doc.name}
            </p>
            <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ${listing.doc.discountedPrice ?? listing.doc.regularPrice}
                {listing.doc.type === "rent" && " / month"}
              </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
