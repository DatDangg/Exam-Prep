import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Contact from '../../components/Contact/Contact';

function MainLayout() {
  return (
    <>
      <Header />
      <Contact />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
