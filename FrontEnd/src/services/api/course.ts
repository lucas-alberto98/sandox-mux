import { application } from '..';

export interface ICourse {
    name: string;
    description: string;
    id: number;
    enabled: boolean;
}

export const ServiceCourse = {
    read: () => application.get<ICourse[]>('/courses'),
    create: (course: Omit<ICourse, 'id'>) =>
        application.post<ICourse>('/courses', course)
};
