import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ContextApplication } from '../../context/contextApplication';
import { ServiceUser } from '../../services/api';

type FormValue = {
    email: string;
    password: string;
};

const Login: React.FC = ({}) => {
    const { setIsAuthenticate } = React.useContext(ContextApplication);
    const history = useHistory();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError
    } = useForm<FormValue>();

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        ServiceUser.login(data.email, data.password)
            .then((resp) => {
                setIsAuthenticate(true);
                history.push('/');
                localStorage.setItem('jwt', resp.data.token);
                localStorage.setItem('user', JSON.stringify(resp.data.user));
            })
            .catch(() => {
                setError('email', {
                    type: 'manual',
                    message: 'Email ou senha inválidos'
                });
            });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <div className="card w-50">
                <div className="card-header bg-primary text-white">Login</div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                {...register('email')}
                                type="email"
                                placeholder="Enter email"
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                {...register('password')}
                                type="password"
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback>
                                {errors.password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="mt-4 d-flex justify-content-center">
                            <Button
                                className="w-50"
                                variant="primary"
                                type="submit"
                            >
                                Entrar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
