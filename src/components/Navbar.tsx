import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">CourseCraft<span className="text-blue-500">.ai</span></span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/courses" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/courses/new" className="text-sm font-medium px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Create Course</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
