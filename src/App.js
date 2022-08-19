import axios from 'axios';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import Category from './components/data/category';
import Header from './components/Header';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import { BASE_URL } from './constants';
import { PostContext } from './providers/CategoryContext';
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 50000;
axios.defaults.timeoutErrorMessage =
  "Request timeout, Please check your connection and try again";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('@selected') || Category[0]);
  const [prevCategory, setPrevCategory] = useState("");
  const [error, setError] = useState(false);


  useEffect(() => {
    if (!error) {
      setLoading(true)
      fetchPosts()
    }
  }, [selectedCategory]);

  const fetchPosts = async () => {
    const url = `news?category=${selectedCategory}`
    await axios.get(url).then(({ data }) => {
      const updatedData = [];
      map(data?.data, d => {
        updatedData.push({
          ...d,
          id: uuidv4()
        })
      })
      setPosts(updatedData)
      localStorage.setItem('@posts', JSON.stringify(updatedData))
      setLoading(false)
      setPrevCategory(selectedCategory)
      setError(false)
    }).catch(error => {
      console.log(error)
      alert(error.message)
      setSelectedCategory(prevCategory)
      setLoading(false)
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <BrowserRouter>
      <PostContext.Provider value={posts}>
        <Header
          selected={selectedCategory}
          updateCategory={(value) => {
            localStorage.setItem('@selected', value)
            setError(false)
            setSelectedCategory(value)
          }}
        />
        <Routes>
          <Route path='/' element={<Home
            loading={loading}
          />}></Route>
          <Route path='/detail/:id' element={<NewsDetail loading={loading} />}></Route>
        </Routes>
      </PostContext.Provider>
    </BrowserRouter>
  )
}

export default App
