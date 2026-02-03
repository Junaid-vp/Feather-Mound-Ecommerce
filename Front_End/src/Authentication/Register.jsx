import React from "react";
import { Formik, Form, Field } from "formik";
import { RegValidation } from "./Reg-Validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../Api/Axios";

const initialvalue = {
  Fname: "",
  Lname: "",
  email: "",
  password: "",
};

function Register() {
  const Navigate = useNavigate();


  const HandleSubmit = async (
    values,
    { setSubmitting, resetForm,  }
  ) => {
    try {
      const Data = {
        firstName: values.Fname,
        lastName: values.Lname,
        email: values.email.toLowerCase(),
        password: values.password,
        isBlock:false,
        role:"user",
      };

    
       await api.post("/auth/register", Data);
 
       toast.success("You're all set! Registration successful.", {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          className: "premium-toast",
        });
      resetForm();
      Navigate("/login");
    } catch (error) {
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER FORM SECTION */}

      <div className=" font-sarif flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-25 text-center text-2xl font-light tracking-wider text-dark">
            Sign up
          </h2>
          <p className="mt-5 text-center text-sm font-light tracking-wider text-dark">
            Please fill in the information below:
          </p>
        </div>

        {/* FORM SECTION */}

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialvalue}
            validationSchema={RegValidation}
            className="space-y-6"
            onSubmit={HandleSubmit}
          >
            {({ errors, isSubmitting, status }) => (
              <Form method="POST" className="space-y-6">
                <div>
                  <div className="mt-2">
                    <Field
                      placeholder="First Name"
                      id="Firstname"
                      name="Fname"
                      type="text"
                      autoComplete="Fname"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />

                    {errors.Fname && <small>{errors.Fname}</small>}
                  </div>
                </div>
                <div>
                  <div className="mt-6">
                    <Field
                      placeholder="Last Name"
                      id="Lastname"
                      name="Lname"
                      type="text"
                      autoComplete="Lname"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />

                    {errors.Lname && <small>{errors.Lname}</small>}
                  </div>
                </div>
                <div>
                  <div className="mt-6">
                    <Field
                      placeholder="E-mail"
                      id="SignUp-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />

                    {errors.email && <small>{errors.email}</small>}
                  </div>
                </div>

                <div>
                  <div className="mt-6">
                    <Field
                      placeholder="Password"
                      id="SignUp-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />

                    {errors.password && <small>{errors.password}</small>}
                  </div>
                </div>

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className=" flex w-full justify-center rounded-sm bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Create account
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-10 text-center tracking-wide text-sm/6 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              href="#"
              className="font-semibold text-black hover:text-black-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
