import { Avatar, Button, Paper, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { ReactContext } from '../context/reactContext';
import { useNavigate, useParams } from 'react-router';
import Alert from '../components/Alert';
import ProfilGuncelleme from '../components/ProfilGuncelleme';
import UrunCard from '../components/UrunCard';
import classes from './ProfilPage.module.css';
import ButtonComp from '../components/Button';

export default function() {
  const ctx = useContext(ReactContext);
  const navigate = useNavigate();
  const params = useParams();
  const [profil, setProfil] = useState({});
  const [error, setError] = useState(false);
  const [beklemekte, setBeklemekte] = useState(true);
  const [guncelleme, setGuncelleme] = useState(false);
  const [random, setRandom] = useState(0);
  const loggedInUser = ctx.kullaniciadi == profil.kullaniciadi;
  if (params.kullaniciadi === ctx.kullaniciadi) navigate("/profil");

  function guncelle() {
    setGuncelleme(true);
  }
  
  useEffect(() => {
    (async function() {
      setBeklemekte(true);
      setError(false);
      const response = await ctx.kullaniciProfilGetir(params.kullaniciadi || ctx.kullaniciadi);
      if (response.error) {
        setError(response.errorMsg);
      } else {
        setProfil(response.profil);
      }
      setBeklemekte(false);
    })();
  }, [random, params.kullaniciadi])

  let component;
  if (beklemekte) {
    component = <Alert level="info" msg='yükleniyor ...'/>;
  } else if (error) {
    component = <Alert level="error" msg={error}/>;
  } else {
    let headerComponent;
    let urunlerComponent;
    if (guncelleme) {
      headerComponent = <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                    <ProfilGuncelleme kullanici={profil} onSuccess={() => setRandom(Math.random())} onCancel={() => setGuncelleme(false)}/>
                  </Paper>
    } else {
      headerComponent = (
        <>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar src={profil.resim} size={120} radius={120} mx="auto"/>
            <Text ta="center" fz="lg" fw={500} mt="md"> {profil.ad} {profil.soyad} </Text>
            <Text ta="center" c="dimmed" fz="sm"> @{profil.kullaniciadi} </Text>
            {loggedInUser && <div className='d-flex justify-content-center'>
                              <Button variant="default" mt="md" onClick={guncelle}>
                                Güncelle
                              </Button>
                            </div>}
          </Paper>
          <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <div className={classes.urunEklemeCont}>
              <p className={classes.urunlerTitle}>Ürünler:</p>
              {loggedInUser && <ButtonComp label="+ Ürün Ekle" onClick={() => navigate("/ekle")}/>}
            </div>
          </Paper>
        </>
      )
    }

    urunlerComponent = (
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
        <div className={classes.cardCont} >
          {profil.urunler.map(urun => <UrunCard key={urun.id} urun={urun}/>)}
        </div>
      </Paper>
    )

    component = (
      <>
        {headerComponent}
        {profil.urunler.length > 0 && urunlerComponent}
      </>
    )
  }

  return (
    component
  );
}