import React from 'react';
import {
    AiOutlineDelete,
    AiOutlinePlusCircle,
    AiOutlineUser
} from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ServiceVideo } from '../../services/api';
import { ICourse, ServiceCourse } from '../../services/api/course';
import CreateCourse from './modalCreateCourse';
import ModalUpload from './modalUpload';

const Admin: React.FC = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const [openModalCurse, setOpenModalCurse] = React.useState(false);
    const [idSelectCourse, setIdSelectCourse] = React.useState<
        number | undefined
    >(undefined);

    const [listCourse, setListCourse] = React.useState<ICourse[]>([]);
    const [listVideo, setListVideo] = React.useState<any[]>([]);

    const history = useHistory();

    const HandlerSelectCourse = (courseId: number) => {
        ServiceVideo.list(courseId)
            .then((res) => {
                setListVideo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlerDeleteVideo = (id: number) => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir o video?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!'
        }).then((resp) => {
            if (!resp.dismiss) {
                ServiceVideo.delete(id)
                    .then((resp) => {
                        toast.success('Video excluído com sucesso!');
                    })
                    .catch(console.log);
            }
        });
    };

    React.useEffect(() => {
        if (idSelectCourse) HandlerSelectCourse(idSelectCourse);
    }, [idSelectCourse]);

    React.useEffect(() => {
        ServiceCourse.read().then((res) => {
            setListCourse(res.data);
        });
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-12 d-flex justify-content-between">
                    <h1>Admin</h1>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-6">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h4>Seus cursos</h4>
                        <a href="#" onClick={() => setOpenModalCurse(true)}>
                            <AiOutlinePlusCircle size={25} />
                        </a>
                    </div>
                    <div className="list-group">
                        {listCourse.map((course) => (
                            <button
                                onClick={() => setIdSelectCourse(course.id)}
                                className={
                                    'list-group-item list-group-item-action d-flex justify-content-between align-items-center ' +
                                    (idSelectCourse === course.id
                                        ? 'active'
                                        : '')
                                }
                            >
                                {course.name}
                                <button
                                    onClick={() =>
                                        history.push('/class/' + course.id)
                                    }
                                >
                                    <AiOutlineUser size={25} />
                                </button>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <h4>Videos do curso</h4>
                                {idSelectCourse && (
                                    <a
                                        href="#"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        <AiOutlinePlusCircle size={25} />
                                    </a>
                                )}
                            </div>
                            {!idSelectCourse && (
                                <p className="text-muted mt-2">
                                    Selecione um curso
                                </p>
                            )}
                            <div className="list-group">
                                {listVideo.map((video) => (
                                    <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        {video.title}
                                        <button
                                            onClick={() =>
                                                handlerDeleteVideo(video.id)
                                            }
                                        >
                                            <AiOutlineDelete size={25} />
                                        </button>
                                    </button>
                                ))}
                            </div>
                            {listVideo.length === 0 && idSelectCourse && (
                                <p className="text-muted mt-2">
                                    Nenhum Video Encontrado
                                </p>
                            )}
                        </div>
                        <div className="col-12 mt-4">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <h4>Turmas do curso</h4>
                                {idSelectCourse && (
                                    <a
                                        href="#"
                                        onClick={() => setOpenModal(true)}
                                    >
                                        <AiOutlinePlusCircle size={25} />
                                    </a>
                                )}
                            </div>
                            {!idSelectCourse && (
                                <p className="text-muted mt-2">
                                    Selecione um curso
                                </p>
                            )}
                            <div className="list-group">
                                {listVideo.map((video) => (
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action"
                                    >
                                        {video.title}
                                    </a>
                                ))}
                            </div>
                            {listVideo.length === 0 && idSelectCourse && (
                                <p className="text-muted mt-2">
                                    Nenhum Video Encontrado
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {idSelectCourse && (
                <ModalUpload
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    course_id={idSelectCourse}
                />
            )}
            <CreateCourse
                isOpen={openModalCurse}
                onClose={() => setOpenModalCurse(false)}
            />
        </div>
    );
};

export default Admin;
