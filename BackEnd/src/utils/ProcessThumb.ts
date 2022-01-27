import Mux from "@mux/mux-node";
import Axios from "axios";
const { Video } = new Mux();
import { resolve } from "path";
import { createWriteStream } from "fs";

async function downloadFile(fileUrl: string, outputLocationPath: string) {
  const writer = createWriteStream(outputLocationPath);
  return Axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  })
    .then((response) => {
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on("error", (err) => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on("close", () => {
          if (!error) {
            resolve(true);
          }
        });
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

class ProcessThumb {
  async process(assets_id: string) {
    const playback = await Video.Assets.createPlaybackId(String(assets_id), {
      policy: "signed",
    });

    let baseOptions = {
      keyId: process.env.MUX_SIGNED_PRIVATE_KEY_ID, // Enter your signing key id here
      keySecret: process.env.MUX_SIGNED_PRIVATE_KEY_BASE64, // Enter your base64 encoded private key here
      expiration: "10m", // E.g 60, "2 days", "10h", "7d", numeric value interpreted as seconds
    };

    const token = Mux.JWT.sign(playback.id, {
      ...baseOptions,
      type: "thumbnail",
    });

    const url = `https://image.mux.com/${playback.id}/thumbnail.jpg?token=${token}`;
    console.log(url);
    const name = playback.id + ".jpg";
    const path = resolve(__dirname, "..", "..", "tmp", "uploads") + "/" + name;

    await downloadFile(url, path);

    return name;
  }
}
export default new ProcessThumb();
