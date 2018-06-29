import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from "redux"
import {roboApp} from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(roboApp);
ReactDOM.render(
    <Provider store={store}>
        <App row={5} column={5}/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
