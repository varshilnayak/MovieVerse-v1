import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"
const Navbar = () => {
  const [text, setText] = useState('');
    
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" onClick={()=> window.scroll(0,0)} to="/"><span style={{color: 'white'}}>MovieVerse</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/movies" onClick={()=> window.scroll(0,0)}><span style={{color: 'white'}}>Movies</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/series" onClick={()=> window.scroll(0,0)}><span style={{color: 'white'}}>Series</span></Link>
              </li>
            </ul>
            <div className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search a movie/series" aria-label="Search" onChange={(ele)=>setText(ele.target.value)}/>
              <Link to='/search' state={{text: text}}>
                <button disabled={!text} className="btn btn-outline-success" type="submit">Search</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
