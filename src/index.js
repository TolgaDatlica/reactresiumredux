import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from 'react-redux';
import configureStore from './redux/reducers/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
)