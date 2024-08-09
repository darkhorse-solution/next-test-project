import Background from "@/components/ui/background";


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
        <p className="mt-3">We sincerly hope to work with you. We will do our best.</p>
        </div>
        <div className="footer">@2024@</div>
      </div>
      
    </>
  );
}
