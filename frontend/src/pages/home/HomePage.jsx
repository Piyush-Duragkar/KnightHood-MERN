import React from "react";
import Navbar from "../../components/Navbar";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* The paddingTop ensures content starts below the fixed Navbar */}
      <div
        style={{ paddingTop: "70px" }}
        className="flex-[4_4_0] mr-auto border-r border-black min-h-screen px-4"
      >
        {/* Create Post */}
        <CreatePost />

        {/* Posts */}
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
