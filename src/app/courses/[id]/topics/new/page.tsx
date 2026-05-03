"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function NewTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id: courseId } = unwrappedParams;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    courseId: courseId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create topic");
      
      router.push(`/courses/${courseId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Course
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Topic</h1>
        <p className="text-slate-400 mb-8">Add learning materials and content to your curriculum.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
              Topic Title
            </label>
            <input
              type="text"
              id="title"
              required
              placeholder="e.g. React Server Components"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
              Topic Content <span className="text-slate-500 font-normal">(Notes, links, or text)</span>
            </label>
            <textarea
               id="content"
               rows={8}
               placeholder="Write your topic notes here. This content will be used to generate AI quizzes..."
               className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
               value={formData.content}
               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4">
            <Link href={`/courses/${courseId}`} className="text-slate-400 hover:text-white font-medium px-4 py-2">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {loading ? "Saving..." : "Save Topic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
