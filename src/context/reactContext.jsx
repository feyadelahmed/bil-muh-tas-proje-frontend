import { createContext, useEffect, useState } from "react";
import * as api from "../util/api";
export const ReactContext = createContext();

export default function ReactContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [kullaniciadi, setKullaniciadi] = useState(localStorage.getItem('kullaniciadi'));

  function saveToken(token, kullaniciadi) {
    localStorage.setItem("token", token);
    localStorage.setItem("kullaniciadi", kullaniciadi);
    setToken(token);
    setKullaniciadi(kullaniciadi);
  }

  function loadToken() {
    const token = localStorage.getItem('token');
    const kullaniciadi = localStorage.getItem('kullaniciadi');
    setToken(token);
    setKullaniciadi(kullaniciadi);
  }

  function cikis() {
    localStorage.removeItem("token");
    localStorage.removeItem("kullaniciadi");
    setToken(null);
    setKullaniciadi(null);
  }

  const value = {
    token,
    kullaniciadi,
    saveToken,
    loadToken,
    cikis,
    ...api,
  }
  
  return (
    <ReactContext.Provider value={value}>
      { children }
    </ReactContext.Provider>
  );
}