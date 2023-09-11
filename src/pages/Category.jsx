import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router-dom";


const Category = () => {
  const [listings, setListings] = useState();
  const [loading, setLoading] = useState(false);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const lastFetched = querySnapshot.docs[querySnapshot.docs.length - 1];
        // console.log(lastFetched.data())
        setLastFetchedListing(lastFetched);

        const listings = [];
        querySnapshot.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
        // console.log("fetched")
      } catch (error) {
        console.log(error);
        toast.error("can't fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  const loadMoreHandler = async () => {
    try {
      setLoading(true);
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const lastFetched = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastFetchedListing(lastFetched);

      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(prevState => [...prevState, ...listings]);
      setLoading(false);
      // console.log("fetched")
    } catch (error) {
      console.log(error);
      toast.error("can't fetch listings");
    }
  }


  return (
    <div className="max-w-6xl mx-auto px-3">
      {loading && <Spinner />}
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">Places for {params.categoryName}</h1>
      {listings && listings.length === 0 && <p>There are no current offers</p>}
      {listings && listings.length !== 0 && (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button onClick={loadMoreHandler} className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out">
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
