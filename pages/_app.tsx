import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Preloader from "../components/Preloader/Preloader";

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const handleStop = () => setLoading(true)
  //   const handleStart = () => setLoading(true)
  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleStop)
  //   router.events.on('routeChangeError', handleStop)
  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleStop)
  //     router.events.off('routeChangeError', handleStop)
  //   }
  // },[])
  // const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  // console.log(path)
  // if (path) {
  //   router.replace(path);
  // }
  return loading ? <Preloader/> : <Component {...pageProps} />
}

export default MyApp
