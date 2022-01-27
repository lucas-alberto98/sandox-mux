import { Request, Response } from 'express';
import Class from '../models/Class';

class ClassController {
    async store(req: Request, res: Response) {
        const { courseId } = req.params;
        const { start, finish, name, status } = req.body;

        try {
            const response = await Class.create({
                course_id: Number(courseId),
                name,
                start,
                finish,
                status
            });

            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async index(req: Request, res: Response) {
        const { courseId } = req.params;
        try {
            const response = await Class.findAll({
                attributes: ['id', 'name', 'status', 'start', 'finish'],
                include: [
                    {
                        attributes: [],
                        association: 'course',
                        where: { id: Number(courseId) }
                    }
                ]
            });

            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const user_id = req.userId;
        const { courseId, classId } = req.params;
        const { start, finish, name, status } = req.body;
        try {
            const response = await Class.findOne({
                attributes: ['id'],
                where: { id: classId },
                include: [
                    {
                        attributes: [],
                        association: 'course',
                        where: {
                            id: courseId,
                            owner_user_id: user_id.toString()
                        }
                    }
                ]
            });

            await response.update({ start, finish, name, status });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        const user_id = req.userId;
        const { courseId, classId } = req.params;
        try {
            const response = await Class.findOne({
                attributes: ['id', 'name', 'start', 'finish', 'status'],
                where: { id: classId },
                include: [
                    {
                        attributes: [],
                        association: 'course',
                        where: {
                            id: courseId,
                            owner_user_id: user_id.toString()
                        }
                    }
                ]
            });

            return res.json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new ClassController();
