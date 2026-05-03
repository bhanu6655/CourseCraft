import Link from "next/link";
import { ArrowRight, Sparkles, Layout, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate pt-14">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-blue-400 ring-1 ring-blue-500/20 hover:ring-blue-500/40 glass">
                Announcing AI-Powered Quizzes <Link href="/courses" className="font-semibold text-blue-500"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Create the Future of Learning with <span className="gradient-text">CourseCraft.ai</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 mb-10">
              The ultimate platform for educators. Build comprehensive curriculums, organize modules, and generate AI-powered assessments instantly to elevate student engagement.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link href="/courses" className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/courses/new" className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors">
                Create a Course <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Layout className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Intuitive Builder</h3>
                <p className="text-slate-400">Design your curriculum with a clean, structured interface. Manage topics and modules effortlessly.</p>
              </div>
              
              <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <BrainCircuit className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI Integration</h3>
                <p className="text-slate-400">Leverage Google Gemini to automatically generate context-aware quizzes and study materials.</p>
              </div>
              
              <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Premium Experience</h3>
                <p className="text-slate-400">A beautiful, fast, and responsive user interface designed with modern web standards in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}
