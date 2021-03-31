import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovieForm from "./components/UpdateMovieForm";
import NewMovieForm from "./Movies/NewMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovieInList = movie => {
      let movieInList = movieList.find(movieInList => movieInList.id == movie.id)
      movieInList.metascore = movie.metascore;
      movieInList.title = movie.title;
      movieInList.director = movie.director;
      movieInList.stars = movie.stars;
      
      setMovieList([...movieList])
  }

  const deleteMovie = (id) => {
    setMovieList(movieList.filter(movie=>(movie.id !== Number(id))));
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <Link to="/add-movie">Add Movie</Link>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>
      </Route>
      <Route path="/movies/:id/update" 
      render= {props => <UpdateMovieForm {...props} updateMovieInList={updateMovieInList}/>} />
      <Route path="/add-movie" component={NewMovieForm} />
    </>
  );
};

export default App;
