//import React from 'react'
import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/context";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {

  const { userAtoken, userData, setUserData, loadUserProfileData, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  
  const updateUserProfileData = async () => {
    try {

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append(
        "address",
        JSON.stringify(userData.address)
      );
      image && formData.append('image', image)
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { Authorization: `Bearer ${userAtoken}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
              className="w-36 rounded opacity-75"
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? " " : assets.upload_icon}
              alt=""
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="w-32 rounded" src={userData.image} alt="" />
      )}
      {isEdit ? (
        <input
          className="bg-gray-50 border border-gray-400 focus-within:outline-none rounded-lg text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData(prev => ({...prev, name: e.target.value}));
          }}
        />
      ) : (
        <p className="text-3xl text-neutral-800 font-medium max-w-60 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="h-[1px] bg-zinc-400" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 border border-gray-400 focus-within:outline-none rounded-lg max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => {
                setUserData(prev => ({...prev, phone: e.target.value}));
              }}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50 border border-gray-400 focus-within:outline-none rounded-lg mb-1"
                type="text"
                value={userData.address.line1}
                onChange={(e) => {
                  setUserData(prev => ({...prev, address: {...prev, line1: e.target.value}}));
                }}
              />
              <br />
              <input
                className="bg-gray-50 border border-gray-400 focus-within:outline-none rounded-lg"
                type="text"
                value={userData.address.line2}
                onChange={(e) => {
                  setUserData(prev => ({...prev, address: {...prev, line2: e.target.value}}));
                }}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700">
          <p className="font-medium"> Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 max-w-20"
              value={userData.gender}
              onChange={(e) => {
                setUserData(prev => ({...prev, gender: e.target.value}));
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 border border-gray-400 focus-within:outline-none rounded-lg"
              type="date"
              value={userData.dob}
              onChange={(e) => {
                setUserData(prev => ({...prev, dob: e.target.value}));
              }}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>
      <div>
        {isEdit ? (
          <button
            className="border border-primary rounded-full py-3 px-8 hover:bg-primary hover:text-white transition-all duration-500"
            onClick={updateUserProfileData}
          >
            Save information 
          </button>
        ) : (
          <button
            className="border border-primary rounded-full py-3 px-8 hover:bg-primary hover:text-white transition-all duration-500"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
