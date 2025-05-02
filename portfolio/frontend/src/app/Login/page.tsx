"use client";
import Header from "../components/Header";
import { useWindowSize } from "@/hooks/GetWindowSize";
import ScrollButton from "../components/ScrollButton";
import LoginComponent from "./LoginComponent"; 

const LoginPage = () => {
  const { height, width } = useWindowSize();

  const handleLoginSuccessFromPage = () => {
    console.log("Login successful from LoginPage!");
  };

  const handleLogoutFromPage = () => {
    console.log("Logout successful from LoginPage!");
  };

  return (
    <div
      className={`flex flex-col min-h-screen h-[${height}px] w-[${width}px]`}
    >
      <Header />
      <div>
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex justify-between items-center w-full max-w-md p-2">
            <h1 className="text-2xl font-light ml-12">Login</h1>
          </div>
          <LoginComponent
            onLoginSuccess={handleLoginSuccessFromPage}
            onLogout={handleLogoutFromPage}
          />
        </main>
        <ScrollButton label="home" />
      </div>
      <footer className="flex items-center justify-center bg-gray-500 text-white p-4 text-center">
        <p>&copy; 2025 ポートフォリオ</p>
      </footer>
    </div>
  );
};

export default LoginPage;