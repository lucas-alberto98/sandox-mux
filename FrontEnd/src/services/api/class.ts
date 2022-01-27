import { application } from '..';

export interface IClass {
    id: number;
    name: string;
    start: string | null;
    finish: string | null;
    status: string;
}

export const ServiceClass = {
    read: (courseId: number) =>
        application.get<IClass[]>(`/courses/${courseId}/classes`),
    create: (courseId: number, data: any) =>
        application.post(`/courses/${courseId}/classes`, data),

    addUser: (courseId: number, classId: number, userId: number) =>
        application.post(
            `/courses/${courseId}/classes/${classId}/students/${userId}`
        ),
    removeUser: (courseId: number, classId: number, userId: number) =>
        application.delete(
            `/courses/${courseId}/classes/${classId}/students/${userId}`
        )
};
