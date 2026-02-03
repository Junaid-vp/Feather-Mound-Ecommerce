import { Field, Form, Formik } from "formik";
import React from "react";

import { AddressValidation } from "./Address-Validation";
import { useContext, useState } from "react";
import { api } from "../Api/Axios";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const initialvalueAdress = {
  name: "",
  number: "",
  pinCode: "",
  locality: "",
  address: "",
  city: "",
  state: "",
};

function Address() {
  const { userData, setClick } = useContext(AuthContext);
  const HandleSubmit = async (value, { resetForm }) => {
    try {
      await api.post("/auth/address", value);
      resetForm();
      setClick((prev) => !prev);
      toast.success("Address saved successfully.", {
        position: "top-right",
        autoClose: 1600,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "premium-toast success",
      });
    } catch (err) {
      console.error("Something Error", err);
      toast.error("Failed to save address");
    }
  };

  return (
    <>
      {!userData?.address ? (
        <section className="flex justify-center items-center bg-gradient-to-b from-gray-50 to-white">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg px-8 py-10 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-wide">
              Add Delivery Address
            </h2>

            <Formik
              initialValues={initialvalueAdress}
              validationSchema={AddressValidation}
              onSubmit={HandleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Full Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                    />
                    {errors.name && touched.name && (
                      <small className="text-red-600">{errors.name}</small>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Mobile Number
                    </label>
                    <Field
                      name="number"
                      type="tel"
                      placeholder="10-digit Mobile Number"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                    />
                    {errors.number && touched.number && (
                      <small className="text-red-600">{errors.number}</small>
                    )}
                  </div>

                  {/* Pin code & Locality */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Pin Code
                      </label>
                      <Field
                        name="pinCode"
                        type="tel"
                        placeholder="Pincode"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                      {errors.pinCode && touched.pinCode && (
                        <small className="text-red-600">{errors.pinCode}</small>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Locality
                      </label>
                      <Field
                        name="locality"
                        type="text"
                        placeholder="Locality"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                      {errors.locality && touched.locality && (
                        <small className="text-red-600">
                          {errors.locality}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Full Address
                    </label>
                    <Field
                      as="textarea"
                      name="address"
                      rows="3"
                      placeholder="House no., Building, Street, Landmark"
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                    />
                    {errors.address && touched.address && (
                      <small className="text-red-600">{errors.address}</small>
                    )}
                  </div>

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        City
                      </label>
                      <Field
                        name="city"
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                      {errors.city && touched.city && (
                        <small className="text-red-600">{errors.city}</small>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        State
                      </label>
                      <Field
                        name="state"
                        type="text"
                        placeholder="State"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                      />
                      {errors.state && touched.state && (
                        <small className="text-red-600">{errors.state}</small>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition duration-200 active:scale-95"
                  >
                    Save Address
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      ) : (
        <section className="flex justify-center items-center py-12 bg-gray-50">
          <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">
              Saved Address
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {userData.address.name}
              </p>
              <p>
                <span className="font-semibold">Mobile:</span>{" "}
                {userData.address.number}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{" "}
                {userData.address.pinCode}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {userData.address.address}
              </p>
              <p>
                <span className="font-semibold">City:</span>{" "}
                {userData.address.city}
              </p>
              <p>
                <span className="font-semibold">State:</span>{" "}
                {userData.address.state}
              </p>
            </div>

            <button
              onClick={async () => {
                try {
                  await api.post("/auth/address/clear");
                  setClick((prev) => !prev);
                  toast.success("Address cleared successfully.", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    className: "premium-toast success",
                  });
                } catch (err) {
                  console.error("Error clearing address", err);
                  toast.error("Failed to clear address");
                }
              }}
              className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition-all"
            >
              Change Address
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default Address;
