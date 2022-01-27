import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ServiceClass } from '../../services/api/class';

interface IProps {
    isOpen: boolean;
    courseId: number;
    onClose: () => void;
}

type Inputs = {
    name: string;
    status: string;
    start: string;
    finish: string;
};

const AddClass: React.FC<IProps> = ({ courseId, isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        ServiceClass.create(courseId, data)
            .then((resp) => {
                onClose();
                return toast.success('Turma criada com sucesso!');
            })
            .catch(console.log);
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Turma</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" {...register('name')} />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Status da turma</Form.Label>
                        <Form.Control as="select" {...register('status')}>
                            <option value="enable">Ativo</option>
                            <option value="disabled">Inativo</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Data de inicio</Form.Label>
                        <Form.Control type="date" {...register('start')} />
                    </Form.Group>
                    <Form.Group className="mt-2">
                        <Form.Label>Data de fim</Form.Label>
                        <Form.Control type="date" {...register('finish')} />
                    </Form.Group>
                    <div className="mt-4">
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddClass;
