// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import './index.css';
import config from './app.config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function onAuthRequired({ history }) {
    history.push('/login');
}

ReactDOM.render(
    <Router>
        <Security {...config} onAuthRequired={onAuthRequired}>
            <App />
        </Security>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker()

