import { map } from 'lodash';
import React from "react";
import NewsItem from "./NewsItem";
import SpinnerLoad from "./SpinnerLoad";
const Posts = (props) => {
  const { loading, posts } = props;
  return (
    <div className="news">
      <div className="container">
        <div className="row">
          {
            loading
              ? <SpinnerLoad />
              :
              map(posts, (data, index) => {
                return (
                  <NewsItem
                    imageUrl={data.imageUrl}
                    author={data.author}
                    title={data.title}
                    content={data.content}
                    date={data.date}
                    data={data}
                    key={index}
                  />
                );
              })
          }
        </div>
      </div>
    </div>
  );
};
export default Posts;