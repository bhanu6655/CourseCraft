import { Globe, Link2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-400 text-sm">
          Built for House of Edtech Fullstack Developer Assignment
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-slate-300 font-medium">G Bhanuprakash</span>
          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4" />
            GitHub
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <Link2 className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
