import { application } from '..';

export interface IVideoComplete {
    uploadId: string;
    title: string;
    description: string;
    course_id: number;
}

export interface IVideoView {
    video_id: number;
}

export interface IVideoCourse {
    description: string;
    id: number;
    title: string;
}

export interface IVideo {
    id: string;
    policy: string;
    url: string;
}
export const ServiceVideo = {
    list: (courseId: number) =>
        application.get<IVideoCourse[]>(`/course/${courseId}/videos`),
    get: ({ video_id }: IVideoView) =>
        application.get<IVideo>('/video/view', { params: { video_id } }),
    complete: ({ ...data }: IVideoComplete) =>
        application.put(`video/upload/${data.uploadId}/complete`, data),

    delete: (video_id: number) => application.delete(`/video/${video_id}`)
};
