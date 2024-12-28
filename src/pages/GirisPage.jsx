import { useContext, useState } from 'react';
import TextInput from '../components/TextInput';
import { Row } from 'react-bootstrap';
import classes from './AuthPage.module.css';
import Button from '../components/Button';
import { ReactContext } from '../context/reactContext';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router';

export default function() {
  const ctx = useContext(ReactContext);
  const [kullaniciadi, setKullaniciadi] = useState('');
  const [sifre, setSifre] = useState('');

  const [error, setError] = useState({error: false, msg:''});
  const [beklemekte, setBeklemekte] = useState(false);

  async function giris() {
    setError({error: false, msg: ''});
    setBeklemekte(true);
    const response = await ctx.giris(kullaniciadi, sifre);
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      ctx.saveToken(response.kullanici.token, response.kullanici.kullaniciadi);
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
          <h1 className={classes.formTitle}>Giriş Yap</h1>
        </Row>
        <Row>
          <TextInput value={kullaniciadi} onChange={setKullaniciadi} required label="Kullanıcıadı" />
        </Row>
        <Row>
          <TextInput value={sifre} onChange={setSifre} required label="Şifre" password/>
        </Row>
        <Row>
          <Button label="Giriş Yap" disabled={beklemekte} onClick={giris}/>
        </Row>
      </form>
    </div>
  )
}