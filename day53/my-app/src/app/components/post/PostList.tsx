"use client";
import { use } from "react";
import { AppContext } from "../AppProvider";
import Post from "./Post";

export default function PostList() {
  const { posts } = use(AppContext);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <Post title={post.title} body={post.body} id={post.id} />
        </div>
      ))}
    </>
  );
}
