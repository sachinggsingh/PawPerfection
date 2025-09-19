import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseById,
  clearCurrentCourse,
} from "../features/courses/courseSlice";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Clock,
  ArrowLeft,
  Link as LinkIcon,
} from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCourse, courseLoading, error } = useSelector(
    (state) => state.course
  );

  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [courseId, dispatch]);

  useEffect(() => {
    if (currentCourse && currentCourse.task) {
      const transformedLessons = currentCourse.task.map((task, index) => ({
        id: index + 1,
        title: task,
        duration: "15 min",
        content: `This lesson covers: ${task}. Follow the instructions carefully and practice with your dog.`,
        completed: false,
      }));
      setLessons(transformedLessons);
    }
  }, [currentCourse]);

  const markCompleted = (lessonId) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, completed: !lesson.completed }
          : lesson
      )
    );
  };

  const goToPrevious = () => {
    if (currentLesson > 0) setCurrentLesson(currentLesson - 1);
  };

  const goToNext = () => {
    if (currentLesson < lessons.length - 1) setCurrentLesson(currentLesson + 1);
  };

  const goToLesson = (index) => {
    setCurrentLesson(index);
  };

  const handleBackToCourses = () => {
    navigate("/course");
  };

  if (courseLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen mb-4 flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error Loading Course
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleBackToCourses}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!currentCourse) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen mt-4 flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Course Not Found
            </h2>
            <button
              onClick={handleBackToCourses}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-12 flex bg-white font-sans">
        {/* Main Content */}

        {/* yaha se edit karna hai screeen set karni hai */}
        <div className="flex-1 flex flex-col max-w-5xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToCourses}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Back to Courses"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={goToPrevious}
                disabled={currentLesson === 0}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold">{currentCourse.title}</h1>
                <p className="text-gray-600">
                  Week {currentCourse.week} • {lessons[currentLesson]?.title}
                </p>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-100 rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Lesson {lessons[currentLesson]?.id}:{" "}
                  {lessons[currentLesson]?.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {lessons[currentLesson]?.content}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} /> {lessons[currentLesson]?.duration}
                </p>
              </div>

              {/* Resources */}
              {currentCourse.resources && currentCourse.resources.length > 0 && (
                <div className="bg-white border rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-3">Resources</h3>
                  <ul className="space-y-2">
                    {currentCourse.resources.map((res, index) => (
                      <li key={index}>
                        <a
                          href={res}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <LinkIcon size={16} />
                          {res}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="p-6 border-t border-gray-300 bg-white">
            <div className="max-w-4xl mx-auto flex justify-between items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentLesson === 0}
                className={`cursor-pointer flex items-center gap-2 px-4 py-2 border transition-all ${
                  currentLesson === 0
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                {lessons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToLesson(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentLesson
                        ? "bg-black"
                        : lessons[index].completed
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                disabled={currentLesson === lessons.length - 1}
                className={`cursor-pointer flex items-center gap-2 px-4 py-2 border transition-all ${
                  currentLesson === lessons.length - 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => markCompleted(lessons[currentLesson]?.id)}
                disabled={!lessons[currentLesson]}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {lessons[currentLesson]?.completed
                  ? "Undo Complete"
                  : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-[370px] overflow-y-auto border-l border-gray-200">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Your Lessons</h3>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => goToLesson(index)}
                  className={`p-3 border cursor-pointer transition-all ${
                    index === currentLesson
                      ? "border-black border-2"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markCompleted(lesson.id);
                      }}
                      className="mt-0.5"
                    >
                      {lesson.completed ? (
                        <CheckCircle className="text-green-600" size={18} />
                      ) : (
                        <Circle className="text-gray-400" size={18} />
                      )}
                    </button>
                    <div className="flex-1">
                      <h2 className="font-medium text-base leading-tight">
                        {lesson.title}
                      </h2>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock size={10} />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseViewer;
