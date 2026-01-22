import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { LoginValidation } from "./Login-Validation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Api/Axios";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

const initialValues2 = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const {setUser} = useContext(CartContext)
  const {Login}= useContext(AuthContext)

  const HandleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const loginData = {
        Email: values.email.toLowerCase(),
        Password: values.password,
      };

      const userData = await api.get("/users");

      const isExist = userData.data.find(
        (data) =>
          data.Email === loginData.Email && data.password === loginData.Password
      );
      // console.log("afafa", userData)
      // fetchCart(userData?.id)
      if (isExist) {
  
        // localStorage.setItem("loginData", JSON.stringify(isExist));
        if(isExist.role ==="admin"){
          navigate("/dashboard")
          Login(isExist)
                 toast.success(`You're in! Welcome ${isExist.name} `, {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "premium-toast",
  });
        }else {
        if(isExist.isBlock===true){
                    toast.warning(`${isExist.FirstName} ${isExist.LastName} Your Account is Blocked`, {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "premium-toast",
  });
          return
        }else{Login(isExist)
        resetForm();
       navigate("/")
      
              toast.success(`You're in! Welcome ${isExist.FirstName} ${isExist.LastName}`, {
    position: "top-right",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "premium-toast",
  });
      }
    }
      } else {
         
        toast.error("Account not found. Please register first.");
      }
      
    } catch {
      toast.error("Something went wrong. Try again..");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Login Section */}

      <div className=" font-sarif flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-25 text-center text-2xl font-light tracking-wider text-dark">
            Login
          </h2>
          <p className="mt-5 text-center text-sm font-light tracking-wider text-dark">
            Enter your email and password to login:
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            validationSchema={LoginValidation}
            initialValues={initialValues2}
            onSubmit={HandleLogin}
          >
            {({ errors, isSubmitting }) => (
              <Form action="#" method="POST" className="space-y-6">
                <div>
                  <div className="mt-2">
                    <Field
                      placeholder="E-mail"
                      id="Login-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />
                  </div>
                  {errors.email && <small>{errors.email}</small>}
                </div>

                <div>
                  <div className="mt-2">
                    <Field
                      placeholder="Password"
                      id="Login-password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full  bg-white/5 px-4 py-2 text-base text-black outline-1 -outline-offset-1 outline-black placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black-500 sm:text-sm/6"
                    />
                  </div>
                  {errors.password && <small>{errors.password}</small>}
                </div>

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex w-full justify-center rounded-sm bg-black px-3 py-1.5 text-sm/6 font-semibold text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-10 text-center tracking-wide text-sm/6 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              href="#"
              className="font-semibold text-black hover:text-black-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
