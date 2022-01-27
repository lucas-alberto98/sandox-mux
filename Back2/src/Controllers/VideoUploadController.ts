import Mux from '@mux/mux-node';
import { Request, Response } from 'express';
const { Video } = new Mux();
import VideoModel from '../models/Video';
import ProcessThumb from '../utils/ProcessThumb';

class VideoUpdaloadController {
    async store(req: Request, res: Response) {
        const user_id = req.userId;
        const { course_id } = req.body;

        const upload = await Video.Uploads.create({
            new_asset_settings: { playback_policy: 'signed' },
            cors_origin: '*'
        });

        await VideoModel.create({
            mux_upload_id: upload.id,
            title: 'draft',
            description: 'draft',
            owner_user_id: user_id,
            course_id: course_id
        });

        return res.json({ id: upload.id, url: upload.url });
    }

    async update(req: Request, res: Response) {
        const { uploadId } = req.params;
        const { title, description, course_id } = req.body;
        if (uploadId) {
            const upload = await Video.Uploads.get(String(uploadId));
            if (upload.asset_id) {
                const file_name = await ProcessThumb.process(upload.asset_id);
                await VideoModel.update(
                    {
                        mux_upload_id: uploadId,
                        mux_assets_id: upload.asset_id,
                        thumbnail: file_name,
                        title,
                        description,
                        course_id
                    },
                    {
                        where: {
                            mux_upload_id: uploadId
                        }
                    }
                );
            }

            return res.json(upload);
        } else {
            return res
                .status(400)
                .json({ code: 'NO_ID', message: 'id is required' });
        }
    }

    async index(req: Request, res: Response) {
        {
            let uploads = await Video.Uploads.list({});
            res.json(uploads);
        }
    }
}

export default new VideoUpdaloadController();
