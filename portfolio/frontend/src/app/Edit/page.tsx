"use client";
import Header from "../components/Header";
import { useWindowSize } from "@/hooks/GetWindowSize";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Myself from "./components/Myself";
import AddWorks from "./components/AddWorks";
import AddSkills from "./components/AddSkills";

const EditPage = () => {
  const router = useRouter();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const { height, width } = useWindowSize();

  return (
    <div
      className={`flex flex-col min-h-screen h-[${height}px] w-[${width}px]`}
    >
      <Header />
      <main className="flex flex-col p-8">
        <div className="text-center">
          <h1 className="font-bold">編集ページ</h1>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleLogout}
            className="ml-auto bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-all duration-200 active:scale-95"
          >
            Logout
          </button>
          <div className="grid items-center justify-center">
            <Myself />
          </div>
          <AddWorks portfolioId={1} />
          <AddSkills portfolioId={1} />
        </div>
      </main>
      <footer className="flex items-center justify-center bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 ポートフォリオ</p>
      </footer>
    </div>
  );
};
export default EditPage;
