import '../styles/globals.css'
import Head from 'next/head';
import { Provider } from "next-auth/client"
export default function App({ Component, pageProps }) {
  return (
      <Provider session={pageProps.session}>
        
          <Component {...pageProps} />
      </Provider>
  )
}
