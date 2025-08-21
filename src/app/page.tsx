"use client";

import Loader from "@/components/ui/Loader";
import useInputChangeHandler from "@/hooks/useInputChangeHandler";
import { useAuthStore } from "@/store/useAuthStore";
import { useSwitchStore } from "@/store/useSwitchStore";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

const Page = () => {
  const router = useRouter()
  const [loginDetails, handleChange] = useInputChangeHandler({
    email: "",
    password: "",
  });
  const [registerDetails, handleRegisterChange] = useInputChangeHandler({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    console.log("Register:", registerDetails);
    console.log("Login Payload:", loginDetails);
  }, [registerDetails, loginDetails]);
  const { loginLoading, registerLoading, loginUser, registerUser, user, userToken } =
    useAuthStore(
      useShallow((s: any) => ({
        loginLoading: s.loginLoading,
        registerLoading: s.registerLoading,
        loginUser: s.loginUser,
        registerUser: s.registerUser,
        user: s.user,
        userToken: s.userToken
      }))
    );
  useEffect(() => {
    console.log("User:", user, "User Token:", userToken)
    if (userToken && user) {
      
      router.push("/home");
    } else {
      
      router.push("/");
    }
  }, );
  
  const { isLogin, authSwitch } = useSwitchStore(
    useShallow((s) => ({
      isLogin: s.isLogin,
      authSwitch: s.authSwitch,
    }))
  );

  return (
    <div className="w-full flex justify-center items-center  bg-[#eee] h-screen ">
      <div className="w-full flex justify-center ">
        <div className="form flex justify-center lg:w-9/12 w-11/12 h-[700px] bg-white  rounded-2xl shadow-xl overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence>
              {isLogin ? (
                <motion.div
                  key="login-view"
                  className="absolute inset-0 flex w-full h-full"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* LEFT PANEL */}
                  <motion.div
                    initial={{ opacity: 0.3, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="hidden w-1/2 lg:flex justify-center items-center bg-black h-full text-white"
                  >
                    <div className="flex flex-col justify-center items-center gap-5">
                      <h1 className="text-[45px] font-bold">Welcome Back</h1>
                      <p className="font-semibold text-center">
                        Enter your details and start your journey with <br />{" "}
                        products that suit you.
                      </p>
                      <button
                        type="button"
                        onClick={authSwitch}
                        className="cursor-pointer flex justify-center items-center h-[40px] text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                       {loginLoading ? (<Loader />) : "Log In"}
                      </button>
                    </div>
                  </motion.div>

                  {/* RIGHT PANEL */}
                  <motion.div
                    initial={{ opacity: 0.3, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="w-full lg:w-1/2 flex justify-center items-center h-full text-black"
                  >
                    <div className="w-full flex flex-col justify-center items-center gap-5">
                      <h1 className="text-[45px] font-bold">Sign Up</h1>
                      <form className="w-full" action="">
                        <div className="w-full flex flex-col gap-3 justify-center text-[#111] text-xl font-medium items-center">
                          <input
                            placeholder="Name"
                            name="name"
                            onChange={handleRegisterChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="text"
                          />
                          <input
                            placeholder="Email"
                            name="email"
                            onChange={handleRegisterChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="text"
                          />
                          <input
                            placeholder="Password"
                            name="password"
                            onChange={handleRegisterChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="text"
                          />
                          <input
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleRegisterChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="password"
                          />
                        </div>
                      </form>
                      <div className="w-[80%]">
                        <button
                          onClick={() => authSwitch()}
                          className="cursor-pointer w-full flex justify-end text-right"
                        >
                          Already Have An Account?
                        </button>
                      </div>
                      {/* <Link
                        href="/home"
                        className="cursor-pointer text-center bg-black text-white text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                        Sign Up
                      </Link> */}
                      <button
                        onClick={() => {
                          registerUser(registerDetails);
                        }}
                        className="cursor-pointer flex justify-center items-center h-[40px] text-center bg-black text-white text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                        {registerLoading ? <Loader /> : "Sign Up"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup-view"
                  className="absolute inset-0 flex w-full h-full"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* LEFT PANEL */}
                  <motion.div
                    initial={{ opacity: 0.3, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="w-full lg:w-1/2 flex justify-center items-center h-full text-black"
                  >
                    <div className="w-full flex flex-col justify-center items-center gap-5">
                      <h1 className="text-[45px] font-bold">Log In</h1>
                      <form className="w-full" action="">
                        <div className="w-full flex flex-col gap-3 justify-center text-[#111] text-xl font-medium items-center">
                          <input
                            placeholder="Name"
                            name="email"
                            onChange={handleChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="text"
                          />
                          <input
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            className="bg-[#dee] w-8/10 h-12 p-4"
                            type="password"
                          />
                        </div>
                      </form>
                      <div className="w-[80%]">
                        <button
                          onClick={() => authSwitch()}
                          className="cursor-pointer w-full flex justify-end text-right"
                        >
                          Don&apos;t have an Account?
                        </button>
                      </div>
                      {/* <Link
                        href="/home"
                        className="cursor-pointer text-center bg-black text-white text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                        Log In
                      </Link> */}
                      <button
                        onClick={() => {
                          loginUser(loginDetails);
                        }}
                        className="cursor-pointer text-center flex justify-center items-center h-[40px] bg-black text-white text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                      {loginLoading ? (<Loader />) : "Log In"}
                      </button>
                    </div>
                  </motion.div>

                  {/* RIGHT PANEL */}
                  <motion.div
                    initial={{ opacity: 0.3, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="hidden lg:w-1/2 w-full lg:flex justify-center items-center bg-black h-full text-white"
                  >
                    <div className="flex flex-col justify-center items-center gap-5">
                      <h1 className="text-[45px] font-bold">Welcome Back</h1>
                      <p className="font-semibold text-center">
                        Enter your details and start your journey with <br />{" "}
                        products that suit you.
                      </p>
                      <button
                        type="button"
                        onClick={authSwitch}
                        className="cursor-pointer text-xl font-semibold border rounded-3xl w-[150px] py-1"
                      >
                        Sign Up
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <div className="w-1/2 flex justify-center items-center bg-black h-full text-white">
            <div className="flex flex-col justify-center items-center gap-5">
              <h1 className="text-[45px] font-bold">Hello Friend</h1>
              <p className="font-semibold text-center">
                Enter your details and start your journey with <br /> products
                that suit you.{" "}
              </p>
              <button className=" text-xl font-semibold border rounded-3xl w-[150px] py-1">
                SIGN UP
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
