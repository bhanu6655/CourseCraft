"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Plus, ArrowRight, BookOpen, Clock, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Course = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  _count: { topics: number };
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error("API returned non-array:", data);
        setCourses([]);
        alert("Error fetching courses: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Courses</h1>
          <p className="text-slate-400">Manage your curriculums and learning materials.</p>
        </div>
        <Link
          href="/courses/new"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="glass-card rounded-3xl p-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No courses yet</h3>
          <p className="text-slate-400 mb-8 max-w-md">
            Get started by creating your first course curriculum. You can add topics and generate AI quizzes later.
          </p>
          <Link
            href="/courses/new"
            className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-medium transition-colors border border-slate-700"
          >
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group relative block h-full">
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-blue-500/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Book className="w-6 h-6 text-blue-400" />
                  </div>
                  <button 
                    onClick={(e) => deleteCourse(e, course.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow">
                  {course.description || "No description provided."}
                </p>
                
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 border-t border-white/5 pt-4 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{course._count.topics} Topics</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
