import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ServiceCourse } from '../../services/api/course';

// import { Container } from './styles';
interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

type Inputs = {
    name: string;
    description: string;
};

const CreateCourse: React.FC<IProps> = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        ServiceCourse.create({ ...data, enabled: true })
            .then(() => {
                toast.success('Curso criado com sucesso!');
                onClose();
            })
            .catch(console.log);
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Criar curso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Nome do curso</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome do curso"
                            {...register('name')}
                        />
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição do curso"
                            {...register('description')}
                        />
                    </Form.Group>
                    <div className="mt-4 d-flex align-items-center justify-content-center">
                        <Button type="submit" variant="primary">
                            Salvar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateCourse;
