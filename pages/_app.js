import '../styles/main.scss'
import '../styles/vendors/_quill.scss'
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp