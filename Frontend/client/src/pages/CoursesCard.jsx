
import React from 'react';
import { Book, Calendar, Check, FileText } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md rounded-2xl drop-shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 overflow-hidden group">
      <div className="p-6 space-y-5 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
        <CourseHeader week={course.week} price={course.price} title={course.title} />
        <CourseContent tasks={course.task} resources={course.resources} />
        <EnrollButton />
      </div>
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
    <h4 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3">{title}</h4>
  </div>
);

const CourseContent = ({ tasks, resources }) => (
  <div className="space-y-4">
    <TasksList tasks={tasks} />
    {resources && resources.length > 0 && <ResourcesList resources={resources} />}
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

const ResourcesList = ({ resources }) => (
  <div className="flex flex-col gap-3">
    <p className="text-gray-700 font-semibold flex items-center gap-2">
      <FileText className="w-4 h-4 text-blue-600" />
      <span>Resources</span>
    </p>
    <ul className="space-y-2 text-gray-600 ml-2">
      {resources.map((resource, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
          <span>{resource}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EnrollButton = () => (
  <button className="w-full px-4 py-3 mt-2 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
    <Book className="w-5 h-5" />
    <span className="font-medium">Enroll Now</span>
  </button>
);

export default CourseCard;