import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Movie({ movie }) {
  return (
    <Link to={`/sessoes/${movie.id}`}>
      <StyledMovie>
        <img src={movie.posterURL} />
      </StyledMovie>
    </Link>
  )
}

const StyledMovie = styled.div`
  display: flex;
  background-color: #fff;
  padding: 8px;
  border-radius: 3px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 11px;
  img {
    width: 129px;
    height: 193px;
    object-fit: cover;
  }
`
