import React from 'react';

const LogoCarousel = () => {
  // Array of partner logos (using placeholder URLs - replace with actual logos)
  const partnerLogos = [
    "/images/Centenary.jpg",
    "/images/holysee.png",
    "/images/airtel.png",
    "/images/caritas.png",
    "/images/mtn.jpeg",
    "/images/undp.png",
    "/images/bou.png",
    "/images/dpf.png",
    "/images/fia.png",
    "/images/wcc.jpeg"
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
            We collaborate with leading organizations to better serve our members.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative w-full mx-auto max-w-4xl opacity-90 overflow-hidden 
                        before:content-[''] before:absolute before:inset-0 before:w-full 
                        before:bg-[linear-gradient(to_right,white_0%,transparent_10%,transparent_90%,white_100%)] 
                        before:z-10 flex flex-nowrap px-5 lg:px-12 justify-center gap-4 lg:gap-8">
          
          {/* Animated scrolling container */}
          <div className="flex animate-scroll gap-8 py-4">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt={`Partner ${index + 1}`} 
                  className="h-12 w-auto filter invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {partnerLogos.map((logo, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0">
                <img 
                  src={logo} 
                  alt={`Partner ${index + 1}`} 
                  className="h-12 w-auto filter invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 2rem)); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel;