import classes from './Yorumlar.module.css';
import Yorum from './Yorum';
import { Text } from '@mantine/core';
import { Row } from 'react-bootstrap';
import Alert from './Alert';
import TextInput from './TextInput';
import Button from './Button';
import { useContext, useState } from 'react';
import { ReactContext } from '../context/reactContext';

export default function({yorumlar, urun, onYorum}) {
  const ctx = useContext(ReactContext);
  const [yorum, setYorum] = useState('');

  const [error, setError] = useState({error: false, msg:''});
  const [beklemekte, setBeklemekte] = useState(false);

  async function yorumGonder() {
    setError({error: false, msg: ''});
    setBeklemekte(true);
    const response = await ctx.yorumYaz(ctx.token, yorum, urun.id);
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      setError({error: false, msg: ''});
      onYorum()
    }
    setBeklemekte(false);
  }

  return (
    <div className={classes.cont}>
      <Text fz="h1" fw={500} className={classes.name}>
        Yorumlar:
      </Text>
      <form className={classes.form}>
        {
          error.msg && <Row>
            <Alert level={error.error ? "error" : "success"} msg={error.msg}/>
          </Row>
        }
        <Row>
          <TextInput textarea value={yorum} onChange={setYorum} required label="Yorum veya Soru Gönder:" />
        </Row>
        <Row>
          <Button notfullwidth label="Gönder" disabled={beklemekte} onClick={yorumGonder}/>
        </Row>
      </form>
      <div className={classes.yorumler}>
        {yorumlar.map(yorum => <Yorum key={yorum.id} urun={urun} yorum={yorum} onYorum={onYorum}/>)}
      </div>
    </div>
  );
}