import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSeats, postBooking } from '../../services/cineflex'
import Footer from '../Footer'
import styled from 'styled-components'
import '../../styles/style.css'

function Seat({ seat, selectSeat }) {
  return (
    <>
      <span
        className={`seat ${seat.isAvailable ? '' : 'unavailable'} ${
          seat.selected ? 'selected' : ''
        }`}
        onClick={() => selectSeat(seat.id)}
      >
        {seat.name}
      </span>
    </>
  )
}

export default function Seats() {
  const [showtime, setShowtime] = useState({})
  const [seats, setSeats] = useState([])
  const [form, setForm] = useState({})
  const { showtimeId } = useParams()
  const navigate = useNavigate()

  function handleForm({ value, name }) {
    console.log(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSeats(value) {
    if (value.isAvailable === false) {
      alert('Esse assento não está disponível')
    } else {
      const isSelected = seats.some(s => value.id === s.id)
      if (isSelected) {
        const newList = seats.filter(s => value.id !== s.id)
        setSeats(newList)
      } else {
        setSeats([...seats, value])
      }
    }
  }
  function sendForm() {
    console.log(form)
    const seatsId = seats.filter(value => value.selected).map(value => value.id)
    const body = {
      ids: seatsId,
      ...form
    }

    navigate('/sucesso', {
      state: {
        showtime,
        form,
        seatsId
      }
    })
    // postBooking(body).then((res) => {
    //   console.log(res.data);
    //   navigate('/sucesso');
    // });
  }

  function selectSeat(seatId) {
    const newSeats = seats.map(value => {
      if (value.id === seatId && value.isAvailable) {
        return {
          ...value,
          selected: !value.selected
        }
      }
      return {
        ...value
      }
    })

    setSeats([...newSeats])
  }

  useEffect(() => {
    getSeats(showtimeId).then(res => {
      console.log(res.data)
      setShowtime(res.data)
      setSeats(res.data.seats)
    })
  }, [])

  return (
    <>
      <PageTitle>Selecione os assentos</PageTitle>
      <div className="seat-list">
        {seats.length !== 0
          ? seats.map(value => (
              <Seat
                key={value.id}
                seat={value}
                selectSeat={selectSeat}
                handleSeats={handleSeats}
                isSelected={seats.some(s => value.id === s.id)}
              />
            ))
          : 'carregando...'}
      </div>
      <Form>
        <InputGroup>
          <Title>Nome</Title>
          <input
            placeholder="Nome"
            name="name"
            onChange={e =>
              handleForm({
                name: e.target.name,
                value: e.target.value
              })
            }
          ></input>
        </InputGroup>
        <InputGroup>
          <Title>CPF</Title>
          <input
            placeholder="CPF"
            name="cpf"
            onChange={e =>
              handleForm({
                name: e.target.name,
                value: e.target.value
              })
            }
          ></input>
        </InputGroup>
      </Form>
      <BookSeat onClick={sendForm}>Reservar</BookSeat>
      {showtime.movie ? (
        <Footer
          showtime={showtime.movie}
          name={showtime.name}
          weekday={showtime.day.weekday}
        />
      ) : (
        ''
      )}
    </>
  )
}

const PageTitle = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  margin-bottom: 10px;
  padding-bottom: 24px;
`
const SeatList = styled.div`
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  width: 320px;
  margin: -20px auto 0;
`
const StyledSeat = styled.div`
  width: 22px;
  height: 22px;
  border: 1px solid #808f9d;
  background-color: #c3cfd9;
  border-radius: 50%;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  margin-bottom: 18px;
  cursor: pointer;
`
const Form = styled.div`
  margin-top: 31px;
  padding: 0 24px;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border-radius: 3px;
    padding: 18px;
    border: 1px solid #d4d4d4;
    height: 51px;
    font-size: 18px;
    margin-top: 6px;
  }
  input::placeholder {
    color: #afafaf;
    font-style: italic;
    font-size: 18px;
  }
`
const Title = styled.div`
  font-size: 18px;
  color: #293845;
  margin-top: 10px;
`
const BookSeat = styled.button`
  width: 225px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #e8833a;
  font-size: 18px;
  border: none;
  border-radius: 3px;
  margin: 57px auto 160px auto;
`
