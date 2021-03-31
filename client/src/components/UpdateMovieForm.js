import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovieForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const {push} = useHistory();
    const { id } = useParams();

    const handleChange = e => {
        e.persist();
        setMovie({...movie, [e.target.name] : e.target.value})
    }

    useEffect (() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const updateMovie = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then((res)=>{
        console.log(res);
        setMovie(res.data);
        props.updateMovieInList(res.data);
        push(`/`);
        })
        .catch(err=>{
        console.log(err);
        })
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={updateMovie}>
                <input name="title" placeholder="title" value={movie.title} onChange={handleChange} /><br />
                <input name="director" placeholder="director" value={movie.director} onChange={handleChange} /><br />
                <input name="metascore" placeholder="metascore" value={movie.metascore} onChange={handleChange} /><br />
                <input name="stars" placeholder="stars" value={movie.stars} onChange={handleChange} /><br />
                <button>Update</button>
                
            </form>
        </div>

    )
}

export default UpdateMovieForm;