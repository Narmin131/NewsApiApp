import React from "react";
import { Link } from "react-router-dom";
import clock from "../components/assets/img/Clock.svg";
import user from "../components/assets/img/User.svg";
const SimilarPost = ({ data }) => {
  const { imageUrl, title, author, date, id } = data;

  return (
    <Link className="col-lg-4 p-2" to={`/detail/${id}`}>
      <div className="newsItemPost" style={{backgroundImage: `url(${imageUrl})`}}>
        <div className="itemBody">
          <p className="title">{title}</p>
          <div className="itemfooter">
            <span>
              <img src={clock} alt="clock" />
              {date}
            </span>
            <span>
              <img src={user} alt="user" />
              {author}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimilarPost;
