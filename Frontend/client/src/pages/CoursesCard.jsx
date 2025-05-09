import React, { useEffect } from "react";
import { Book, Clock, DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/courses/courseSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const CoursesCard = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }
  if (!courses || !Array.isArray(courses)) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <p className="text-yellow-500 text-center">No courses available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white/30 backdrop-blur-md rounded-xl drop-shadow-lg hover:shadow-2xl transition-all duration-100 border border-white/20 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Week {course.week}
                  </h3>
                  <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                    ₹{course.price}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-700">
                  {course.title}
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-600 font-medium">Tasks:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                    {course.task.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>

                {course.resources && course.resources.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-gray-600 font-medium">Resources:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                      {course.resources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                    {/* <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                          {course.resources.map((resource, index) => (
                            <li key={index}>
                              <a href={resource} target="_blank" rel="noopener noreferrer">
                                {resource}
                              </a>
                            </li>
                          ))}
                        </ul> */}
                  </div>
                )}
              </div>

              <button className="w-full px-4 py-2 mt-4 text-white bg-purple-600/80 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm">
                <Book className="w-5 h-5" />
                <span>Enroll Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CoursesCard;
