import React from 'react'
import { useEffect, useState } from 'react'
import Moviecard from '../../components/Moviecard/Moviecard';
import Pagination from '@mui/material/Pagination';
import Genres from "../../components/Genres/Genres";
import './Movies.css'

function Movies() {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const getURL = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    const genre = selectedGenres.map((g) => g.id);
    return genre.reduce((acc, curr) => acc + "," + curr);
  };
  const genreURL = getURL(selectedGenres);
  
  const fetchData = async () =>{
    let data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MV_KEY}&page=${page}&with_genres=${genreURL}`);
    let parsedData = await data.json();
    setResult(parsedData.results);
    setTotalPages(parsedData.total_pages);
  } 

  const changePage = (page) =>{
    setPage(page);
    window.scroll(0,0);
  }
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page,genreURL])

  return (
    <div>
      <h1 className="defTitle">Movies</h1>
      <Genres
        media_type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
          { result && result.map((ele)=>{
            return <Moviecard  
                    key={ele.id}
                    title={ele.title || ele.name} 
                    poster={ele.poster_path} 
                    media_type='movie'
                    date={ele.release_date || ele.first_air_date}
                    rating={ele.vote_average}
                   />                    
          })}
      </div>
      <div>
        {totalPages>1 && <Pagination count={totalPages} style={{
         display: 'flex',
         justifyContent: 'center',
         marginTop: '15px'
        }}
        onChange={(ele) => changePage(ele.target.textContent)}
        hideNextButton
        hidePrevButton/>
      }
      </div>
    </div>
  )
}

export default Movies
