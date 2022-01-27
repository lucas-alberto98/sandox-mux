import Mux from '@mux/mux-node';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { db } from '../models';
const { Video } = new Mux();
import VideoModel from '../models/Video';

class VideoController {
    async index(req: Request, res: Response) {
        const { courseId } = req.params;

        const sql =
            'select * from courses c left join classes c2 on c.id = c2.course_id left join class_users cu on cu.class_id = c2.id where c.id = ? and cu.student_id  = ?';

        const has_access = await db.sequelize.query(sql, {
            replacements: [courseId, req.userId],
            type: QueryTypes.SELECT
        });

        if (has_access.length === 0) {
            return res
                .status(400)
                .json({ code: 'NO_ACCESS', error: 'Unauthorized' });
        }

        try {
            const videos = await VideoModel.findAll({
                attributes: ['id', 'title', 'description'],
                where: { course_id: courseId }
            });
            return res.json(videos);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async show(req: Request, res: Response) {
        const { video_id } = req.query;
        const userId = req.userId;

        const sql =
            'select * from courses c left join classes c2 on c.id = c2.course_id left join class_users cu on cu.class_id = c2.id left join videos v ON v.course_id = c.id where v.id = ? and cu.student_id  = ?';

        if (!video_id) {
            return res
                .status(400)
                .json({ code: 'NO_ID', message: 'id is required' });
        }

        const video = await VideoModel.findByPk(Number(video_id));

        if (!video) {
            return res.status(400).json({
                code: 'NO_VIDEO',
                message: 'Video not found'
            });
        }

        const has_access = await db.sequelize.query(sql, {
            replacements: [video_id, userId],
            type: QueryTypes.SELECT
        });

        if (has_access.length === 0) {
            return res.status(400).json({
                code: 'NO_ACCESS',
                message: 'You do not have access to this video'
            });
        }

        try {
            const playbackId = await Video.Assets.createPlaybackId(
                video.mux_assets_id,
                {
                    policy: 'signed'
                }
            );
            console.log({ playbackId });
            let baseOptions = {
                keyId: process.env.MUX_SIGNED_PRIVATE_KEY_ID, // Enter your signing key id here
                keySecret: process.env.MUX_SIGNED_PRIVATE_KEY_BASE64, // Enter your base64 encoded private key here
                expiration: '1m' // E.g 60, "2 days", "10h", "7d", numeric value interpreted as seconds
            };

            const token = Mux.JWT.sign(playbackId.id, {
                ...baseOptions,
                type: 'video'
            });

            return res.json({
                playback: playbackId,
                video,
                url: `https://stream.mux.com/${playbackId.id}.m3u8?token=${token}`
            });
        } catch (error) {
            return res.status(400).json({
                code: 'NO_ASSETS',
                message: 'No assets found'
            });
        }
    }
}

export default new VideoController();
