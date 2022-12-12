import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Success() {
  const location = useLocation()
  console.log(location.state)

  return (
    <Cont>
      <PageTitle>Pedido feito com sucesso!</PageTitle>
      <Container>
        <h3>Filme e Sessão</h3>
        <p>{location.state.showtime.movie.title}</p>
        <span>{location.state.showtime.day.date}</span>
        <span>{location.state.showtime.name}</span>
      </Container>
      <Container>
        <h3>Ingressos</h3>
        {location.state.seatsId.map(value => (
          <p>Assento: {value}</p>
        ))}
      </Container>
      <Container>
        <h3>Comprador</h3>
        <p>Nome: {location.state.form.name}</p>
        <p>CPF:{location.state.form.cpf}</p>
      </Container>

      <Link to={`/`}>
        <BackHome>Voltar pra home</BackHome>
      </Link>
    </Cont>
  )
}

const Cont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  margin-bottom: 50px;
  display: block;
  color: #293845;
  h3 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
  }
  p,
  span {
    font-size: 22px;
    font-weight: 400px;
    margin-top: 5px;
  }
  span {
    margin-right: 10px;
  }
`

const BackHome = styled.button`
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
  margin: 0 auto;
`

const PageTitle = styled.h1`
  margin-top: 30px;
  font-size: 27px;
  color: #247a6b;
  height: 110px;
`
