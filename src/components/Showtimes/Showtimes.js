import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getShowtimes } from '../../services/cineflex'
import Footer from '../Footer'
import Day from './Day'
import styled from 'styled-components'

export default function Showtimes() {
  const [showtime, setShowtime] = useState({})
  const { movieId } = useParams()

  useEffect(() => {
    getShowtimes(movieId).then(res => {
      console.log(res.data)
      setShowtime(res.data)
    })
  }, [])

  return (
    <>
      <PageTitle>Selecione o horário</PageTitle>
      <Daylist>
        {showtime.days
          ? showtime.days.map(value => (
              <Day
                key={value.id}
                date={value.date}
                weekday={value.weekday}
                showtimes={value.showtimes}
              />
            ))
          : 'aguarde...'}
      </Daylist>
      <Footer showtime={showtime}></Footer>
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

const Daylist = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 23px;
  margin-bottom: 135px;
`
