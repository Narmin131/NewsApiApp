import { truncate } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import clock from "../components/assets/img/Clock.svg";
import user from "../components/assets/img/User.svg";
const NewsItem = ({ data }) => {
  const { imageUrl, title, author, content, date, id } = data;

  return (
    <Link className="col-lg-4 p-2" to={`/detail/${id}`}>
      <div className="newsItem">
        <img src={imageUrl} alt="newsPhoto" />
        <div className="itemBody">
          <p className="title">{title}</p>
          <p className="content">
            {truncate(content, {
              length: 100,
            })}
          </p>
          <div className="line"></div>
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

export default NewsItem;
