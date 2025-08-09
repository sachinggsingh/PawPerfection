import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/courseSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CourseCard from "./CoursesCard";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const CoursesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CoursesContent />
      </main>
      <Footer />
    </div>
  );
};

const CoursesContent = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!courses || !Array.isArray(courses)) return <NoCourses />;

  return (
    <div className="container mx-auto px-4 py-8 mt-8 mb-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Training Programs</h1>
      </div>
      <CourseGrid courses={courses} />
    </div>
  );
};

const ErrorMessage = ({ error }) => (
  <div className="container mx-auto px-4 py-8 mt-16">
    <p className="text-red-500 text-center">{error}</p>
  </div>
);

const NoCourses = () => (
  <div className="container mx-auto px-4 py-8 mt-16">
    <p className="text-yellow-500 text-center">No courses available</p>
  </div>
);

const CourseGrid = ({ courses }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses.map((course) => (
      <CourseCard key={course._id} course={course} />
    ))}
  </div>
);

export default CoursesPage;