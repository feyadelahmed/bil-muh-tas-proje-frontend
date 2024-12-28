import { useContext, useState } from 'react';
import TextInput from '../components/TextInput';
import {Col, Row } from 'react-bootstrap';
import classes from './AuthPage.module.css';
import Button from '../components/Button';
import { ReactContext } from '../context/reactContext';
import Alert from '../components/Alert';

export default function() {
  const ctx = useContext(ReactContext);
  
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [kullaniciadi, setKullaniciadi] = useState('');
  const [sifre, setSifre] = useState('');

  const [error, setError] = useState({error: false, msg:''});
  const [beklemekte, setBeklemekte] = useState(false);

  async function kayit() {
    setError({error: false, msg: ''});
    setBeklemekte(true);
    const response = await ctx.kayit(ad, soyad, kullaniciadi, sifre);
    console.log(response);
    
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      setError({error: false, msg: "Kullanici Oluşturuldu."});
    }
    setBeklemekte(false);
  };

  return (
    <div className={classes.formCont}>
      <form className={classes.form}>
        {
          error.msg && <Row>
            <Alert level={error.error ? "error" : "success"} msg={error.msg}/>
          </Row>
        }
        <Row>
          <h1 className={classes.formTitle}>Kayıt Ol</h1>
        </Row>
        <Row>
          <Col>
            <TextInput value={ad} onChange={setAd} required label="Ad" />
          </Col>
          <Col>
            <TextInput value={soyad} onChange={setSoyad} required label="Soyad" />
          </Col>
        </Row>
        <Row>
          <TextInput value={kullaniciadi} onChange={setKullaniciadi} required label="Kullanıcıadı" />
        </Row>
        <Row>
          <TextInput value={sifre} onChange={setSifre} required label="Şifre" password/>
        </Row>
        <Row>
          <Button label="Kayıt Ol" disabled={beklemekte} onClick={kayit}/>
        </Row>
      </form>
    </div>
  );
}