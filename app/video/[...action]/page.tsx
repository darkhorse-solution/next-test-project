"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useState, useCallback, useEffect } from "react";

import Image from "next/image";
import Loading from "@/components/Loading";

interface Video {
  id: string;
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
}

export default function CreateVideo({
  params,
}: {
  params: { action: string[] };
}) {
  const router = useRouter();
  const [_id, setId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [publishYear, setPublishyear] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Fetch video data if editing
  useEffect(() => {
    const fetchVideoById = async (id: string) => {
      try {
        const response = await fetch(`/api/videos/getbyid?id=${id}`);
        const res = await response.json();
        setImageUrl(res.link);
        setTitle(res.title);
        setPublishyear(res.publishYear);
        setId(res._id);
      } catch (error) {
        console.log("Can't get video by id");
      } finally {
        setLoading(false); // Ensure loading is set to false in finally block
      }
    };

    if (params.action[0] === "edit" && params.action[1]) {
      fetchVideoById(params.action[1]);
    } else {
      setLoading(false); // Set loading to false if not editing
    }
  }, [params]);

  // Set page title based on action
  const pagetitle = params.action[0] === "edit" ? "Edit" : "Create a new movie";

  // Cancel button handler
  const handleCancel = () => {
    router.push("/video");
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log(file.type); // Log the file type
      if (file.type.startsWith("image/")) {
        setImage(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      } else {
        console.error("Invalid file type. Please upload an image.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });
  // Show loading state

  // Handle form submission
  const handleSubmit = async () => {
    if (!imageUrl || !title || !publishYear) return;

    const reader = new FileReader();
    if (image) {
      //create
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString();
        if (base64Image) {
          try {
            const response = await fetch("/api/videos/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: base64Image,
                title,
                publishYear,
                _id,
              }),
            });

            if (!response.ok) {
              throw new Error("Image upload failed");
            } else {
              router.push("/video");
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
    } else {
      //update
      try {
        const response = await fetch("/api/videos/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            publishYear,
            _id,
            imageUrl
          }),
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        } else {
          router.push("/video");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="video-create">
        <h1 className="text-4xl mb-12">{pageTitle}</h1>
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-6/12 sm:w-1/1 w-full">
            <div {...getRootProps()} onClick={open} className="ml-3 video-drag">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <>
                  <input {...getInputProps()} hidden />
                  <div className="video-drag-content">
                    <div className="flex" style={{ justifyContent: "center" }}>
                      <FontAwesomeIcon
                        icon={["fas", "download"]}
                        style={{ width: "24px", textAlign: "center" }}
                      />
                    </div>
                    <h5 className="text-white text-xl mt-5">
                      Drop an Image here
                    </h5>
                  </div>
                </>
              )}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                id="createPublishyear"
                className="w-300 cst-input text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="text"
                autoComplete="on"
                placeholder="Publish year"
                required
                value={publishYear}
                onChange={(e) => setPublishyear(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mt-3">
              <button
                onClick={handleCancel}
                className="btn w-200 mr-2 cst-button-outline py-4 px-3 text-white"
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
        <div className="big-gap"></div>
      </div>
    </>
  );
}
