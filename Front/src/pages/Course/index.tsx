import React from 'react';
import './style.scss';
import Player from './components/player';
import { useParams } from 'react-router-dom';
import { IVideoCourse, ServiceVideo } from '../../services/api';

interface IProps {}

interface Params {
    id: string;
}

const VideoPlayer: React.FC<IProps> = ({}) => {
    const [listVideo, setListVideo] = React.useState<IVideoCourse[]>([]);
    const [currentId, setCurrentId] = React.useState(0);
    const [currentURL, setCurrentURL] = React.useState<string>();
    const [erroVideo, setErroVideo] = React.useState<any>({});
    const [erroCurse, setErroCurse] = React.useState<string | null>(null);

    const { id } = useParams<Params>();

    React.useEffect(() => {
        ServiceVideo.list(Number(id))
            .then((resp) => {
                setListVideo(resp.data);
                handlerSelectVideo(resp.data[0].id);
            })
            .catch((resp) => {
                if (resp.response) {
                    setErroCurse(resp.response.data.code);
                }
            });
    }, [id]);

    const handlerSelectVideo = (videoId: number) => {
        setErroVideo(null);
        ServiceVideo.get({ video_id: videoId })
            .then((resp) => {
                setCurrentURL(resp.data.url);
                setCurrentId(videoId);
            })
            .catch((err) => {
                if (err.response) {
                    setErroVideo(err.response.data);
                }
            });
    };

    const renderError = () => {
        if (erroVideo.code === 'NO_VIDEO') {
            return <h4>Video Não encontrado</h4>;
        } else if (erroVideo.code === 'NO_ASSETS') {
            return <h4>Video não encontrado na mux</h4>;
        } else if (erroVideo.code === 'NO_ACCESS') {
            return <h4>Você não tem acesso a esse video</h4>;
        }
    };

    if (erroCurse) {
        return (
            <div className="row">
                <div className="col-12">
                    <h4>Você não tem acesso a esse curso</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-9">
                <div>
                    <h4>Aula 1</h4>
                </div>

                {currentURL && <Player src={currentURL} thumbnail="aa.jpg" />}
                {erroVideo && <div className="mt-4">{renderError()}</div>}
            </div>

            <div className="col-3">
                <div>
                    <h4>Aulas</h4>
                </div>
                <div className="list-group">
                    {listVideo.map((video) => (
                        <button
                            className={
                                'list-group-item list-group-item-action' +
                                (video.id === currentId ? ' active' : '')
                            }
                            onClick={() => handlerSelectVideo(video.id)}
                        >
                            {video.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
