import { Link } from 'react-router-dom'
import styled from 'styled-components'
export default function Day({ date, weekday, showtimes }) {
  return (
    <>
      <StyledDay>
        <span>
          {weekday} - {date}
        </span>
        <ShowtimeList>
          {showtimes.map(value => (
            <Link to={`/assentos/${value.id}`}>
              <span className="showtime">{value.name}</span>
            </Link>
          ))}
        </ShowtimeList>
      </StyledDay>
    </>
  )
}

const StyledDay = styled.div`
  margin: 0 0 22px;
  span {
    font-size: 20px;
    margin: 23px 0 0 22px;
  }
`

const ShowtimeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  span {
    background-color: #e8833a;
    border-radius: 3px;
    width: 83px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 8px;
    cursor: pointer;
  }
`
