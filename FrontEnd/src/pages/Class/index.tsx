import React from 'react';
import { useParams } from 'react-router-dom';
import {
    FiEdit,
    FiPenTool,
    FiPlusCircle,
    FiUser,
    FiTrash
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import { IClass, ServiceClass } from '../../services/api/class';
import AddUser from './modalAddUser';
import AddClass from './modalAddClass';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ServiceAdmin } from '../../services/api/admin';
import { toast } from 'react-toastify';

interface IProps {}

interface IParams {
    id: string;
}

const Class: React.FC<IProps> = ({}) => {
    const [modalAddClass, setModalAddClass] = React.useState(false);
    const [modalAddUser, setModalAddUser] = React.useState(false);
    const { id } = useParams<IParams>();
    const [listClass, setListClass] = React.useState<IClass[]>([]);
    const [listStudents, setListStudents] = React.useState<any[]>([]);
    const [selectClass, setSelectClass] = React.useState<number>();

    const handlerClassSelect = (id: number) => {
        setSelectClass(id);
    };

    const handlerRemoveUser = (userId: number) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover!'
        }).then((result) => {
            if (result.value && selectClass) {
                ServiceClass.removeUser(Number(id), selectClass, userId)
                    .then(() => {
                        toast.success('Usuário removido com sucesso!');
                    })
                    .catch(console.log);
            }
        });
    };

    React.useEffect(() => {
        ServiceClass.read(Number(id))
            .then((res) => {
                setListClass(res.data);
            })
            .catch(console.log);
    }, []);

    React.useEffect(() => {
        if (selectClass) {
            ServiceAdmin.getStudents(Number(id), selectClass)
                .then((resp) => {
                    setListStudents(resp.data);
                })
                .catch(console.log);
        }
    }, [selectClass]);

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex flex-row">
                        <h2>Turmas</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h4>Lista de turmas</h4>
                        <a href="#" onClick={() => setModalAddClass(true)}>
                            <AiOutlinePlusCircle size={25} />
                        </a>
                    </div>
                    <div className="list-group">
                        {listClass.map((item) => (
                            <a
                                onClick={() => handlerClassSelect(item.id)}
                                href="#"
                                className={
                                    'list-group-item list-group-item-action ' +
                                    (selectClass === item.id ? 'active' : '')
                                }
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h4>Lista de alunos do curso</h4>
                        {selectClass && (
                            <a href="#" onClick={() => setModalAddUser(true)}>
                                <AiOutlinePlusCircle size={25} />
                            </a>
                        )}
                    </div>
                    <div className="list-group">
                        {listStudents.map((item) => (
                            <button
                                onClick={() => null}
                                type="button"
                                className={
                                    'list-group-item list-group-item-action ' +
                                    (selectClass === item.id ? 'active' : '')
                                }
                            >
                                {item.email}
                                <button
                                    type="button"
                                    className="ml-4"
                                    onClick={() => handlerRemoveUser(item.id)}
                                >
                                    <FiTrash />
                                </button>
                            </button>
                        ))}

                        {selectClass && listStudents.length == 0 && (
                            <p className="text-muted">
                                Nenhum usuário encontrado
                            </p>
                        )}

                        {!selectClass && (
                            <p className="text-muted">
                                Nenhuma turma selecionada
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <AddClass
                isOpen={modalAddClass}
                onClose={() => setModalAddClass(false)}
                courseId={Number(id)}
            />
            {selectClass && (
                <AddUser
                    isOpen={modalAddUser}
                    onClose={() => setModalAddUser(false)}
                    classId={selectClass}
                    courseId={Number(id)}
                />
            )}
        </div>
    );
};

export default Class;
