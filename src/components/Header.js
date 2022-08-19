import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import Category from "./data/category";
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div className="header-bg">
      <h1 onClick={() => navigate("/")} className="mb-3">News</h1>
      <div className="btns ">
        {Category.map((value, i) => {
          return (
            <CategoryButton
              key={i}
              category={value}
              selected={props.selected}
              onPress={() => {
                props.updateCategory(value);
                navigate("/");
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Header;
