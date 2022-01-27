import { Request, Response } from 'express';
import ClassUser from '../models/ClassUser';

class ClassUserController {
    async store(req: Request, res: Response) {
        const { courseId, classId, studentId } = req.params;

        try {
            const response = await ClassUser.create(
                {
                    class_id: Number(classId),
                    student_id: Number(studentId),
                    has_access: true
                },
                {}
            );
            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async index(req: Request, res: Response) {
        const { courseId, classId } = req.params;
        const { studentId } = req.query;

        let whereClassUser = {
            class_id: classId
        };

        if (studentId) {
            whereClassUser = Object.assign(whereClassUser, {
                student_id: studentId
            });
        }

        try {
            const users = await ClassUser.findAll({
                attributes: ['id', 'has_access'],
                where: whereClassUser,
                include: [
                    {
                        attributes: ['name', 'email'],
                        association: 'student'
                    },
                    {
                        attributes: [],
                        association: 'class',
                        include: [
                            {
                                attributes: [],
                                where: { id: courseId },
                                association: 'course'
                            }
                        ]
                    }
                ]
            });

            const response = users.map((user: any) => {
                return {
                    id: user.id,
                    name: user.student.name,
                    email: user.student.email,
                    has_access: user.has_access
                };
            });
            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const { courseId, classId, studentId } = req.params;
        const { has_access } = req.body;

        try {
            await ClassUser.update(
                { has_access },
                {
                    where: {
                        id: studentId,
                        class_id: classId
                    }
                }
            );

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        const { courseId, classId, studentId } = req.params;

        try {
            const user = await ClassUser.findOne({
                attributes: ['id', 'has_access'],
                where: {
                    id: studentId,
                    class_id: classId
                },
                include: [
                    {
                        attributes: ['id', 'name', 'email'],
                        association: 'student'
                    },
                    {
                        attributes: [],
                        association: 'class',
                        include: [
                            {
                                attributes: [],
                                where: { id: courseId },
                                association: 'course'
                            }
                        ]
                    }
                ]
            });
            const response = {
                id: user.id,
                name: user.student.name,
                email: user.student.email,
                has_access: user.has_access
            };

            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async destroy(req: Request, res: Response) {
        const { courseId, classId, studentId } = req.params;

        try {
            await ClassUser.destroy({
                where: {
                    id: studentId,
                    class_id: classId
                }
            });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new ClassUserController();
