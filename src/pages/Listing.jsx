import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

const Listing = () => {
  const params = useParams();
  const location = useLocation();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {listing.name}
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
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="relative w-full overflow-hidden h-[300px]"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && (
        <div className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied!
        </div>
      )}
    </main>
  );
};

export default Listing;
