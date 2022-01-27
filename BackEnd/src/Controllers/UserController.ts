import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
    async index(req: Request, res: Response) {
        const users = await User.findAll({
            // include: ['id', 'name', 'email']
        });
        return res.json(
            users.map((user) => ({
                email: user.email,
                name: user.name,
                id: user.id
            }))
        );
    }
}

export default new UserController();
