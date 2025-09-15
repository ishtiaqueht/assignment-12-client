import React from "react";
import { BookOpen, Users, Clock } from "lucide-react";

const WhyChoose = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Why Choose <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">EduPulse?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          We make learning easier, interactive, and effective for every student.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <BookOpen size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Tutors</h3>
            <p className="text-gray-600">
              Learn from verified mentors with structured guidance and real
              experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Users size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Interactive Sessions</h3>
            <p className="text-gray-600">
              Join real-time group study & discussions that make learning fun
              and engaging.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <Clock size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Learning</h3>
            <p className="text-gray-600">
              Access anytime, anywhere — learn at your own pace with ease and
              comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
