import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router';
import classes from './Layout.module.css';

export default function() {
  return (
    <Container className={classes.cont}>
      <Header />
      <Outlet />
    </Container>
  );
}