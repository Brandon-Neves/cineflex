import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Success() {
  const location = useLocation()
  console.log(location.state)

  return (
    <>
      <PageTitle>Pedido feito com sucesso!</PageTitle>
      <Container>
        <Box>
          <h3>Filme e Sessão</h3>
          <p>{location.state.showtime.movie.title}</p>
          <span>{location.state.showtime.day.date}</span>
          <span>{location.state.showtime.name}</span>
        </Box>
        <Box>
          <h3>Ingressos</h3>
          {location.state.seatsId.map(value => (
            <p>Assento: {value}</p>
          ))}
        </Box>
        <Box>
          <h3>Comprador</h3>
          <p>Nome: {location.state.form.name}</p>
          <p>CPF:{location.state.form.cpf}</p>
        </Box>
      </Container>

      <Link to={`/`}>
        <BackHome>Voltar pra home</BackHome>
      </Link>
    </>
  )
}

const Container = styled.div`
  margin-left: 30px;
`

const Box = styled.div`
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
  margin: 120px auto 200px auto;
`

const PageTitle = styled.div`
  margin-top: 120px;
  font-size: 27px;
  color: #247a6b;
  height: 110px;
  text-align: center;
`
