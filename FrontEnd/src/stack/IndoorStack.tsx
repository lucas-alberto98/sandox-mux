import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Admin from '../pages/Admin';
import ListVideos from '../pages/ListCourse';
import Course from '../pages/Course';
import Class from '../pages/Class';

const IndoorStack: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/course/:id" component={Course} />
                <Route path="/class/:id" component={Class} />
                {JSON.parse(localStorage.getItem('user') || '{}').role ===
                    'producer' && (
                    <Route path="/admin" exact={true} component={Admin} />
                )}

                <Route path="/*" component={ListVideos} />
            </Switch>
        </Router>
    );
};

export default IndoorStack;
