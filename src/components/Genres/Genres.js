import React from 'react';
import { Chip } from "@material-ui/core";
import { useEffect } from "react";

const Genres = (props) => {
  const handleAdd = (genre) => {
    props.setSelectedGenres([...props.selectedGenres, genre]);
    props.setGenres(props.genres.filter((g) => g.id !== genre.id));
    props.setPage(1);
  };

  const handleRemove = (genre) => {
    props.setSelectedGenres(
      props.selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    props.setGenres([...props.genres, genre]);
    props.setPage(1);
  };

  const fetchGenres = async () => {
    let data = await fetch(`https://api.themoviedb.org/3/genre/${props.media_type}/list?api_key=${process.env.REACT_APP_MV_KEY}`);
    let parsedData = await data.json();
    props.setGenres(parsedData.genres);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      props.setGenres([]); 
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {props.selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {props.genres!==null && props.genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;