import { useState } from 'react';
import { Play, BookOpen, Clock, Users, Star, Award, ChevronRight, Bookmark } from 'lucide-react';

export default function CourseCard({ course }) {
  const [isBookmarked, setIsBookmarked] = useState(course?.isBookmarked || false);
  
  // Default values for course if not provided
  const {
    title = "Complete Web Development Bootcamp",
    description = "Master HTML, CSS, JavaScript, React and Node.js from scratch with practical projects.",
    thumbnailUrl = "/api/placeholder/640/360",
    instructorName = "Professor Smith",
    instructorAvatar = "/api/placeholder/40/40",
    totalDuration = "38 hours",
    totalLessons = 125,
    enrolledStudents = 1250,
    level = "Beginner",
    rating = 4.8,
    reviewCount = 356,
    price = "$49.99",
    salePrice = "$19.99",
    onSale = true,
    featured = false,
    category = "Web Development",
    tags = ["HTML", "CSS", "JavaScript", "React"]
  } = course || {};

  const toggleBookmark = () => setIsBookmarked(prev => !prev);
  
  return (
    <div className="flex flex-col bg-white rounded-xl overflow-hidden max-w-md shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-0 bg-blue-600 text-white py-1 px-3 text-xs font-bold uppercase z-20 rounded-r-full shadow-md">
          Featured
        </div>
      )}
      
      {/* Thumbnail section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 z-10 pointer-events-none" />
        
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Category pill */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full z-20 font-medium">
          {category}
        </div>
        
        {/* Bookmark button */}
        <button 
          onClick={toggleBookmark}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 p-1.5 rounded-full z-20 hover:bg-white transition-colors"
        >
          <Bookmark 
            size={16} 
            fill={isBookmarked ? "currentColor" : "none"} 
            className={`${isBookmarked ? "text-blue-500" : "text-gray-600"}`}
          />
        </button>
        
        {/* Course info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-20">
          <h3 className="font-bold text-lg line-clamp-2 mb-2">{title}</h3>
          
          {/* Instructor info */}
          <div className="flex items-center">
            <img 
              src={instructorAvatar} 
              alt={instructorName}
              className="w-6 h-6 rounded-full mr-2 border border-white/30"
            />
            <span className="text-sm text-white/90">{instructorName}</span>
          </div>
        </div>
        
        {/* Preview button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20 bg-black/30 backdrop-blur-sm">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg">
            <Play size={18} />
            <span>Preview Course</span>
          </button>
        </div>
      </div>
      
      {/* Course details */}
      <div className="p-4">
        {/* Rating and reviews */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{reviewCount} reviews</span>
          <span className="mx-2 text-gray-300">•</span>
          <div className="flex items-center text-xs text-gray-500">
            <Award size={12} className="mr-1" />
            <span>{level}</span>
          </div>
        </div>
        
        {/* Course description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        {/* Course stats */}
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{totalDuration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{enrolledStudents.toLocaleString()} students</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            {onSale ? (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-blue-600">{salePrice}</span>
                <span className="text-sm text-gray-400 line-through ml-2">{price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-blue-600">{price}</span>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center transition-colors">
            View Course
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}