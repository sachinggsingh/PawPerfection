import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export const PaidCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      const response = await api.get("/courses/purchased"); 
      // 👆 make sure your backend has this endpoint
      if (response.data.success) {
        setCourses(response.data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="text-center text-gray-500 py-6">
        You haven’t purchased any courses yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Purchased Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border"
          >
            <img
              src={course.thumbnail || "/default-course.jpg"}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-gray-600 text-sm">{course.description?.slice(0, 80)}...</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Purchased on {new Date(course.purchasedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => window.location.href = `/courses/${course._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
