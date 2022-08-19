import { filter } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../providers/CategoryContext";
import SimilarPosts from "./SimilarPosts";
import clock from "../components/assets/img/Clock.svg";
import user from "../components/assets/img/User.svg";
const NewsDetail = (props) => {
  const posts = useContext(PostContext);
  const params = useParams();
  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const initilize = async () => {
      const cachePosts = await JSON.parse(localStorage.getItem("@posts"));
      const postData = posts.length > 0 ? posts : cachePosts;
      const currentPost = filter(postData, (post) => post.id === params?.id);
      if (currentPost.length > 0) {
        setPost(currentPost[0]);
        setSimilarPosts(handleSimilarPosts(postData));
      } else {
        navigate("/");
      }
    };
    initilize();
  }, [params?.id]);

  const handleSimilarPosts = (data) => {
    if (!data) return [];
    const filtered = filter(data, (post) => post.id !== params?.id);
    if (filtered.length < 4) return filtered;
    const ran = Math.floor(Math.random() * (data.length - 3));
    return filtered.slice(ran, ran + 3);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {post && (
            <div className="col-lg-10 mx-auto" key={post.id}>
              <div className="newsDetail">
                <div className="left-side">
                  <img src={post.imageUrl} alt="" />
                </div>
                <div className="right-side">
                  <h2>{post.title}</h2>
                  <h3>{post.content}</h3>
                </div>
                <div className="itemfooter">
                  <span>
                    <img src={clock} alt="clock" />
                    {post.date}
                  </span>
                  <span>
                    <img src={user} alt="user" />
                    {post.author}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {similarPosts.length > 0 && (
          <div style={{ marginBottom: 60 }}>
            <h3
              style={{ fontWeight: 700, fontSize: "20px", paddingLeft: "7px" }}
            >
              Similar News:
            </h3>
          </div>
        )}
        <SimilarPosts loading={false} posts={similarPosts} />
      </div>
    </>
  );
};

export default NewsDetail;
