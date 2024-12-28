import { useContext, useEffect, useState } from 'react';
import { ReactContext } from '../context/reactContext';
import { useNavigate, useParams } from 'react-router';
import Alert from '../components/Alert';
import classes from './UrunGosterPage.module.css';
import ButtonComp from '../components/Button';
import { Row, Col } from 'react-bootstrap';
import { Button, Avatar, Group, Image, List, Text, ThemeIcon, Title } from '@mantine/core';
import Yorumlar from '../components/Yorumlar';

export default function() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();
  const params = useParams();

  const [urun, setUrun] = useState({});
  
  const [error, setError] = useState(false);
  
  const [random, setRandom] = useState(0);
  const [beklemekte, setBeklemekte] = useState(true);

  function onYorum() {
    setRandom(Math.random());
  }

  useEffect(() => {
    (async function() {
      setBeklemekte(true);
      setError(false);
      const response = await ctx.urunGetir(params.urunId);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setUrun(response.urun);
      }
      setBeklemekte(false);
    })();
  }, [random, params.urunId])

  let component;
  if (beklemekte) {
    component = <Alert level="info" msg='yükleniyor ...'/>;
  } else if (error) {
    component = <Alert level="error" msg={error}/>;
  } else {
    component = (
      <div className={classes.outer}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}> {urun.ad} </Title>
            <Text c="dimmed" mt="md">
              {urun.aciklama}
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
            >
              <List.Item><b>{urun.gorunum}</b> kez görüntülendi</List.Item>
              <List.Item> yer: <b>{urun.ilce}, {urun.il}</b> </List.Item>
              <List.Item> Kategori: <b>{urun.kategori}</b> </List.Item>
              <List.Item> Marka: <b>{urun.marka}</b> </List.Item>
              <List.Item> Durum: <b>{urun.durum}</b> </List.Item>
              {urun.renk && <List.Item> Renk: <b>{urun.renk}</b> </List.Item>}
              {urun.materyal && <List.Item> Materyal: <b>{urun.materyal}</b> </List.Item>}
            </List>

            <Group mt={30}>
              <Title className={classes.title}> {urun.fiyat} TL </Title>
            </Group>

            <Group mt={30}>
              {
                (urun.kullanici.kullaniciadi === ctx.kullaniciadi)
                ? <Button radius="xl" size="md" className={classes.control} onClick={() => navigate(`/urun/${urun.id}/guncelle`)}>
                    Güncelle
                  </Button>
                : <Button radius="xl" size="md" className={classes.control}>
                    Satın Al
                  </Button>
              }
            </Group>
          </div>
          <Image src={urun.resim} className={classes.image} />
        </div>
        <Yorumlar yorumlar={urun.yorumlar} urun={urun} onYorum={onYorum}/>
      </div>
    );
  }

  return (
    <>
      {component}
    </>
  );
}