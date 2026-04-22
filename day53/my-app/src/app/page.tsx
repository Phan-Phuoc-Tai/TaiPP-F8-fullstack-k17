import CreatePost from "./components/post/CreatePost";
import OrderBy from "./components/post/OrderBy";
import PostList from "./components/post/PostList";

export default function HomePage() {
  return (
    <div>
      <CreatePost />
      <OrderBy />
      <PostList />
    </div>
  );
}
