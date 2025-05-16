import { Link } from "react-router-dom";
import { useState } from "react";

import AethelgardSvg from "../../../components/svgs/Aethelgard";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        // toast.error(error.message);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <AethelgardSvg helgardSvg className=" lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-4xl mb-4 font-extrabold text-white whitespace-nowrap">
            Welcome to the Lost World of Gamers
          </h1>
        </div>
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <AethelgardSvg helgardSvg className="w-24 lg:hidden fill-white" />
          <div className="flex flex-col gap-4 w-full">
            {/* Email Field */}
            <label className="input input-bordered rounded flex items-center gap-2 w-full">
              <MdOutlineMail />
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </label>

            {/* Username Field */}
            <label className="input input-bordered rounded flex items-center gap-2 w-full">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>

            {/* Password Field */}
            <label className="input input-bordered rounded flex items-center gap-2 w-full">
              <MdPassword />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </label>
          </div>
          {/* <button className="btn rounded-full btn-secondary text-white">
            Sign up
          </button> */}
          <button
            className="
    btn
    rounded-full
    btn-primary
    text-white
    btn-outline
    w-full
    shadow-[0_0_40px_4px_rgba(72,135,202,0.40)]
    border-none
    hover:bg-[rgb(22,22,22)]
  "
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button
              className="
    btn
    rounded-full
    btn-primary
    text-white
    btn-outline
    w-full
    shadow-[0_0_40px_4px_rgba(72,135,202,0.40)]
    border-none
     hover:bg-[rgb(22,22,22)]
  "
            >
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
