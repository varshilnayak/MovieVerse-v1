import React, { useEffect, useState } from 'react'
import Moviecard from '../../components/Moviecard/Moviecard';
import { useLocation } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

function Search() {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const location = useLocation();

  const fetchData = async () =>{
    let data = await fetch(`https://api.themoviedb.org/3/search/multi?&api_key=${process.env.REACT_APP_MV_KEY}&page=${page}&query=${location.state.text}`);
    let parsedData = await data.json();
    // console.log(parsedData)
    setResult(parsedData.results.filter((ele)=>( ele.media_type==='tv' || ele.media_type==='movie')));
    setTotalPages(parsedData.total_pages);
  } 

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location,page])
  
  const changePage = (p) =>{
    setPage(p);
    window.scroll(0,0);
  }

  return (
    <div>
      <h1 className="defTitle">Search Results</h1>
      <div className='series'>
        {result.length !== 0 ? (
          result.map((ele) => (
              <Moviecard  
                key={ele.id}
                title={ele.title || ele.name} 
                poster={ele.poster_path} 
                media_type={ele.media_type}
                date={ele.release_date || ele.first_air_date}
                rating={ele.vote_average}
              />    
          ))
        ) : (
          <span>No result found</span>
        )}
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

export default Search
