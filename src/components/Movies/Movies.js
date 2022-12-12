import Movie from './Movie'
import { getMovies } from '../../services/cineflex'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies().then(res => setMovies(res.data))
  }, [])

  return (
    <>
      <PageTitle>Selecione o filme</PageTitle>
      <MovieList>
        {movies.map(m => (
          <Movie key={m.id} movie={m} />
        ))}
      </MovieList>
    </>
  )
}

const PageTitle = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
`

const MovieList = styled.div`
  display: flex;
  gap: 20px 40px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  cursor: pointer;
`
