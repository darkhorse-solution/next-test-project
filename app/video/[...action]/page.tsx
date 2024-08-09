import Background from "@/components/ui/background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CoUProps {
    id: string;
    title: string;
    publishYear: number;
    link: string;
    createdBy: string;
}

export default function CreateVideo({params}: {params: {action: string[]}}) {
    let pagetitle = "Create a new movie";
    let edit_id = null;
    if(params.action.length === 2) edit_id = params.action[1];
    if(params && params.action[0] === 'edit') {
      pagetitle = "Edit"
    } 
    
  return (
    <>
      <Background />
      <div className="video-create">
        <div className="flex">
          <h1 className="text-4xl mb-12">{pagetitle}</h1>
        </div>

        <div className="flex flex-wrap -m-4">
          <div className="lg:w-6/12 sm:w-1/1 w-full" >
            <div>
              <div className=" ml-3 video-drag">
                <div className="video-drag-content ">

                  <div className="flex" style={{justifyContent: "center"}} >
                    <FontAwesomeIcon
                      icon={["fas", "download"]}
                      style={{ width: "24px", textAlign: "center" }}
                    />                    
                  </div>
                  <h5 className="text-white text-xl mt-5">Drop an Image here</h5>
                </div>
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
              <button className="btn w-200 mr-2 cst-button-outline  py-4 px-3 text-white">
                Cancel
              </button>
              <button className="btn w-200 cst-button py-4 px-3 text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
