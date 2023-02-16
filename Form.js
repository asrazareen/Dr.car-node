import React, { useEffect, useState } from "react";

const Form = ({ service }) => {
  const [user, setUser] = useState("Loading...");
  const [address, setAddress] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [services, setServices] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch("https://drcar.onrender.com/orders/user", {
      method: "GET",
      headers: { Authorization: token },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.name);
      });
  }, []);

  useEffect(() => {
    let servicesArr = [];
    const { ac, oil, engine, wash, full } = service;
    if (ac) servicesArr.push("AC");
    if (oil) servicesArr.push("OIL");
    if (engine) servicesArr.push("ENGINE");
    if (wash) servicesArr.push("WASH");
    if (full) servicesArr.push("FULL");
    setServices(servicesArr);
  }, [service]);

  async function book(e) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("user", user);
    formdata.append("address", address);
    formdata.append("brand", brand);
    formdata.append("model", model);
    formdata.append("fuel", fuel);
    formdata.append("status", "Pending");
    formdata.append("services", services);
    const res = await fetch("https://drcar.onrender.com/orders/", {
      method: "POST",
      headers: { Authorization: token },
      body: formdata,
    });
    const response = await res.json();
    setAddress("");
    setBrand("");
    setModel("");
    setFuel("");
    setMessage(response.message)
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  },[message])

  return (
    <div className="p-10 w-5/6 sm:w-2/4 lg:w-3/4 flex flex-col gap-5 items-center justify-centers bg-gray-500 shadow-lg shadow-gray-500 rounded">

      {/* POPUP */}

      {message ? (
         <>
          <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-gray-800 opacity-80 z-40"></div>
          <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50">
          <div className="fixed z-50 bg-green-500 flex justify-center items-center flex-col p-5 gap-5 w-5/6 sm:w-3/6 lg:w-1/4 rounded font-semibold">
            <p className="text-center break-words w-full">{message}</p>
            <span
              className="px-4 py-2 bg-blue-800 hover:bg-blue-600 rounded text-white ease-in-out duration-300 cursor-pointer"
              onClick={() => {
                setMessage("");
              }}
            >
              OK
            </span>
          </div>
          </div>
          </>
      ) : null}

      <form className=" md:w-5/6 w-full flex gap-5 flex-col ">
        <div className="text-white tracking-wide font-semibold p-2 w-full bg-gray-600 rounded">
          {/* {data?.name?.toUpperCase()} */}
          {user?.toUpperCase()}
        </div>
        <textarea
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-300 p-2 rounded outline-none cursor-auto resize-none w-full font-semibold text-black"
          value={address}
        />
        <input
          className="bg-gray-300 p-2 rounded outline-none cursor-auto w-full font-semibold text-black"
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
        <input
          className="bg-gray-300 p-2 rounded outline-none cursor-auto w-full font-semibold text-black"
          placeholder="Model"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        />
        <select
          onChange={(e) => setFuel(e.target.value)}
          className="bg-gray-300 p-2 rounded outline-none cursor-pointer w-full text-black font-semibold"
          value={fuel}
        >
          <option>Select Fuel Type</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
        </select>
        <button
          className="px-5 py-2 bg-blue-700 hover:bg-blue-600 font-bold tracking-wide rounded text-white disabled:opacity-50 disabled:hover:bg-blue-700"
          onClick={book}
          disabled={
            user && address && brand && model && fuel && services.length !== 0
              ? false
              : true
          }
        >
          BOOK NOW
        </button>
      </form>
    </div>
  );
};

export default Form;
