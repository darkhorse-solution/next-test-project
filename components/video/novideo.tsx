import Link from "next/link";

export default function NoVideos() {
  return (
    <>
      <div className="novideos">
        <div className="mb-9">
          <h1 className="text-4xl text-white">Your movie list is empty</h1>
        </div>
        <Link href="/video/create">
          <button className="cst-button p-4 px-3 btn w-full">
            Add a new movie
          </button>
        </Link>
      </div>
    </>
  );
}
