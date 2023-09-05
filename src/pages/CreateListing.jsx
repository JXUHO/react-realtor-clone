import { useState } from "react";

const CreateListing = () => {
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
  });
  const onChange = () => {};

  return (
    <>
      <main className="max-w-md  px-2 mx-auto ">
        <h1 className="text-3xl text-center w-full mt-6 font-bold">
          Create a Listing
        </h1>
        <form>
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
                formData.type === "sell"
                  ? "bg-slate-600 text-white"
                  : "bg-white text-black"
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
              minLength="10"
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
                    required={offer}
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
