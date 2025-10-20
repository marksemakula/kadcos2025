import React from 'react';

const BoardChairMessage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-arthelo mb-6">
              Board Chair's Message
            </h1>
            <p className="text-xl lg:text-2xl font-marcellus text-primary">
              Leadership Vision for KADCOS
            </p>
          </div>
        </div>
      </section>

      {/* Message Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Board Chair Photo and Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/Mrs.Nseerikomawa Josephine.jpeg" 
                    alt="Mrs. Nseerikomawa Josephine - Board Chairperson"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-secondary font-marcellus mb-2">
                  Mrs. Nseerikomawa Josephine
                </h2>
                <p className="text-lg text-gray-600 font-marcellus mb-4">
                  Board Chairperson
                </p>
                <p className="text-gray-700 font-marcellus">
                  KADCOS Lubaga Cooperative Society Ltd.
                </p>
              </div>
            </div>

            {/* Message Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 font-marcellus mb-6 text-justify">
                Dear Members and Partners,
              </p>
              
              <p className="text-gray-700 font-marcellus mb-6 text-justify">
                It is with great pleasure and a deep sense of responsibility that I address you as 
                the Board Chair of KADCOS Lubaga Cooperative Society Ltd. Our journey since 2007 
                has been marked by steady growth, resilience, and an unwavering commitment to 
                financial empowerment through cooperative effort.
              </p>

              <p className="text-gray-700 font-marcellus mb-6 text-justify">
                The Board of Directors remains dedicated to ensuring that KADCOS continues to be 
                a beacon of hope and opportunity for our members. We are committed to maintaining 
                the highest standards of governance, transparency, and accountability in all our 
                operations.
              </p>

              <p className="text-gray-700 font-marcellus mb-6 text-justify">
                Our strategic focus remains on enhancing member value through innovative financial 
                products, expanding our service reach, and strengthening our partnerships. The 
                Board is actively working to position KADCOS for sustainable growth while 
                preserving our core cooperative values.
              </p>

              <p className="text-gray-700 font-marcellus mb-6 text-justify">
                I extend my sincere gratitude to our members for their continued trust and 
                participation, to our dedicated staff for their commitment, and to our partners 
                for their invaluable support. Together, we are building a stronger, more 
                prosperous cooperative that serves as a model for community-based financial 
                empowerment.
              </p>

              <div className="border-t pt-6 mt-8">
                <p className="text-gray-700 font-marcellus mb-2 text-justify">
                  With warm regards,
                </p>
                <p className="text-secondary font-bold font-marcellus">
                  Mrs. Nseerikomawa Josephine
                </p>
                <p className="text-gray-600 font-marcellus">
                  Board Chairperson
                </p>
                <p className="text-gray-600 font-marcellus">
                  KADCOS Lubaga Cooperative Society Ltd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardChairMessage;