"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function CreateVideo({ params }: { params: { action: string[] } }) {
  const router = useRouter();
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  let pageTitle = "Create a new video";
  let editId = null;
  if (params.action.length === 2) editId = params.action[1];
  if (params && params.action[0] === "edit") {
    pageTitle = "Edit";
  }

  const handleCancel = () => {
    router.push("/video");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setVideo(file);
    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const handleSubmit = async () => {
    if (!video || !title || !publishYear) return;

    setUploading(true);
    setErrorMessage("");
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("publishYear", publishYear);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/videos/upload", true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setVideoUrl(data.url);
      } else {
        setErrorMessage("Video upload failed");
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setErrorMessage("An error occurred during the video upload.");
    };

    xhr.send(formData);
  };

  return (
    <>
      <div className="video-create">
        <h1 className="text-4xl mb-12">{pageTitle}</h1>
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-6/12 sm:w-1/1 w-full">
            <div>
              <div {...getRootProps()} onClick={open} className="ml-3 video-drag">
                {videoUrl ? (
                  <Image
                    src={videoUrl}
                    alt="video thumbnail"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <>
                    <input
                      {...getInputProps()}
                      style={{ width: "100%", height: "100%" }}
                      hidden
                    />
                    <div className="video-drag-content">
                      <h5 className="text-white text-xl mt-5">Drop a Video here</h5>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-6/12 sm:w-1/1 w-full">
            <div className="mb-3">
              <input
                id="createTitle"
                className="w-400 cst-input text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="text"
                autoComplete="on"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                id="createPublishYear"
                className="w-300 cst-input text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="text"
                autoComplete="on"
                placeholder="Publish year"
                required
                onChange={(e) => setPublishYear(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mt-3">
              <button
                onClick={handleCancel}
                className="btn w-200 mr-2 cst-button-outline py-4 px-3 text-white"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn w-200 cst-button py-4 px-3 text-white"
                disabled={uploading}
              >
                Submit
              </button>
            </div>

            {uploading && (
              <div className="mt-4">
                <p>Uploading: {uploadProgress.toFixed(2)}%</p>
                <progress value={uploadProgress} max="100" />
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 text-red-500">
                <p>{errorMessage}</p>
              </div>
            )}

            {videoUrl && !uploading && (
              <div className="mt-4">
                <p>Video uploaded successfully!</p>
                <video src={videoUrl} controls width="600"></video>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
