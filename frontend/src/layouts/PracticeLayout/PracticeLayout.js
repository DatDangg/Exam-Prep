import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

function PracticeLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PracticeLayout;
