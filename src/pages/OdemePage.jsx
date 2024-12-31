import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context/reactContext";
import TextInput from '../components/TextInput';
import { Row, Col } from 'react-bootstrap';
import classes from './OdemePage.module.css';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { Avatar, Group, Text } from '@mantine/core';

export default function() {
  const ctx = useContext(ReactContext);
  const [url, setUrl] = useState('');
  const urun = ctx.itemToBuy;
  const [no, setNo] = useState('');
  const [mahalle, setMahalle] = useState('');
  const [sokak, setSokak] = useState('');
  const [ilce, setIlce] = useState('');
  const [il, setIl] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState({error: false});
  const [beklemekte, setBeklemekte] = useState(true);

  useEffect(() => {
    (async function() {
      setBeklemekte(true);
      const response = await ctx.odemeUrlGetir(ctx.token, ctx.itemToBuy);
      setUrl(response.url);
      setBeklemekte(false);
    })();
  }, [urun]);


  function ode() {
    if (mahalle && sokak && il && ilce && no && zip) {
      window.location.href=url
    } else {
      setError({error: true, msg:"Tüm Adres Bilgilerinizi Doldurunuz"})
    }
  }

  return (
    <>
      <div className={classes.formCont}>
        <Row>
          <Group wrap="nowrap">
            <Avatar
              src={urun.resim}
              size={94}
              radius="md"
            />
            <div>
              <Text fz="xs" fw={700} c="dimmed">
                @{urun.kullaniciAdi}
              </Text>

              <Text fz="lg" fw={500} className={classes.name}>
                {urun.ad}
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <Text fz="xs" c="dimmed">
                  {urun.fiyat} TL
                </Text>
              </Group>
            </div>
          </Group>
        </Row>
      </div>

      <div className={classes.formCont}>
        <form className={classes.form}>
          {
            error.msg && <Row>
              <Alert level={error.error ? "error" : "success"} msg={error.msg}/>
            </Row>
          }
          <Row>
            <h1 className={classes.formTitle}>Siparişinizi Tamamlayınız</h1>
          </Row>
          
          <Row>
            <h1 className={classes.formTitle}>Adres</h1>
          </Row>
          <Row>
            <Col>
              <TextInput value={mahalle} onChange={setMahalle} required label="Mahalle" />
            </Col>
            <Col>
              <TextInput value={sokak} onChange={setSokak} required label="Sokak" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput value={no} onChange={setNo} required label="Kapı" />
            </Col>
            <Col>
              <TextInput value={zip} onChange={setZip} required label="Posta Kodu" />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput value={il} onChange={setIl} required label="İl" />
            </Col>
            <Col>
              <TextInput value={ilce} onChange={setIlce} required label="İlçe" />
            </Col>
          </Row>
          <Row>
            <Button label="Ödemeyi Tamamla" disabled={beklemekte} onClick={ode}/>
          </Row>
        </form>
      </div>
    </>
  );
}