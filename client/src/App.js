import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import MovieForm from './Movies/MovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  }, [])



  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={(props) => {
        return <MovieList
          {...props}
          movieList={movieList}
        />
      }} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} setMovieList={setMovieList} />;
        }}
      />
      <Route
        path="/updateform/:id"
        render={props => {
          return <MovieForm {...props} movieList={movieList} setMovieList={setMovieList} />;
        }}
      />

    </>
  );
}

export default App;
