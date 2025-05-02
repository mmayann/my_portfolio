"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';

interface LoginComponentProps {
  onLoginSuccess?: () => void; 
  onLogout?: () => void; 
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        alert("メールアドレスとパスワードを入力してください。");
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      await router.push('/Edit');

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error(error);
      alert(`ログインに失敗しました: ${(error instanceof Error ? error.message : '不明なエラー')}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error(error);
      alert(`ログアウトに失敗しました: ${(error instanceof Error ? error.message : '不明なエラー')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-md h-auto bg-slate-100 shadow-md rounded-3xl px-4">
      <div className="flex flex-col items-center w-full max-h-full mt-3 p-4">
        <input
          className="py-2 mb-10 border-b border-gray-600 focus:outline-none focus:border-blue-500 bg-slate-100"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="py-2 mb-10 border-b border-gray-600 focus:outline-none focus:border-blue-500 bg-slate-100"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center justify-between max-w-xl mx-15 px-7 pb-5 ">
        <button
          onClick={handleLogin}
          className="mr-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
          disabled={loading}
        >
          {loading ? "Login..." : "Login"}
        </button>
        <button
          onClick={handleLogout}
          className="ml-4 bg-slate-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded transition-all duration-200 active:scale-95"
          disabled={loading}
        >
          {loading ? "Logout..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;