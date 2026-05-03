"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Loader2, FileText, CheckCircle2, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Topic = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  course: {
    title: string;
  };
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export default function TopicPage({ params }: { params: Promise<{ id: string, topicId: string }> }) {
  const unwrappedParams = use(params);
  const { id: courseId, topicId } = unwrappedParams;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  
  // AI Quiz state
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const fetchTopic = async () => {
    try {
      const res = await fetch(`/api/topics/${topicId}`);
      if (!res.ok) throw new Error("Topic not found");
      const data = await res.json();
      setTopic(data);
    } catch (error) {
      console.error("Failed to fetch topic", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  const generateQuiz = async () => {
    if (!topic) return;
    setGeneratingQuiz(true);
    setQuiz(null);
    setShowResults(false);
    setSelectedAnswers({});
    
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicTitle: topic.title,
          topicContent: topic.content,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to generate quiz");
      const data = await res.json();
      setQuiz(data);
    } catch (error) {
      console.error("Quiz generation error", error);
      alert("Failed to generate quiz. Please check your Gemini API key.");
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const submitQuiz = () => {
    if (!quiz) return;
    let newScore = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Topic Not Found</h1>
        <Link href={`/courses/${courseId}`} className="text-blue-400 hover:text-blue-300">Return to Course</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to {topic.course.title}
      </Link>

      <div className="glass-card rounded-3xl p-8 sm:p-10 mb-10">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
            Topic
          </span>
          <span className="text-slate-400 text-sm">
            Added {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-6">{topic.title}</h1>
        
        <div className="prose prose-invert max-w-none text-slate-300">
          {topic.content ? (
            <div className="whitespace-pre-wrap">{topic.content}</div>
          ) : (
            <p className="italic text-slate-500">No content provided for this topic.</p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-purple-500" />
              AI Assessment
            </h2>
            <p className="text-slate-400 text-sm mt-1">Generate a quiz based on the topic content using Gemini AI.</p>
          </div>
          
          <button
            onClick={generateQuiz}
            disabled={generatingQuiz}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20 w-full sm:w-auto justify-center"
          >
            {generatingQuiz ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
            {generatingQuiz ? "Generating AI Quiz..." : "Generate Quiz"}
          </button>
        </div>

        {generatingQuiz && (
          <div className="glass-card rounded-2xl p-12 text-center border border-purple-500/30">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Analyzing content...</h3>
            <p className="text-slate-400">Our AI is reading your topic and crafting the perfect questions.</p>
          </div>
        )}

        {quiz && !generatingQuiz && (
          <div className="space-y-8">
            {showResults && (
              <div className={`p-6 rounded-2xl border ${score === quiz.length ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/30'} flex items-center justify-between`}>
                <div>
                  <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
                  <p className="text-slate-300 mt-1">You scored {score} out of {quiz.length}</p>
                </div>
                <div className={`text-4xl font-bold ${score === quiz.length ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {Math.round((score / quiz.length) * 100)}%
                </div>
              </div>
            )}
            
            {quiz.map((q, qIndex) => (
              <div key={qIndex} className={`glass-card rounded-2xl p-6 ${showResults ? (selectedAnswers[qIndex] === q.correctAnswer ? 'border-emerald-500/50' : 'border-red-500/50') : ''}`}>
                <h3 className="text-lg font-medium text-white mb-4 flex items-start gap-3">
                  <span className="bg-slate-800 text-slate-400 text-sm w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                    {qIndex + 1}
                  </span>
                  {q.question}
                </h3>
                
                <div className="space-y-3 pl-9">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = selectedAnswers[qIndex] === oIndex;
                    const isCorrect = showResults && oIndex === q.correctAnswer;
                    const isWrongSelected = showResults && isSelected && oIndex !== q.correctAnswer;
                    
                    let btnClass = "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ";
                    
                    if (showResults) {
                      if (isCorrect) btnClass += "bg-emerald-500/10 border-emerald-500/50 text-emerald-100";
                      else if (isWrongSelected) btnClass += "bg-red-500/10 border-red-500/50 text-red-100";
                      else btnClass += "bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-50";
                    } else {
                      if (isSelected) btnClass += "bg-blue-500/10 border-blue-500 text-white";
                      else btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600";
                    }

                    return (
                      <button
                        key={oIndex}
                        disabled={showResults}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIndex]: oIndex })}
                        className={btnClass}
                      >
                        <span>{opt}</span>
                        {showResults && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                        {showResults && isWrongSelected && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                
                {showResults && (
                  <div className="mt-6 pl-9">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1 block">Explanation</span>
                      <p className="text-slate-300">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {!showResults && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(selectedAnswers).length < quiz.length}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
                >
                  Submit Quiz
                </button>
              </div>
            )}
            
            {showResults && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={generateQuiz}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors border border-slate-700"
                >
                  Generate New Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
