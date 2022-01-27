import React from 'react';
import { Link } from 'react-router-dom';
import { ICourse, ServiceCourse } from '../../services/api/course';

import './styles.scss';

const ListVideos: React.FC = () => {
    const [listCourse, setListCourse] = React.useState<ICourse[]>([]);

    React.useEffect(() => {
        ServiceCourse.read()
            .then((response) => {
                setListCourse(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // const list = Array.from({ length: 10 }).map((element, i) => ({
    //   info: { title: "Teste " + i, description: "Descrição", video_id: i },
    // }));

    return (
        <>
            <div className="container-list">
                <div className="row">
                    <div className="col-12">
                        <h4>Seus Cursos</h4>
                    </div>
                </div>
                <div className="row">
                    {listCourse.map((element, i) => (
                        <div className="col-md-3 mb-3" key={i}>
                            <div className="card">
                                <img
                                    src="https://www.ingaia.com.br/wp-content/plugins/video-thumbnails/default.jpg"
                                    className="card-img-top"
                                    alt="..."
                                />

                                <div className="card-body">
                                    <Link to={'/course/' + element.id}>
                                        <h5 className="card-title">
                                            {element.name}
                                        </h5>
                                    </Link>

                                    <p className="card-text">
                                        {element.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListVideos;
