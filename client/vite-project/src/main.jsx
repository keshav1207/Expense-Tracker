
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./redux/store.js"
import Router from './router/Router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 
    <Router />
 
  </Provider>
)
