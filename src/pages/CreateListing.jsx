import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


const CreateListing = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+formData.discountedPrice >= +formData.regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (formData.images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          formData.address
        }&key=${import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = formData.latitude;
      geolocation.lng = formData.longitude;
    }
    
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };


    const imgUrls = await Promise.all(
      [...formData.images].map((image) => {
      return storeImage(image)}
      )
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });



    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);  // dynamic routing 추가 후 activate
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="max-w-md  px-2 mx-auto ">
        <h1 className="text-3xl text-center w-full mt-6 font-bold">
          Create a Listing
        </h1>
        <form onSubmit={onSubmit}>
          <p className="text-lg text-start w-full mt-6 font-semibold">
            Sell / Rent
          </p>
          <div className="flex">
            <button
              onClick={onChange}
              type="button"
              id="type"
              value="sale"
              className={`inline-block px-7 py-3 mr-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.type === "rent"
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              Sell
            </button>
            <button
              onClick={onChange}
              type="button"
              id="type"
              value="rent"
              className={`inline-block px-7 py-3 ml-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.type === "rent"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Rent
            </button>
          </div>

          <p className="text-lg text-start w-full mt-6 font-semibold">Name</p>
          <div className="mb-6 w-full">
            <input
              type="text"
              id="name"
              onChange={onChange}
              value={formData.name}
              placeholder="Name"
              maxLength="32"
              minLength="2"
              required
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones"
            />
          </div>

          <div className="flex space-x-6">
            <div>
              <p className="text-lg text-start w-full font-semibold">Beds</p>
              <div className="mb-6 w-full">
                <input
                  onChange={onChange}
                  type="number"
                  id="beds"
                  value={formData.beds}
                  min="1"
                  max="50"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones text-center"
                />
              </div>
            </div>
            <div>
              <p className="text-lg text-start w-full font-semibold">Baths</p>
              <div className="mb-6 w-full">
                <input
                  onChange={onChange}
                  type="number"
                  id="baths"
                  value={formData.baths}
                  min="1"
                  max="50"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones text-center"
                />
              </div>
            </div>
          </div>

          <p className="text-lg text-start w-full mt-6 font-semibold">
            Parking spot
          </p>
          <div className="flex">
            <button
              onClick={onChange}
              type="button"
              id="parking"
              value={true}
              className={`inline-block px-7 py-3 mr-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.parking
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              id="parking"
              value={false}
              className={`inline-block px-7 py-3 ml-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.parking
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>

          <p className="text-lg text-start w-full mt-6 font-semibold">
            Furnished
          </p>
          <div className="flex">
            <button
              onClick={onChange}
              type="button"
              id="furnished"
              value={true}
              className={`inline-block px-7 py-3 mr-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.furnished
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              id="furnished"
              value={false}
              className={`inline-block px-7 py-3 ml-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.furnished
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>

          <p className="text-lg text-start w-full mt-6 font-semibold">
            Address
          </p>
          <div className="mb-6 w-full">
            <textarea
              onChange={onChange}
              name="address"
              id="address"
              placeholder="Address"
              value={formData.address}
              required
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones"
            ></textarea>
          </div>
          {!geolocationEnabled && (
            <div className="flex space-x-6 justify-start mb-6">
              <div>
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={formData.latitude}
                  min="-90"
                  max="90"
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={formData.longitude}
                  min="-180"
                  max="180"
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
            </div>
          )}

          <p className="text-lg text-start w-full mt-6 font-semibold">
            Description
          </p>
          <div className="mb-6 w-full">
            <textarea
              onChange={onChange}
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              required
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones"
            ></textarea>
          </div>

          <p className="text-lg text-start w-full mt-6 font-semibold">Offer</p>
          <div className="flex">
            <button
              onClick={onChange}
              type="button"
              id="offer"
              value={true}
              className={`inline-block px-7 py-3 mr-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.offer
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Yes
            </button>
            <button
              onClick={onChange}
              type="button"
              id="offer"
              value={false}
              className={`inline-block px-7 py-3 ml-3 font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full ${
                formData.offer
                  ? "bg-white text-black"
                  : "bg-slate-600 text-white"
              }`}
            >
              No
            </button>
          </div>

          <div className="flex justify-start space-x-6 items-center">
            <div>
              <p className="text-lg text-start w-full mt-6 font-semibold">
                Regular Price
              </p>
              <div className="w-full flex justify-center space-x-6 items-center mb-6">
                <input
                  onChange={onChange}
                  type="number"
                  id="regularPrice"
                  // defaultValue="50"
                  min="50"
                  max="400000000"
                  required
                  value={formData.regularPrice}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones text-center"
                />
                {formData.type === "rent" && (
                  <div>
                    <p className="text-md  w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {formData.offer && (
            <div className="flex justify-start space-x-6 items-center">
              <div>
                <p className="text-lg text-start w-full mt-6 font-semibold">
                  Discounted Price
                </p>
                <div className="w-full flex justify-center space-x-6 items-center mb-6">
                  <input
                    onChange={onChange}
                    type="number"
                    id="discountedPrice"
                    min="50"
                    max="400000000"
                    required={formData.offer}
                    value={formData.discountedPrice}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-nones text-center"
                  />
                  {formData.type === "rent" && (
                    <div>
                      <p className="text-md  w-full whitespace-nowrap">
                        $ / Month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <div className="mb-3 w-full">
              <p className="text-lg text-start w-full mt-6 font-semibold">
                Images
              </p>
              <p className="text-gray-600">
                The first image will be the cover (max 6).
              </p>
              <input
                type="file"
                id="images"
                onChange={onChange}
                accept=".jpg,.png,.jpeg"
                max="6"
                multiple
                required
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mb-6 mt-6 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Create Listing
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateListing;
