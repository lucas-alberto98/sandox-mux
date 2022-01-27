import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { db } from '../models';
import Course from '../models/Course';

class CourseController {
    async store(req: Request, res: Response) {
        const user_id = req.userId;
        const { name, description, enable } = req.body;

        try {
            const course = await Course.create({
                name,
                description,
                enable,
                owner_user_id: user_id
            });

            return res.json(course);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const user_id = req.userId;
        const { courseId } = req.params;
        const { name, description, enable } = req.body;

        try {
            const course = await Course.findOne({
                attributes: ['id'],
                where: { owner_user_id: String(user_id), id: courseId }
            });

            await course.update({ name, description, enable });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async index(req: Request, res: Response) {
        const user_id = req.userId;
        try {
            const courses = await db.sequelize.query(
                'select c.* from courses c left join classes c2 on c.id = c2.course_id left join class_users cu on cu.class_id = c2.id where cu.id = ?',
                { replacements: [user_id], type: QueryTypes.SELECT }
            );
            return res.json(courses);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        const { courseId } = req.params;
        try {
            const course = await Course.findByPk(courseId, {
                attributes: ['id', 'name', 'description', 'enable']
            });
            return res.json(course);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new CourseController();
