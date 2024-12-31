import { useContext, useState } from 'react';
import Button from './Button';
import classes from './Yorum.module.css';
import { Avatar, Group, Text } from '@mantine/core';
import { ReactContext } from '../context/reactContext';
import { Row } from 'react-bootstrap';
import Alert from './Alert';
import TextInput from './TextInput';

export default function({urun, yorum, onYorum}) {
  const ctx = useContext(ReactContext);
  const [beklemekte, setBeklemekte] = useState(false);
  const [cevap, setCevap] = useState('');
  const [cevaplama, setCevaplama] = useState('');
  const [error, setError] = useState({error: false, msg:''});

  async function sil() {
    setBeklemekte(true);
    const response = await ctx.yorumSil(ctx.token, yorum.id);
    if (response.error) {
    } else {
      onYorum()
    }
    setBeklemekte(false);
  }

  async function cevapGonder() {
    setBeklemekte(true);
    const response = await ctx.cevapYaz(ctx.token, cevap, yorum.id);
    if (response.error) {
    } else {
      onYorum()
    }
    setBeklemekte(false);
  }

  async function cevapSil(id) {
    setBeklemekte(true);
    const response = await ctx.cevapSil(ctx.token, id)
    if (response.error) {
    } else {
      onYorum()
    }
    setBeklemekte(false);
  }
  console.log(urun);
  
  return (
    <div className={classes.cont}>
      <Group wrap="nowrap">
        <Avatar
          src={yorum.kullanici.resim}
          size={74}
          radius="md"
        />
        <div className={classes.textCont}>
          <Text fz="lg" fw={500} className={classes.name}>
            {yorum.kullanici.ad} {yorum.kullanici.soyad}
          </Text>

          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {yorum.metin}
          </Text>
        </div>
        <div className={classes.btn}>
          {
            ctx.kullaniciadi === yorum.kullanici.kullaniciadi &&
            <Button label="Sil" disabled={beklemekte} onClick={sil} danger/>
          }
          {
            (!yorum.cevap && ctx.kullaniciadi === urun.kullanici.kullaniciadi) &&
            <Button label="Yanıtla" disabled={beklemekte} onClick={() => setCevaplama(!cevaplama)}/>
          }
        </div>
      </Group>
      {
        (!yorum.cevap && ctx.kullaniciadi === urun.kullanici.kullaniciadi && cevaplama) &&
        <Group className={classes.cevap} wrap="nowrap">
          <form className={classes.form}>
            {
              error.msg && <Row>
                <Alert level={error.error ? "error" : "success"} msg={error.msg}/>
              </Row>
            }
            <Row>
              <TextInput textarea value={cevap} onChange={setCevap} required label="Cevap Yaz:" />
            </Row>
            <Row>
              <Button notfullwidth label="Cevap Gönder" disabled={beklemekte} onClick={cevapGonder}/>
            </Row>
          </form>
        </Group>
      }
      {
        (yorum.cevap) &&
        <Group className={classes.cevap} wrap="nowrap">
          <Avatar
            src={urun.kullanici.resim}
            size={74}
            radius="md"
          />
          <div className={classes.textCont}>
            <Text fz="lg" fw={500} className={classes.name}>
              {urun.kullanici.ad} {urun.kullanici.soyad}
            </Text>

            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {yorum.cevap.metin}
            </Text>
          </div>
          <div className={classes.btn}>
            {
              ctx.kullaniciadi === urun.kullanici.kullaniciadi &&
              <Button label="Sil" disabled={beklemekte} onClick={() => cevapSil(cevap.id)} danger/>
            }
          </div>
        </Group>
      }
    </div>
  );
}