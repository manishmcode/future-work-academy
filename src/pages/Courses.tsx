import React from 'react';
import { courses } from '../data/courses';
import { Video } from 'lucide-react';

export const Courses = () => {
  return (
    <div className="bg-white min-h-screen py-24 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-300/20 rounded-full mix-blend-multiply filter blur-[100px] -z-10"></div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-8">
            The Complete <br className="hidden sm:block" />
            <span className="text-slate-400 font-medium">Library.</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-500 mx-auto font-light leading-relaxed">
            Upgrade your skills with our premium, high-definition video courses. Learn the exact strategies used by top solopreneurs and AI professionals.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col group transition-all duration-500 hover:-translate-y-1 relative">
              <div className="p-3">
                <div className="relative h-60 overflow-hidden rounded-[2rem]">
                  <img 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    src={course.image} 
                    alt={course.title} 
                  />
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur text-black font-bold px-3 py-1.5 rounded-xl shadow-sm text-xs uppercase tracking-wider">
                    Self-paced
                  </div>
                </div>
              </div>
              
              <div className="px-8 pt-4 pb-10 flex-1 flex flex-col bg-white">
                <h3 className="text-2xl font-black text-black mb-3 leading-tight">{course.title}</h3>
                <p className="text-slate-500 mb-8 flex-1 text-base leading-relaxed font-light">{course.description}</p>
                
                <div className="pt-6 flex flex-col gap-5">
                  <div className="flex items-center text-sm font-semibold text-slate-500">
                    <Video className="w-4 h-4 mr-2" /> 12 Video Modules
                  </div>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-4 bg-slate-50 text-black font-bold rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black"
                  >
                    View Course Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
