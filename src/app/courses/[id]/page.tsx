"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Plus, FileText, Trash2, Edit3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Topic = {
  id: string;
  title: string;
  createdAt: string;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  topics: Topic[];
};

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`);
      if (!res.ok) throw new Error("Course not found");
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Failed to fetch course", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const deleteTopic = async (topicId: string) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    
    try {
      await fetch(`/api/topics/${topicId}`, { method: "DELETE" });
      setCourse((prev) => prev ? {
        ...prev,
        topics: prev.topics.filter(t => t.id !== topicId)
      } : null);
    } catch (error) {
      console.error("Failed to delete topic", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
        <Link href="/courses" className="text-blue-400 hover:text-blue-300">Return to Courses</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-10 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
              Course
            </span>
            <span className="text-slate-400 text-sm">
              Created {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
          {course.description && (
            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
              {course.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          Curriculum Topics
        </h2>
        <Link
          href={`/courses/${course.id}/topics/new`}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors border border-slate-700"
        >
          <Plus className="w-4 h-4" />
          Add Topic
        </Link>
      </div>

      {course.topics.length === 0 ? (
        <div className="border border-dashed border-slate-700 rounded-3xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No topics yet</h3>
          <p className="text-slate-400 mb-6">Start building your curriculum by adding the first topic.</p>
          <Link
            href={`/courses/${course.id}/topics/new`}
            className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Topic
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {course.topics.map((topic, index) => (
            <div key={topic.id} className="glass-card rounded-2xl p-6 flex items-center justify-between group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                  {index + 1}
                </div>
                <div>
                  <Link href={`/courses/${course.id}/topics/${topic.id}`} className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                    {topic.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-1">
                    Added {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link 
                  href={`/courses/${course.id}/topics/${topic.id}`}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  title="View Topic & Gen Quiz"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => deleteTopic(topic.id)}
                  className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Delete Topic"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
