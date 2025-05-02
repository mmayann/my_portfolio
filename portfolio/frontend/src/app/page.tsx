"use client";

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { useWindowSize } from '../hooks/GetWindowSize';

export default function Home() {
  const { height, width } = useWindowSize();

  return (
    <div className={`flex flex-col min-h-screen h-[${height}px] w-[${width}px]`}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Main />
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
}