import React, { useEffect, useState } from 'react'
import Moviecard from '../../components/Moviecard/Moviecard';
import Pagination from '@mui/material/Pagination';
import "./Home.css"

function Home() {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  
  const fetchData = async () =>{
    let data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MV_KEY}&page=${page}`);
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
  }, [page])
  
  return (
    <div>
      <h1 className="defTitle">Home Page</h1>
      <div className="home">
          { result && result.map((ele)=>{
            return <Moviecard  
                    key={ele.id}
                    title={ele.title || ele.name} 
                    poster={ele.poster_path} 
                    media_type={ele.media_type} 
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

export default Home
