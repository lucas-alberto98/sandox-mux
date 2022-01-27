import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isProducer, setIsProducer] = React.useState(false);
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const hasAccess = String(user?.role).toUpperCase() === 'PRODUCER';
        setIsProducer(hasAccess);
    }, []);

    const history = useHistory();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container-fluid">
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <a className="navbar-brand" href="/">
                        POG - Mux
                    </a>

                    <p className="text-white m-0">
                        {isProducer ? 'Producer' : 'User'}{' '}
                        {JSON.parse(localStorage.getItem('user') || '{}').email}
                    </p>
                </div>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                </div>
                {isProducer && (
                    <button
                        className="btn btn-outline-light"
                        onClick={() => history.push('/admin')}
                    >
                        Admin
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
