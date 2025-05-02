import Link from 'next/link'

export default function Footer() {
    return (      
      <footer className="flex items-center justify-center bg-gray-500 text-white p-4 text-center">
        <p>&copy; 2025 ポートフォリオ</p>
        <p className="ml-20 text-gray-400">
          <Link href="../Login">management</Link>
          </p>
      </footer>
      );
  }


  