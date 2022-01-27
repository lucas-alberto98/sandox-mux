import { application } from '..';

export const ServiceUser = {
    login: (email: string, password: string) =>
        application.post('/user/login', { email, password }),
    all: () => application.get('/users')
};
