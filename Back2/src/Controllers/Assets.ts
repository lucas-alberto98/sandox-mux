import { Request, Response } from "express";
import Class from "../models/Class";

class AssetsController {
  async show(req: Request, res: Response) {
    const user_id = req.userId;
    const { courseId, classId } = req.params;
    try {
      const response = await Class.findOne({
        attributes: ["id", "name", "start", "finish", "status"],
        where: { id: classId },
        include: [
          {
            attributes: [],
            association: "course",
            where: { id: courseId, owner_user_id: user_id.toString() },
          },
        ],
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AssetsController();
