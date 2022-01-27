import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Application, ContextApplication } from './context/contextApplication';
import IndoorStack from './stack/IndoorStack';
import OutdoorStack from './stack/OutdoorStack';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const { isAuthenticate } = React.useContext(ContextApplication);
    return (
        <div className="container" data-id={isAuthenticate}>
            <ToastContainer position="top-center" />
            {isAuthenticate ? <IndoorStack /> : <OutdoorStack />}
        </div>
    );
}

export default App;
