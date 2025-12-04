import React, { useState, useEffect, useCallback } from "react";
import { PostItem } from "../components/PostItem";
import axios from "../utils/axios";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handlePostUpdated = async () => {
      try {
        const { data } = await axios.get("/posts/user/me");
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    handlePostUpdated(); 

    window.addEventListener("postUpdated", handlePostUpdated);

    return () => window.removeEventListener("postUpdated", handlePostUpdated);
  }, []);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постів не існує.
      </div>
    );
  }

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map?.((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  );
};
