import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSeats, postBooking } from '../../services/cineflex';
import Footer from '../Footer';

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
  );
}

export default function Seats() {
  const [showtime, setShowtime] = useState({});
  const [seats, setSeats] = useState([]);
  const [form, setForm] = useState({});
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  function handleForm({ value, name }) {
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  }
  function sendForm() {
    console.log(form);
    const seatsId = seats
      .filter((value) => value.selected)
      .map((value) => value.id);
    const body = {
      ids: seatsId,
      ...form,
    };

    navigate('/sucesso', {
      state: {
        showtime,
        form,
        seatsId,
      },
    });
    // postBooking(body).then((res) => {
    //   console.log(res.data);
    //   navigate('/sucesso');
    // });
  }

  function selectSeat(seatId) {
    const newSeats = seats.map((value) => {
      if (value.id === seatId && value.isAvailable) {
        return {
          ...value,
          selected: !value.selected,
        };
      }
      return {
        ...value,
      };
    });

    setSeats([...newSeats]);
  }

  useEffect(() => {
    getSeats(showtimeId).then((res) => {
      console.log(res.data);
      setShowtime(res.data);
      setSeats(res.data.seats);
    });
  }, []);

  return (
    <>
      <div className="page-seats">
        <div className="page-title">Selecione os assentos</div>
        <div className="seat-list">
          {seats.length !== 0
            ? seats.map((value) => (
                <Seat key={value.id} seat={value} selectSeat={selectSeat} />
              ))
            : 'carregando...'}
        </div>
      </div>
      <div className="form">
        <div className="input-group">
          <div className="title">Nome</div>
          <input
            placeholder="Nome"
            name="name"
            onChange={(e) =>
              handleForm({
                name: e.target.name,
                value: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="input-group">
          <div className="title">CPF</div>
          <input
            placeholder="CPF"
            name="cpf"
            onChange={(e) =>
              handleForm({
                name: e.target.name,
                value: e.target.value,
              })
            }
          ></input>
        </div>
      </div>
      <button className="book-seats" onClick={sendForm}>
        Reservar
      </button>
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
  );
}
