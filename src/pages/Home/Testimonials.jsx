import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-14">
          <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            What Students Say
          </span>
        </h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <p className="italic text-gray-700 mb-6 leading-relaxed">
              “EduPulse boosted my grades and confidence in exams.”
            </p>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-lg mb-3">
                A
              </div>
              <h4 className="font-semibold text-gray-800">Ayesha</h4>
              <span className="text-sm text-gray-500">Class 10</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <p className="italic text-gray-700 mb-6 leading-relaxed">
              “The tutors explain tough concepts very easily.”
            </p>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-3">
                R
              </div>
              <h4 className="font-semibold text-gray-800">Rahim</h4>
              <span className="text-sm text-gray-500">University</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <p className="italic text-gray-700 mb-6 leading-relaxed">
              “Group study sessions kept me motivated all semester.”
            </p>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-lg mb-3">
                S
              </div>
              <h4 className="font-semibold text-gray-800">Shila</h4>
              <span className="text-sm text-gray-500">HSC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
