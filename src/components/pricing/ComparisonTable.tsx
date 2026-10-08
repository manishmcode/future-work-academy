import React from 'react';
import { Check } from 'lucide-react';

const comparisonData = [
  {
    category: "Course Access",
    rows: [
      { feature: "Lifestyle Courses", basic: true, standard: true, premium: true },
      { feature: "Business & Tech Courses", basic: false, standard: true, premium: true },
      { feature: "Downloadable Resources", basic: true, standard: true, premium: true }
    ]
  },
  {
    category: "Live Instruction",
    rows: [
      { feature: "Live Q&A Sessions", basic: false, standard: false, premium: true },
      { feature: "Past Class Archives", basic: false, standard: false, premium: true },
      { feature: "1-on-1 Mentorship", basic: false, standard: false, premium: true }
    ]
  }
];

export const ComparisonTable = () => (
  <section className="py-24 relative overflow-visible">
    
    {/* Ambient Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-400/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-[2.5rem] sm:text-[3.25rem] font-black text-slate-900 mb-5 tracking-tight leading-none">
          Compare in Detail
        </h2>
        <p className="text-[17px] text-slate-500 font-medium max-w-2xl mx-auto">
          Find the exact features you need to reach your goals. No hidden fees, just clear value.
        </p>
      </div>

      {/* Table Container - Removed overflow-hidden so badge doesn't clip */}
      <div className="bg-white border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] relative z-10">
        
        {/* Added overflow-x-auto to an inner wrapper, but padded the top so badge fits */}
        <div className="overflow-x-auto rounded-[2rem] pt-4 -mt-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th scope="col" className="p-8 bg-white border-b border-slate-100 text-[12px] text-slate-400 font-bold uppercase tracking-widest w-[40%] rounded-tl-[2rem]">
                  Feature Breakdown
                </th>
                <th scope="col" className="p-8 bg-white border-b border-slate-100 text-center font-black text-slate-900 text-[18px] w-[20%]">
                  Basic
                </th>
                <th scope="col" className="p-8 bg-white border-b border-slate-100 text-center font-black text-slate-900 text-[18px] w-[20%]">
                  Standard
                </th>
                {/* Premium Header */}
                <th scope="col" className="p-8 bg-pink-50/40 border-b border-pink-100 border-l border-r border-pink-100/50 text-center w-[25%] relative rounded-tr-[2rem]">
                  
                  {/* Top Orange Highlight Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-tr-[2rem]"></div>
                  
                  {/* Unclipped Badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-pink-600/20 whitespace-nowrap z-20">
                    Recommended
                  </div>
                  
                  <span className="font-black text-pink-600 text-[18px]">Premium</span>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {comparisonData.map((category, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td colSpan={4} className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50 pt-8 border-t border-slate-100 first:border-0">
                      {category.category}
                    </td>
                  </tr>
                  
                  {category.rows.map((row, rIdx) => {
                    // Check if this is the very last row in the whole table to apply bottom rounding
                    const isLastRow = idx === comparisonData.length - 1 && rIdx === category.rows.length - 1;

                    return (
                      <tr key={rIdx} className="group transition-colors duration-300 hover:bg-slate-50/50">
                        <td className={`px-8 py-5 text-slate-700 font-medium text-[15px] border-slate-100/60 ${isLastRow ? '' : 'border-b'} ${isLastRow ? 'rounded-bl-[2rem]' : ''}`}>
                          <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-pink-600">
                            {row.feature}
                          </span>
                        </td>
                        <td className={`px-8 py-5 text-center border-slate-100/60 ${isLastRow ? '' : 'border-b'}`}>
                          {row.basic ? (
                            <div className="w-7 h-7 mx-auto rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                              <Check className="w-3.5 h-3.5 text-slate-500" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-3 h-[2px] bg-slate-200 mx-auto rounded-full"></div>
                          )}
                        </td>
                        <td className={`px-8 py-5 text-center border-slate-100/60 ${isLastRow ? '' : 'border-b'}`}>
                          {row.standard ? (
                            <div className="w-7 h-7 mx-auto rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                              <Check className="w-3.5 h-3.5 text-slate-500" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-3 h-[2px] bg-slate-200 mx-auto rounded-full"></div>
                          )}
                        </td>
                        
                        {/* Premium Column Cell */}
                        <td className={`px-8 py-5 text-center bg-pink-50/20 border-l border-r border-pink-100/50 group-hover:bg-pink-50/50 transition-colors duration-300 ${isLastRow ? 'border-b-0 rounded-br-[2rem]' : 'border-b border-b-pink-100/50'}`}>
                          {row.premium ? (
                            <div className="w-8 h-8 mx-auto rounded-full bg-pink-100 flex items-center justify-center shadow-sm shadow-pink-200/50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white text-pink-600">
                              <Check className="w-4 h-4 currentColor" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-3 h-[2px] bg-pink-200 mx-auto rounded-full"></div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </section>
);

export default ComparisonTable;