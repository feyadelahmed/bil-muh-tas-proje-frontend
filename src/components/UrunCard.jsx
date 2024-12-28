import {
  Badge,
  Card,
  Center,
  Group,
  Image,
  Text,
} from '@mantine/core';
import classes from './UrunCard.module.css';
import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { ReactContext } from '../context/reactContext';
import Button from './Button';


export default function({urun}) {
  const ctx = useContext(ReactContext);
  const loggedInUser = ctx.kullaniciadi == urun.kullanici.kullaniciadi;
  const navigate = useNavigate();
  
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Link to={`/urun/${urun.id}`}>
        <Card.Section>
          <Image src={urun.resim} height={180} />
        </Card.Section>

        <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          {urun.kategori}
        </Badge>
      </Link>

      <Link className={classes.ad} to={`/urun/${urun.id}`}>
        {urun.ad}
      </Link>

      <Link className={classes.kullaniciadi} to={loggedInUser ? '/profil' : `/profil/@/${urun.kullanici.kullaniciadi}`} >
        @{urun.kullanici.kullaniciadi}
      </Link>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {urun.aciklama}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Text fz="sm" inline>
            {urun.fiyat} TL
          </Text>
        </Center>
      </Group>

      <Group justify="space-between" className={classes.footer}>
        <Button label="Güncelle" onClick={() => navigate(`/urun/${urun.id}/guncelle`)}/>
      </Group>
    </Card>
  );
}