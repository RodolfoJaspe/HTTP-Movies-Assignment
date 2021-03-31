import React,{useState} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

function NewMovieForm () {
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        stars: []
    })

    const[newStar, setNewStar]  = useState("")

    const updateNewStar = e => {
        console.log(e.target.value)
        setNewStar(e.target.value)
        console.log(newStar)
    }

    const addStar = (e) => {
        e.preventDefault();
        setMovie({...movie, stars: [...movie.stars, newStar]
        })
        setNewStar("")
        console.log(movie.stars);
    }

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const history = useHistory();

    const addMovie = e => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/movies", movie)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        history.push("/")
    }

    return (
        <div>
            <form onSubmit={addMovie}>
                <input name="id" type="number" placeholder="id" value={movie.id} onChange={handleChange} /><br />
                <input name="title" placeholder="title" value={movie.title} onChange={handleChange} /><br />
                <input name="director" placeholder="director" value={movie.director} onChange={handleChange} /><br />
                <input name="metascore" placeholder="metascore" type="number" value={movie.metascore} onChange={handleChange} /><br />
                {movie.stars.map(star => 
                <input value={star} onChange = {e =>{}} />
                )}<br /><br />
                <input onChange={updateNewStar} value={newStar} placeholder="Add new star"/><button onClick={addStar}>Add Star</button><br />
           
                <button>Add Movie</button>
            </form>
            
        </div>
    )
}

export default NewMovieForm