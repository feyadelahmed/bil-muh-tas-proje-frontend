import { useContext, useEffect, useState } from 'react';
import TextInput from '../components/TextInput';
import { Row } from 'react-bootstrap';
import classes from './AuthPage.module.css';
import Button from '../components/Button';
import { ReactContext } from '../context/reactContext';
import Alert from '../components/Alert';
import { useNavigate, useParams } from 'react-router';

export default function() {
  const ctx = useContext(ReactContext);
  const params = useParams();

  useEffect(() => {
    (async function() {
      const response = await ctx.faturaGetir(ctx.token, params.odemeId);
      
      if (response.error) {

      } else {
        window.location.href = response.odeme.dekont;
      }
    })();
  }, [ctx.itemToBuy]);

  return (
    <div className={classes.formCont}>
      <Alert level={"success"} msg={"Ödeme Başarı ile tamamlandı. Fatura yükleniyor."}/>
    </div>
  )
}