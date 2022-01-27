import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ServiceUser } from '../../services/api';
import { ServiceClass } from '../../services/api/class';
import { toast } from 'react-toastify';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    classId: number;
    courseId: number;
}

type Inputs = {
    has_access: boolean;
    user_id: number;
};

const schema = yup
    .object({
        has_access: yup.boolean().required(),
        user_id: yup.number().required()
    })
    .required();

const AddUser: React.FC<IProps> = ({ isOpen, onClose, classId, courseId }) => {
    const [listUser, setListUser] = React.useState<any[]>([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            has_access: false,
            user_id: 0
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        ServiceClass.addUser(courseId, classId, data.user_id)
            .then(() => {
                toast.success('Usuário adicionado com sucesso!');
                onClose();
            })
            .catch(console.log);
    };

    React.useEffect(() => {
        ServiceUser.all()
            .then((res) => setListUser(res.data))
            .catch(console.log);
    }, []);

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Turma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Selecione o Aluno</Form.Label>
                        <Form.Control as="select" {...register('user_id')}>
                            <option hidden>Selecione uma pessoa</option>
                            {listUser.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Controller
                            name="has_access"
                            control={control}
                            render={({ field }) => (
                                <Form.Check
                                    label="Tem acesso"
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) =>
                                        field.onChange(e.target.checked)
                                    }
                                />
                            )}
                        />
                    </Form.Group>
                    <div className="d-flex mt-4 justify-content-center align-items-center">
                        <Button type="submit">Salvar</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUser;
