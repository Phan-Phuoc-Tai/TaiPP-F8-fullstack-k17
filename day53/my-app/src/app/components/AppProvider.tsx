"use client";
import { createContext, useEffect, useState } from "react";
import { Post } from "../types/post.type";
import { postService } from "../services/post.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { POST } from "../constants/post.constant";
type AppContext = {
  posts: Post[];
  addPost: (postNew: Post) => void;
  editPost: (postUpdate: Post) => void;
  deletePost: (postDelete: Post) => void;
};
export const AppContext = createContext({} as AppContext);
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  //Chuyển AppProvider sang client
  //Bị lỗi khi gọi postService nên phải sử dụng useEffect và state để truyền posts xuống các component con
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await postService.getAll();
        setPosts(posts);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(POST.fetchPostError.getAll);
        }
      }
    };
    fetchPosts();
  }, []);
  //Thêm post mới
  const addPost = (postNew: Post) => {
    setPosts((posts) => [postNew, ...posts]);
  };
  //Chỉnh sửa post
  const editPost = (postUpdate: Post) => {
    setPosts((posts) => {
      const index = posts.findIndex((post) => post.id === postUpdate.id);
      posts[index] = postUpdate;
      return [...posts];
    });
  };
  //Xoá post
  const deletePost = (postDelete: Post) => {
    setPosts((posts) => {
      return posts.filter((post) => post.id !== postDelete.id);
    });
  };
  return (
    <AppContext.Provider
      value={{
        posts,
        addPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
