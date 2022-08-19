import React, { useContext } from "react";
import { PostContext } from "../providers/CategoryContext";
import Posts from './Posts';
const Home = (props) => {
  const posts = useContext(PostContext);
  const { loading } = props;

  return (
    <Posts loading={loading} posts={posts} />
  );
};
export default Home;