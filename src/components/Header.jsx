import { Container, Group } from '@mantine/core';
import classes from './Header.module.css';
import { NavLink, useLocation } from "react-router";
import { useContext } from 'react';
import { ReactContext } from '../context/reactContext';

const loggedOutlinks = [
  { link: '/giris', label: 'Giriş Yap' },
  { link: '/kayit', label: 'Kayıt Ol' },
];

const loggedInlinks = [
  { link: '/profil', label: 'Profil' },
];

export default function() {
  const ctx = useContext(ReactContext);
  const location = useLocation();
  
  function logout(e) {
    e.preventDefault();
    ctx.cikis();
  }

  const items = [];
  
  ctx.token || loggedOutlinks.map((link) => {
    items.push(
      <NavLink
        key={link.label}
        to={link.link}
        className={classes.link}
        data-active={location.pathname == link.link || undefined}
      >
        {link.label}
      </NavLink>
    );
  });

  ctx.token && loggedInlinks.map((link) => {
    items.push(
      <NavLink
        key={link.label}
        to={link.link}
        className={classes.link}
        data-active={location.pathname == link.link || undefined}
      >
        {link.label}
      </NavLink>
    );
  });

  ctx.token && items.push(<NavLink key={"cikis"} className={classes.link} onClick={logout}>Çıkış Yap</NavLink>);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <NavLink className={`${classes.link} ${classes.logo}`} to="/"><h1>EskiYeni</h1></NavLink>
        <Group gap={5}>
          {items}
        </Group>
      </Container>
    </header>
  );
}