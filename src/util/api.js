import axios from 'axios';
const url = "http://localhost:3000";
// const url = "https://uniproje.vercel.app";

export async function kayit(ad, soyad, kullaniciadi, sifre) {
  try {
    const response = await axios.post(`${url}/kullanici`, {
      ad,
      soyad,
      kullaniciadi,
      sifre,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function profilGuncelle(token, resim, ad, soyad, sifre) {
  try {
    console.log(resim);
    
    const formData = new FormData();
    formData.append("ad", ad);
    formData.append("soyad", soyad);
    formData.append("sifre", sifre);
    formData.append("resim", resim);

    const response = await axios.patch(`${url}/kullanici`, formData, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function giris(kullaniciadi, sifre) {
  try {
    const response = await axios.post(`${url}/kullanici/giris`, {
      kullaniciadi,
      sifre,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function kullaniciProfilGetir(kullaniciadi) {
  try {
    const response = await axios.get(`${url}/kullanici/profil/${kullaniciadi}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function urunEkle(token, ad, kategori, fiyat, aciklama, marka, durum, renk, materyal, il, ilce, resim ) {
  try {
    const formData = new FormData();
    formData.append("ad", ad);
    formData.append("kategori", kategori);
    formData.append("fiyat", fiyat);
    formData.append("aciklama", aciklama);
    formData.append("marka", marka);
    formData.append("durum", durum);
    if (renk) formData.append("renk", renk);
    if (materyal) formData.append("materyal", materyal);
    formData.append("il", il);
    formData.append("ilce", ilce);
    formData.append("resim", resim);

    const response = await axios.post(`${url}/urun`, formData, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function urunGetir(urunId) {
  try {
    const response = await axios.get(`${url}/urun/${urunId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function urunGuncelle(token, id, ad, kategori, fiyat, aciklama, marka, durum, renk, materyal, il, ilce, resim ) {
  try {
    const formData = new FormData();
    formData.append("ad", ad);
    formData.append("kategori", kategori);
    formData.append("fiyat", fiyat);
    formData.append("aciklama", aciklama);
    formData.append("marka", marka);
    formData.append("durum", durum);
    if (renk) formData.append("renk", renk);
    if (materyal) formData.append("materyal", materyal);
    formData.append("il", il);
    formData.append("ilce", ilce);
    formData.append("resim", resim);

    const response = await axios.patch(`${url}/urun/${id}`, formData, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function urunSil(token, urunId) {
  try {
    const response = await axios.delete(`${url}/urun/${urunId}`,{
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function yorumYaz(token, metin, urunId) {
  try {
    const response = await axios.post(`${url}/yorum`, {
      metin,
      urunId,
    }, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function yorumSil(token, id) {
  try {
    const response = await axios.delete(`${url}/yorum/${id}`, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function cevapYaz(token, metin, yorumId) {
  try {
    const response = await axios.post(`${url}/yorum/cevap`, {
      metin,
      yorumId,
    }, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function cevapSil(token, id) {
  try {
    const response = await axios.delete(`${url}/yorum/cevap/${id}`, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}