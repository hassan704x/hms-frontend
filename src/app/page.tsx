'use client';
// import Image from "next/image";
import LoginPage from "@/components/loginpage"; 
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/lib/Store/store';

function Home({ /*Component,*/ pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <LoginPage {...pageProps} />
    </Provider>
  );
}

export default Home;
