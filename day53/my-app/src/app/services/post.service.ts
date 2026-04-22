import { FormPostData, Post } from "../types/post.type";
import { axiosInstance } from "../utils/axios";

export const postService = {
  async getAll(): Promise<Post[]> {
    const response = await axiosInstance.get(`/posts`);
    const data = await response.data;
    return data.posts;
  },
  async getSingle(id: number): Promise<Post> {
    const response = await axiosInstance.get(`/posts/${id}`);
    const data = await response.data;
    return data;
  },
  async createPost(postdata: FormPostData): Promise<Post> {
    const response = await axiosInstance.post(`/posts/add`, {
      ...postdata,
      userId: 5,
    });
    const data = await response.data;
    return data;
  },
  async update(postdata: FormPostData, id: number): Promise<Post> {
    const response = await axiosInstance.put(`/posts/${id}`, {
      ...postdata,
    });
    const data = await response.data;
    return data;
  },
  async delete(id: number): Promise<Post> {
    const response = await axiosInstance.delete(`/posts/${id}`);
    const data = await response.data;
    return data;
  },
};
