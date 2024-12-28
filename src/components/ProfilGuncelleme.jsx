import { useContext, useRef, useState } from 'react';
import TextInput from './TextInput';
import {Col, Row } from 'react-bootstrap';
import classes from './ProfilGuncelleme.module.css';
import Button from './Button';
import { ReactContext } from '../context/reactContext';
import Alert from './Alert';
import { Avatar } from '@mantine/core';

export default function({kullanici, onCancel, onSuccess}) {
  const ctx = useContext(ReactContext);
  const resimInputRef = useRef(null);
  
  const [ad, setAd] = useState(kullanici.ad);
  const [soyad, setSoyad] = useState(kullanici.soyad);
  const [resim, setResim] = useState(kullanici.resim);
  const [resimFile, setResimFile] = useState(null);
  const [sifre, setSifre] = useState('');

  const [error, setError] = useState({error: false, msg:''});
  const [beklemekte, setBeklemekte] = useState(false);

  function resimGoster(e) {
    const files = e.target.files;
    if (files.length > 0) {
      setResimFile(files[0]);
      const fr = new FileReader();
      fr.onload = () => setResim(fr.result);
      fr.readAsDataURL(files[0]);
    }
  }

  function avatarChange() {
    resimInputRef.current.click();
  }

  async function guncelle() {
    setError({error: false, msg: ''});
    setBeklemekte(true);
    const response = await ctx.profilGuncelle(ctx.token, resimFile, ad, soyad, sifre);
    
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      setError({error: false, msg: "Kullanici Güncellendi."});
      onSuccess();
      onCancel();
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
          <h1 className={classes.formTitle}>Profil Güncelleme</h1>
        </Row>
        <Row>
          <Avatar className={classes.avatar} src={resim} size={120} radius={120} mx="auto" onClick={avatarChange}/>
          <input ref={resimInputRef} className={classes.resimInput} type="file" name="resim" onChange={resimGoster}/>
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
          <TextInput value={sifre} onChange={setSifre} required label="Şifre" password/>
        </Row>
        <Row>
          <Button label="Güncelle" disabled={beklemekte} onClick={guncelle}/>
        </Row>
        <Row>
          <Button label="iptal" disabled={beklemekte} onClick={() => onCancel()}/>
        </Row>
      </form>
    </div>
  );
}