import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowtimes } from '../../services/cineflex';
import Footer from '../Footer';
import Day from './Day';

export default function Showtimes() {
  const [showtime, setShowtime] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    getShowtimes(movieId).then((res) => {
      console.log(res.data);
      setShowtime(res.data);
    });
  }, []);

  return (
    <>
      <div className="page-title">Selecione o horário</div>
      <div className="day-list">
        {showtime.days
          ? showtime.days.map((value) => (
              <Day
                key={value.id}
                date={value.date}
                weekday={value.weekday}
                showtimes={value.showtimes}
              />
            ))
          : 'aguarde...'}
      </div>
      <Footer showtime={showtime}></Footer>
    </>
  );
}
