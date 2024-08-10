"use client";
import Background from "@/components/ui/background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import Image from "next/image";

interface CoUProps {
  id: string;
  title: string;
  publishYear: number;
  link: string;
  createdBy: string;
}

type Image = {
  imageFile: Blob;
};

export default function CreateVideo({
  params,
}: {
  params: { action: string[] };
}) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>("");
  let pagetitle = "Create a new movie";
  let edit_id = null;
  if (params.action.length === 2) edit_id = params.action[1];
  if (params && params.action[0] === "edit") {
    pagetitle = "Edit";
  }
  function handleCancel() {
    router.push("/video");
  }
  function handleSubmit() {
    router.push("/video");
  }
  function handleImage() {
    console.log("ok");
  }

  const onDrop = useCallback((acceptedFiles) => {
    // Upload files to storage
    const file = acceptedFiles[0];
    console.log(file)
    setImageUrl(file.path)
    uploadImage({ imageFile: file });    
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = async ({ imageFile }: Image) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setImageUrl(imageUrl)
  };

  return (
    <>
      <Background />
      <div className="video-create">
        <div className="flex">
          <h1 className="text-4xl mb-12">{pagetitle}</h1>
        </div>

        <div className="flex flex-wrap -m-4">
          <div className="lg:w-6/12 sm:w-1/1 w-full">
            <div>
              <div
              {...getRootProps()}
                onClick={open}
                className=" ml-3 video-drag"
              >
                {imageUrl ? (
                  
                  <Image src={imageUrl} alt="image" layout="fill"
                  objectFit="cover" />
                  
                ) : (
                  <>
                    <input
                    {...getRootProps()}
                      style={{ width: "100%", height: "100%" }}
                      type="file"
                      hidden
                    />
                    <div className="video-drag-content ">
                      <div
                        className="flex"
                        style={{ justifyContent: "center" }}
                      >
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
          </div>
          <div className="lg:w-6/12  sm:w-1/1 w-full">
            <div className="mb-3">
              <input
                id="createTitle"
                className="w-400 cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="text"
                autoComplete="on"
                placeholder="Title"
                required
              />
            </div>
            <div>
              <input
                id="createPublishyear"
                className="w-300 cst-input  text-base outline-none text-white py-3 px-3 transition-colors duration-200 ease-in-out"
                type="text"
                autoComplete="on"
                placeholder="Publish year"
                required
              />
            </div>
            <div className="flex flex-wrap mt-3">
              <button
                onClick={handleCancel}
                className="btn w-200 mr-2 cst-button-outline  py-4 px-3 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="btn w-200 cst-button py-4 px-3 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
