import React, { useState } from "react";
import { Book, Calendar, Check, FileText, X ,IndianRupee} from "lucide-react";

const CourseCard = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false); // Fix: Corrected state initialization

  return (
    <div className="relative bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-2xl drop-shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 overflow-hidden group">
      <div className="p-6 space-y-5 relative">
        <div className="absolute top-0 right-0 w-32 h-32  rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-purple-500/50 transition-all duration-500"></div>
        <CourseHeader
          week={course.week}
          price={course.price}
          title={course.title}
        />
        <CourseContent tasks={course.task} />
        <EnrollButton onClick={() => setIsOpen(true)} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full h-full max-h-full overflow-y-auto bg-white p-6 shadow-xl animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Course Details
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Course Title */}
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              {course.title}
            </h3>

            {/* Week and Price */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Week {course.week}</span>
              </div>
              <span className="text-lg font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full shadow-sm">
                ₹{course.price}
              </span>
            </div>

            {/* Tasks */}
            <div className="mb-4">
              <p className="text-gray-700 font-semibold flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>Activities</span>
              </p>
              <ul className="space-y-2 text-gray-600 ml-2 list-disc list-inside">
                {course.task.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>

            {/* Resources (if any) */}
            {/* {course.resources && course.resources.length > 0 && (
              <div>
                <p className="text-gray-700 font-semibold flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Resources</span>
                </p>
                <ul className="space-y-2 text-gray-600 ml-2 list-disc list-inside">
                  {course.resources.map((res, index) => (
                    <li key={index}>{res}</li>
                  ))}
                </ul>
                </div>
                )} */}
                {/* <button
                  className="group cursor-pointer w-full px-4 py-3 mt-2 text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  type="button"
                >
                  Pay <IndianRupee />{course.price}
                </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

const CourseHeader = ({ week, price, title }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h3 className="text-xl font-semibold text-gray-800">Week {week}</h3>
      </div>
      <span className="inline-block px-4 py-1.5 text-sm font-medium text-purple-700 bg-purple-100 rounded-full shadow-sm">
        ₹{price}
      </span>
    </div>
    <h4 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3">
      {title}
    </h4>
  </div>
);

const CourseContent = ({ tasks }) => (
  <div className="space-y-4">
    <TasksList tasks={tasks} />
  </div>
);

const TasksList = ({ tasks }) => (
  <div className="flex flex-col gap-3">
    <p className="text-gray-700 font-semibold flex items-center gap-2">
      <Check className="w-4 h-4 text-green-600" />
      <span>Activities</span>
    </p>
    <ul className="space-y-2 text-gray-600 ml-2">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></span>
          <span>{task}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EnrollButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group cursor-pointer w-full px-4 py-3 mt-2 text-white bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
  >
    <Book className="w-5 h-5 group-hover:animate-bounce" />
    <span className="font-medium">Enroll Now</span>
  </button>
);

export default CourseCard;
