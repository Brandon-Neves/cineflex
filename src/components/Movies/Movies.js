import Movie from './Movie';
import { getMovies } from '../../services/cineflex';
import { useState, useEffect } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((res) => setMovies(res.data));
  }, []);

  return (
    <>
      <div className="page-title">Selecione o filme</div>
      <div className="movie-list">
        {movies.map((m) => (
          <Movie key={m.id} movie={m} />
        ))}
      </div>
    </>
  );
}
