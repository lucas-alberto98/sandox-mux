import React, { useEffect } from "react";
import * as UpChunk from "@mux/upchunk";
import { Spinner, Alert } from "../../components/UIKit";
import "./styles.scss";
// import { Container } from './styles';

const Upload: React.FC = () => {
  const [uploadId, setUploadId] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [progress, setProgress] = React.useState(0);
  const [isPreparing, setIsPreparing] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<any>();

  const completeUpload = React.useCallback(() => {
    console.log("completeUpload", uploadId);
    fetch(`http://localhost:3333/video/upload/${uploadId}/complete`, {
      method: "PUT",
    }).then((resp) => {
      alert("Upload complete");
    });
  }, [uploadId]);

  const createUpload = async () => {
    try {
      const resp = await fetch("http://localhost:3333/video/upload", {
        method: "POST",
      });
      const { id, url } = await resp.json();
      console.log(id, url);
      setUploadId(id);
      return url;
    } catch (e) {
      console.error("Error in createUpload", e);
      setErrorMessage("Error creating upload");
      throw e;
    }
  };

  const startUpload = () => {
    setIsUploading(true);
    const upload = UpChunk.createUpload({
      endpoint: createUpload,
      file: inputRef.current.files[0],
    });

    upload.on("error", (err) => {
      setErrorMessage(err.detail);
    });

    upload.on("progress", (progress) => {
      setProgress(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      setIsPreparing(true);
    });
  };

  useEffect(() => {
    if (isPreparing) completeUpload();
  }, [completeUpload, isPreparing]);

  const handlerClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  if (!!errorMessage)
    return (
      <Alert color="danger">
        <span>{errorMessage}</span>
      </Alert>
    );

  return (
    <div className="upload-page">
      <div className="card" style={{ width: "18em" }}>
        <div className="card-header">Upload</div>
        <div className="card-body">
          {isUploading ? (
            <>
              {isPreparing ? (
                <div>Preparing..</div>
              ) : (
                <div>Uploading...{progress ? `${progress}%` : ""}</div>
              )}
              <Spinner />
            </>
          ) : (
            <label>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handlerClickUpload}
              >
                Select a video file
              </button>
              <input
                type="file"
                onChange={startUpload}
                ref={inputRef}
                className="d-none"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
