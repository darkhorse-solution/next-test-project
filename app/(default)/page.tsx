import Background from "@/components/ui/background";
import Link from "next/link";

export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

export default function Home() {
  return (
    <>
      <div>
        <Background />
        <div className="text-center text-white home-title">
          <h1 className="text-5xl">Welcome BALAJI</h1>
          <p>We sincerly hope to work with you. We will do our best.</p>
          <div className="flex flex-wrap mt-5">
            <Link href="/signin">
              <button className="btn w-200 mr-2 cst-button-outline  py-4 px-3 text-white">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="btn w-200 cst-button py-4 px-3 text-white">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
