import * as UpChunk from '@mux/upchunk';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Alert, Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { variables } from '../../constants/variables';
import { ServiceVideo } from '../../services/api';
import { ICourse, ServiceCourse } from '../../services/api/course';

// import { Container } from './styles';
interface IProps {
    isOpen: boolean;
    onClose: () => void;
    course_id: number;
}

type FormValue = {
    title: string;
    description: string;
    course: number;
};

const ModalUpload: React.FC<IProps> = ({ isOpen, onClose, course_id }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValue>();

    const [progress, setProgress] = React.useState(0);
    const [initUpload, setInitUpload] = React.useState(false);
    const [uploadMuxId, setUploadMuxId] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isComplete, setIsComplete] = React.useState(false);
    const inputRef = React.useRef<any>();

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        ServiceVideo.complete({
            uploadId: uploadMuxId,
            title: data.title,
            description: data.description,
            course_id: course_id
        })
            .then(() => {
                toast.success('Vídeo enviado com sucesso!');
                onClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const createUpload = async () => {
        try {
            const headers = new Headers();
            headers.append(
                'Authorization',
                'Bearer ' + localStorage.getItem('jwt')
            );
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');

            const resp = await fetch(variables.baseURL + '/video/upload', {
                method: 'POST',
                headers,
                body: JSON.stringify({ course_id })
            });
            const { id, url } = await resp.json();
            console.log(id, url);
            setUploadMuxId(id);
            return url;
        } catch (e) {
            console.error('Error in createUpload', e);
            setErrorMessage('Erro ao criar upload');
            throw e;
        }
    };

    const startUpload = () => {
        setInitUpload(true);
        const upload = UpChunk.createUpload({
            endpoint: createUpload,
            file: inputRef.current.files[0]
        });

        upload.on('error', (err) => {
            setErrorMessage(err.detail);
        });

        upload.on('progress', (progress) => {
            setProgress(Math.floor(progress.detail));
        });

        upload.on('success', () => {
            setIsComplete(true);
        });
    };

    const handlerClickUpload = () => {
        if (inputRef.current) inputRef.current.click();
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enviar vídeo</Modal.Title>
            </Modal.Header>
            {errorMessage && (
                <Alert className="mx-3 mt-2" variant="danger">
                    {errorMessage}
                </Alert>
            )}

            {isComplete && (
                <Alert className="mx-3 mt-2" variant="success">
                    Upload completo
                </Alert>
            )}

            {initUpload ? (
                <Modal.Body className="">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Titulo do vídeo</Form.Label>
                            <Form.Control
                                {...register('title')}
                                type="text"
                                placeholder="Titulo do vídeo"
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Descrição do vídeo</Form.Label>
                            <Form.Control
                                {...register('description')}
                                as="textarea"
                                rows={3}
                                placeholder="Descrição"
                            />
                        </Form.Group>
                        <Form.Group className="mt-4">
                            <Form.Label>Progresso do envio</Form.Label>
                            <ProgressBar now={progress} />
                        </Form.Group>
                        <div className="d-flex mt-4 align-items-center flex-column">
                            <Button
                                variant="primary"
                                className="w-50"
                                onClick={handlerClickUpload}
                                type="submit"
                            >
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            ) : (
                <Modal.Body className="d-flex align-items-center flex-column my-5">
                    <h6>Selecione um arquivo para fazer o envio</h6>
                    <p className="text-muted">
                        Seus vídeos ficarão privados até que você os publique
                    </p>
                    <input
                        type="file"
                        ref={inputRef}
                        className="d-none"
                        onChange={startUpload}
                    />
                    <Button
                        variant="primary"
                        className="w-50"
                        onClick={handlerClickUpload}
                    >
                        Selecionar arquivo
                    </Button>
                </Modal.Body>
            )}
        </Modal>
    );
};

export default ModalUpload;
