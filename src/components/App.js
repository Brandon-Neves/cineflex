import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Movies from './Movies/Movies';
import Showtimes from './Showtimes/Showtimes';
import Seats from './Seats/Seats';
import Success from './Success/Success';
import GlobalStyle from '../styles/globalStyles';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/sessoes/:movieId" element={<Showtimes />} />
            <Route path="/assentos/:showtimeId" element={<Seats />} />
            <Route path="/sucesso" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 67px;
`;
