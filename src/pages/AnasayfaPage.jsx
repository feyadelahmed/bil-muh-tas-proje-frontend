import { Link } from "react-router";
import { Paper } from '@mantine/core';
import classes from "./AnasayfaPage.module.css";
import FilterBox from "../components/FilterBox";
import { useContext, useEffect, useState } from "react";
import { ReactContext } from '../context/reactContext';
import TextInput from '../components/TextInput';
import { Row, Col } from 'react-bootstrap';
import UrunCardMain from '../components/UrunCardMain';
import Button from '../components/Button';
import Alert from "../components/Alert";


export default function() {
  const ctx = useContext(ReactContext);

  const [tumUrunler, setTumUrunler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [search, setSearch] = useState('');

  const [renkFilter, setRenkFilter] = useState([]);
  const [materyalFilter, setMateryalFilter] = useState([]);
  const [ilFilter, setIlFilter] = useState([]);
  const [kategoriFilter, setKategoriFilter] = useState([]);
  const [markaFilter, setMarkaFilter] = useState([]);
  const [durumFilter, setDurumFilter] = useState([]);

  const [renk, setRenk] = useState([]);
  const [materyal, setMateryal] = useState([]);
  const [il, setIl] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [marka, setMarka] = useState([]);
  const [durum, setDurum] = useState([]);

  const [error, setError] = useState('');
  const [beklemekte, setBeklemekte] = useState(false);

  useEffect(() => {
    (async function() {
      setBeklemekte(true);
      setError(false);
      const response = await ctx.tumUrunleriGetir();
      if (response.error) {
        setError(response.errorMsg);
      } else {
        const urunler = response.urunler.filter(u => !u.odeme);
        
        setUrunler(urunler);
        setTumUrunler(urunler);
  
        const renkler = Array.from(new Set(urunler.map(u => u.renk).filter(i => i != null).map(i => i.toLowerCase())));
        const materyaller = Array.from(new Set(urunler.map(u => u.materyal).filter(i => i != null).map(i => i.toLowerCase())));
        const iller = Array.from(new Set(urunler.map(u => u.il).filter(i => i != null).map(i => i.toLowerCase())));
        const kategoriler = Array.from(new Set(urunler.map(u => u.kategori).filter(i => i != null).map(i => i.toLowerCase())));
        const markalar = Array.from(new Set(urunler.map(u => u.marka).filter(i => i != null).map(i => i.toLowerCase())));
        const durumlar = Array.from(new Set(urunler.map(u => u.durum).filter(i => i != null).map(i => i.toLowerCase())));
  
        setRenk(renkler);
        setMateryal(materyaller);
        setIl(iller);
        setKategori(kategoriler);
        setMarka(markalar);
        setDurum(durumlar);
      }

      setBeklemekte(false);
    })()
  }, []);

  useEffect(() => {
    const filtered =
    tumUrunler
      .filter(u => renkFilter.length == 0 || ( u.renk && renkFilter.includes(u.renk.toLowerCase())))
      .filter(u => materyalFilter.length == 0 || ( u.materyal && materyalFilter.includes(u.materyal.toLowerCase())))
      .filter(u => ilFilter.length == 0 || ( ilFilter.includes(u.il.toLowerCase())))
      .filter(u => kategoriFilter.length == 0 || ( kategoriFilter.includes(u.kategori.toLowerCase())))
      .filter(u => markaFilter.length == 0 || ( markaFilter.includes(u.marka.toLowerCase())))
      .filter(u => durumFilter.length == 0 || ( durumFilter.includes(u.durum.toLowerCase())))
      .filter(u => search.trim().length == 0 || u.ad.toLowerCase().includes(search.trim().toLowerCase()));
    setUrunler(filtered);
  }, [renkFilter, materyalFilter, ilFilter, kategoriFilter, markaFilter, durumFilter, search]);

  let component;
  if (beklemekte) {
    component = <Alert level="info" msg='yükleniyor ...'/>;
  } else if (error) {
    component = <Alert level="error" msg={error}/>;
  } else {
    component = <main className={classes.main}>
                  <div className={classes.filterCont}>
                    <h1 className={classes.filterLabel}> Filtre: </h1>
                    <FilterBox label={"renk"} data={renk} onChange={setRenkFilter} />
                    <FilterBox label={"materyal"} data={materyal} onChange={setMateryalFilter} />
                    <FilterBox label={"il"} data={il} onChange={setIlFilter} />
                    <FilterBox label={"kategori"} data={kategori} onChange={setKategoriFilter} />
                    <FilterBox label={"marka"} data={marka} onChange={setMarkaFilter} />
                    <FilterBox label={"durum"} data={durum} onChange={setDurumFilter} />
                  </div>
                  <div className={classes.page}>
                    <Row className={classes.arama}>
                      <TextInput value={search} onChange={setSearch} label={`Search - ${urunler.length} sonuç bulundu`} />
                    </Row>
                    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                      <div className={classes.cardCont} >
                        {urunler.map(urun => <UrunCardMain className={"urunCardItem"} key={urun.id} urun={urun}/>)}
                      </div>
                    </Paper>
                  </div>
                </main>
  }

  return (
    component
  );
}