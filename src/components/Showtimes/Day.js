import { Link } from 'react-router-dom';
export default function Day({ date, weekday, showtimes }) {
  return (
    <>
      <div className="day">
        <div className="title">
          <span>
            {weekday} - {date}
          </span>
        </div>
        <div className="showtime-list">
          {showtimes.map((value) => (
            <Link to={`/assentos/${value.id}`}>
              <span className="showtime">{value.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
