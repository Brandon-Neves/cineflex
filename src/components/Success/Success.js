import { useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();

  return (
    <>
      <span>
        Nome: {location.state.form.name} - CPF:{location.state.form.cpf}
      </span>
      {location.state.seatsId.map((value) => (
        <span>Assento: {value}</span>
      ))}
    </>
  );
}
