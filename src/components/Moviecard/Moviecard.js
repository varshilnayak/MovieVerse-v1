import React from 'react'
import {img_300, unavailable} from '../../config/config'
import Badge from '@mui/material/Badge';
import "./Moviecard.css";

const Moviecard = (props) => {
  return (
    <div className="body">
      <Badge badgeContent={props.rating} color={props.rating>6?"success":"warning"}></Badge>
      <img className="img" src={props.poster?`${img_300}${props.poster}`:unavailable} alt={props.title} />
      <h5 className="title">{!props.title?props.media_type:props.title}</h5>
      <div className="d-flex justify-content-between">
        <span>{props.media_type==='tv'?"TV Series":"Movie"}</span>
        <span>{props.date}</span>
      </div>
    </div>
  )
}

export default Moviecard