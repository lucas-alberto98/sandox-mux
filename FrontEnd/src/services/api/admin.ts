import { application } from '..';

export const ServiceAdmin = {
    getStudents: (courseId: number, classId: number) =>
        application.get(`/courses/${courseId}/classes/${classId}/students`)
};
