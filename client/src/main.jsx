import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Bounce, ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      />    
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
