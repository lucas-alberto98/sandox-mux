import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
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

    const HandlerSelectCourse = (courseId: number) => {
        ServiceVideo.list(courseId)
            .then((res) => {
                setListVideo(res.data);
            })
            .catch((err) => {
                console.log(err);
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
                            <a
                                onClick={() => setIdSelectCourse(course.id)}
                                href="#"
                                className={
                                    'list-group-item list-group-item-action ' +
                                    (idSelectCourse === course.id
                                        ? 'active'
                                        : '')
                                }
                            >
                                {course.name}
                            </a>
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
