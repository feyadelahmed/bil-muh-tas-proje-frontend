import { useContext, useRef, useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import { Row, Col } from 'react-bootstrap';
import classes from './UrunGuncellePage.module.css';
import Button from '../components/Button';
import { ReactContext } from '../context/reactContext';
import Alert from '../components/Alert';
import { ilIlce } from '../util/sabitler';
import { Avatar, Image } from '@mantine/core';
import { useNavigate, useParams } from 'react-router';

export default function() {
  const ctx = useContext(ReactContext);
  const resimInputRef = useRef(null);
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [ad, setAd] = useState('');
  const [kategori, setKategori] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [marka, setMarka] = useState('');
  const [durum, setDurum] = useState('');
  const [renk, setRenk] = useState('');
  const [materyal, setMateryal] = useState('');
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');
  const [resim, setResim] = useState('');
  const [resimFile, setResimFile] = useState(null);
  
  const [error, setError] = useState({error: false, msg:''});
  const [beklemekte, setBeklemekte] = useState(true);
  const [ilkYukleme, setIlkYukleme] = useState(true);

  const {urunId} = useParams();

  useEffect(() => {
    (async function() {
      setBeklemekte(true);
      setError(false);
      const response = await ctx.urunGetir(urunId);
      if (response.error) {
        setError({error: true, msg: response.errorMsg});
      } else {
        const urun = response.urun;
        setId(urun.id);
        setAd(urun.ad);
        setKategori(urun.kategori);
        setFiyat(urun.fiyat);
        setAciklama(urun.aciklama);
        setMarka(urun.marka);
        setDurum(urun.durum);
        setRenk(urun.renk || "");
        setMateryal(urun.materyal || "");
        setIl(urun.il);
        setIlce(urun.ilce);
        setResim(urun.resim);
      }
      setBeklemekte(false);
      setIlkYukleme(false);
    })();
  }, [])

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
    const response = await ctx.urunGuncelle(ctx.token, id, ad, kategori, fiyat, aciklama, marka, durum, renk, materyal, il, ilce, resimFile);
    
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      setError({error: false, msg: "Ürün Güncellendi"});
    }
    setBeklemekte(false);
  };

  async function sil() {
    setError({error: false, msg: ''});
    setBeklemekte(true);
    const response = await ctx.urunSil(ctx.token, id);
    
    if (response.error) {
      setError({error: true, msg: response.errorMsg});
    } else {
      setError({error: false, msg: "Ürün Silindi"});
      navigate("/profil")
    }
    setBeklemekte(false);
  };

  return (
    (beklemekte && ilkYukleme)
    ? <Alert level="info" msg='yükleniyor ...'/>
    : <div className={classes.formCont}>
        <form className={classes.form}>
          {
            error.msg && <Row>
              <Alert level={error.error ? "error" : "success"} msg={error.msg}/>
            </Row>
          }
          <Row>
            <h1 className={classes.formTitle}>Ürün Ekle</h1>
          </Row>
          <Row>
            <Avatar className={classes.avatar} src={resim} size={400} radius={0} mx="auto" onClick={avatarChange}/>
            <input ref={resimInputRef} className={classes.resimInput} type="file" name="resim" onChange={resimGoster}/>
          </Row>
          <Row>
            <TextInput value={ad} onChange={setAd} required label="Ad" />
          </Row>
          <Row>
            <Col>
              <TextInput value={kategori} onChange={setKategori} required label="Kategori" />
            </Col>
            <Col>
              <TextInput value={fiyat} onChange={setFiyat} required label="Fiyat" />
            </Col>
          </Row>
          <Row>
            <TextInput value={aciklama} onChange={setAciklama} required label="Açıklama" textarea />
          </Row>
          <Row>
            <Col>
              <TextInput value={marka} onChange={setMarka} required label="Marka" />
            </Col>
            <Col>
              <SelectInput value={durum} onChange={setDurum} required label="Durum" options={["yeni", "yeni gibi", "ikinci el"]} />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput value={renk} onChange={setRenk} label="Renk" />
            </Col>
            <Col>
              <TextInput value={materyal} onChange={setMateryal} label="Materyal" />
            </Col>
          </Row>
          <Row>
            <Col>
              <SelectInput value={il} onChange={setIl} required label="İl" options={Object.keys(ilIlce)}/>
            </Col>
            <Col>
              <SelectInput value={ilce} onChange={setIlce} required label="İlçe" options={ilIlce[il]}/>
            </Col>
          </Row>
            
          <Row>
            <Button label="Ürün Güncelle" disabled={beklemekte} onClick={guncelle}/>
          </Row>

          <Row>
            <Button label="Ürün Sil" disabled={beklemekte} onClick={sil} danger/>
          </Row>
        </form>
      </div>
  )
}