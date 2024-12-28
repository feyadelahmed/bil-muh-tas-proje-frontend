import { ReactContext } from './context/reactContext'
import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'

import './App.css'
import Layout from './pages/Layout'
import KayitPage from './pages/KayitPage';
import GirisPage from './pages/GirisPage';
import AnasayfaPage from './pages/AnasayfaPage';
import ProfilPage from './pages/ProfilPage';
import UrunEklePage from './pages/UrunEklePage';
import UrunGosterPage from './pages/UrunGosterPage';
import UrunGuncellePage from './pages/UrunGuncellePage';


function AuthenticatedRoutes() {
  const ctx = useContext(ReactContext);
  return (
    ctx.token
    ? <Outlet />
    : <Navigate to="/giris" />
  );
}

function UnauthenticatedRoutes() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.token
    ? <Outlet />
    : <Navigate to="/" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<AnasayfaPage />} />
          <Route path='/urun/:urunId' element={<UrunGosterPage />} />
          
          <Route element={<AuthenticatedRoutes />}>
            <Route path='/profil' element={<ProfilPage />} />
            <Route path='/profil/@/:kullaniciadi' element={<ProfilPage />} />
            <Route path='/ekle' element={<UrunEklePage />} />
            <Route path='/urun/:urunId/guncelle' element={<UrunGuncellePage />} />
          </Route>

          <Route element={<UnauthenticatedRoutes />}>
            <Route path='/giris' element={<GirisPage />} />
            <Route path='/kayit' element={<KayitPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
