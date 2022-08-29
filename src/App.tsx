import React, { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import Full from './containers/Full';

const App: FunctionComponent = () => {
    return (
        <div className='App'>
            <Full />
            <ToastContainer />
        </div>
    );
};

export default App;
