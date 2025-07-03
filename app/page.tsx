'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';  // Import Next.js Image

// Hero
function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setVideoLoaded(true);
    video.addEventListener('loadeddata', handleLoadedData);

    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.autoplay = true;
    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        const playOnInteraction = () => {
          video.play().finally(() => {
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
          });
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
        document.addEventListener('keydown', playOnInteraction);
      }
    };
    playVideo();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [mounted]);

  return (
    <div className="min-h-screen bg-[#eae9e0] flex flex-col">
      <div className="px-4 sm:px-8 md:px-16 pt-4 sm:pt-6 md:pt-8">
        {/* Header with Logo and Text */}
        <header className="flex items-center justify-start pb-4">
          <div className="flex items-center">
            {/* Logo - Fixed Mobile Sizing */}
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Dr. Serena Blake Psychology Logo"
                width={300}
                height={96}
                className="object-contain"
                style={{
                  minHeight: '64px',
                  minWidth: '150px',
                  maxWidth: '300px',
                }}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col pt-4 pb-8 sm:pb-16 md:pb-20">
          <div className="w-full max-w-none mx-auto overflow-hidden shadow-2xl rounded-lg">
            <div className="relative aspect-[9/16] sm:aspect-[4/5] md:aspect-[3/2] lg:aspect-[1.9/1] bg-gray-200 min-h-[70vh] sm:min-h-[60vh] md:min-h-0">
              {mounted && (
                <video
                  ref={videoRef}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="auto"
                  className={`w-full h-full object-cover transition-opacity duration-1000 rounded-lg ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <source src="/cloud.mp4" type="video/mp4" />
                  <source src="/cloud.mp4#t=0.1" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-lg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
                <h2 className="font-serif text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center drop-shadow-2xl mb-4 sm:mb-6 md:mb-8 leading-tight max-w-4xl">
                  <span>Where Healing Begins and </span>
                  <br className="hidden sm:block" />
                  <span className="mt-2 sm:mt-4 md:mt-6 inline-block"> Growth Flourishes</span>
                </h2>
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mx-auto w-full max-w-5xl mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-12 drop-shadow-lg font-serif opacity-95 leading-relaxed text-center px-2 sm:px-0">
                  Providing individual psychotherapy for adults via telehealth in Michigan and PSYPACT-participating states.
                </p>

                <a
                  href="#contact"
                  className="inline-block px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full bg-[#bfc7c2] text-[#2B3A2E] font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:bg-[#dbe2dd] hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ letterSpacing: '0.03em' }}
                >
                  SCHEDULE A CONSULTATION
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// About
function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16"
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Title */}
              <div
                className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-600 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2
                  className="text-2xl sm:text-3xl text-[#A4926B] font-normal leading-tight text-center"
                  style={{
                    fontFamily: 'freight-display-pro, serif',
                    letterSpacing: '-0.02em',
                    fontWeight: '400',
                  }}
                >
                  About Dr. Serena Blake
                </h2>
              </div>

              {/* Image */}
              <div
                className={`relative transition-all duration-800 ease-out delay-200 mb-8 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative overflow-hidden w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-[2/3] mx-auto">
                  <Image
                    src="/girl.jpg"
                    alt="Dr. Serena Blake"
                    width={400}
                    height={600}
                    className="rounded-lg shadow-md object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`space-y-4 sm:space-y-6 md:space-y-8 transition-all duration-600 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div
                  className="space-y-4 sm:space-y-6 text-[#A4926B] leading-[1.6]"
                  style={{
                    fontFamily: 'freight-sans-pro, sans-serif',
                    fontSize: '14px',
                    fontWeight: '300',
                    letterSpacing: '0.3px',
                  }}
                >
                  <p className="text-sm sm:text-base">
                    Finding time and opportunities to care for ourselves can be incredibly challenging in today&apos;s busy and demanding world. I believe therapy offers a dedicated space for self-care, providing the support and tools needed to improve this essential practice. Therapy can help individuals identify and clarify their goals, values, and the various elements that contribute to their well-being, recognizing that these aspects vary from person to person.
                  </p>

                  <p className="text-sm sm:text-base">
                    I am dedicated to supporting this journey by offering active listening, psychological knowledge, empathy, compassion, and insights into behavioral patterns and tendencies. I hold a PsyD degree in Clinical Psychology with eight years of experience and over 500 client sessions. My experience spans therapy and psychological assessment in various settings, helping clients overcome anxiety, strengthen relationships, and heal from trauma.
                  </p>

                  <p className="text-sm sm:text-base">
                    I am committed to creating a safe, supportive space for you to thrive through evidence-based approaches and compassionate, personalized care.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-24 xl:gap-32 items-start">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Title */}
                  <div
                    className={`transition-all duration-600 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <h2
                      className="text-4xl text-[#A4926B] font-normal leading-tight"
                      style={{
                        fontFamily: 'freight-display-pro, serif',
                        letterSpacing: '-0.02em',
                        fontWeight: '400',
                      }}
                    >
                      About Dr. Serena Blake
                    </h2>
                  </div>

                  {/* Text Content */}
                  <div
                    className={`space-y-8 transition-all duration-600 ease-out ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div
                      className="space-y-6 text-[#A4926B] leading-[1.6]"
                      style={{
                        fontFamily: 'freight-sans-pro, sans-serif',
                        fontSize: '14px',
                        fontWeight: '300',
                        letterSpacing: '0.3px',
                      }}
                    >
                      <p className="text-base">
                        Finding time and opportunities to care for ourselves can be incredibly challenging in today&apos;s busy and demanding world. I believe therapy offers a dedicated space for self-care, providing the support and tools needed to improve this essential practice. Therapy can help individuals identify and clarify their goals, values, and the various elements that contribute to their well-being, recognizing that these aspects vary from person to person.
                      </p>

                      <p className="text-base">
                        I am dedicated to supporting this journey by offering active listening, psychological knowledge, empathy, compassion, and insights into behavioral patterns and tendencies. I hold a PsyD degree in Clinical Psychology with eight years of experience and over 500 client sessions. My experience spans therapy and psychological assessment in various settings, helping clients overcome anxiety, strengthen relationships, and heal from trauma.
                      </p>

                      <p className="text-base">
                        I am committed to creating a safe, supportive space for you to thrive through evidence-based approaches and compassionate, personalized care.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div
                  className={`relative transition-all duration-800 ease-out delay-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative overflow-hidden w-full max-w-[440px] aspect-[2/3] ml-auto">
                    <Image
                      src="/girl.jpg"
                      alt="Dr. Serena Blake"
                      width={440}
                      height={660}
                      className="rounded-lg shadow-md object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// Quote Section
function TherapyQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F3ED] pt-40 pb-24 px-8 md:px-16"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Line */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-[2px] bg-[#A4926B] mb-16 mx-auto"></div>
        </div>

        {/* Main Quote */}
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#A4926B] font-light leading-tight mb-16 mx-auto max-w-4xl"
            style={{
              fontFamily: 'freight-display-pro, serif',
              lineHeight: '1.3',
              letterSpacing: '-0.02em',
            }}
          >
            Therapy can be a space where you invest in yourself—
            <br />
            one of the highest forms of self-care.
          </h2>
        </div>

        {/* Description Text */}
        <div
          className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="text-[#A4926B] leading-[1.8] max-w-4xl mx-auto"
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontSize: '18px',
              fontWeight: '300',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              letterSpacing: '0.3px',
              textRendering: 'optimizeLegibility',
            }}
          >
            <p className="mb-6">
              You may be led to therapy by anxiety, depression, relationship stress, past or recent trauma, grief{' '}
              and loss, self-esteem issues, or challenges with family, parenting, or parental relationships.
            </p>

            <p>
              Whatever the source of your stress, you don&apos;t have to face it alone. Therapy offers you the time{' '}
              and space to work toward wellness and peace.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          className={`transition-all duration-1000 ease-out delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-full h-[2px] bg-[#A4926B] mt-16 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}

// Areas of Focus Section
function AreasOfFocus() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const focusAreas = [
    {
      title: "Anxiety & Stress Management",
      image: "/stress.jpeg",
      description: "Navigate life's pressures with evidence-based techniques for managing anxiety, reducing stress, and developing healthy coping strategies that promote inner calm and resilience."
    },
    {
      title: "Relationship Counseling",
      image: "/Therapist.jpeg",
      description: "Strengthen connections and improve communication patterns in your relationships, whether with partners, family members, or friends, fostering deeper understanding and healthier dynamics."
    },
    {
      title: "Trauma Recovery",
      image: "/therapy.jpeg",
      description: "Heal from past experiences through compassionate, trauma-informed approaches that help process difficult emotions and rebuild a sense of safety, strength, and hope."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[#F5F3ED] py-24 px-8 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-[#A4926B] font-light leading-tight"
            style={{ 
              fontFamily: 'freight-display-pro, serif',
              letterSpacing: '-0.02em'
            }}
          >
            Areas of Focus
          </h2>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {focusAreas.map((area, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${0.2 + index * 0.2}s`
              }}
            >
              {/* Circular Image */}
              <div className="relative mb-8 mx-auto">
                <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto overflow-hidden rounded-full shadow-lg">
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 
                className="text-xl md:text-2xl text-[#A4926B] font-normal mb-6 leading-tight"
                style={{ 
                  fontFamily: 'freight-display-pro, serif',
                  letterSpacing: '-0.01em'
                }}
              >
                {area.title}
              </h3>

              {/* Description */}
              <p 
                className="text-[#A4926B] leading-[1.7] max-w-sm mx-auto"
                style={{ 
                  fontFamily: 'freight-sans-pro, sans-serif', 
                  fontSize: '16px',
                  fontWeight: '300',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  letterSpacing: '0.3px',
                  textRendering: 'optimizeLegibility'
                }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Rates and Insurance Section
// Rates and Insurance Section (Updated with matching background color)
function RatesAndInsurance() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: '#5C7A7A' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <div className={`mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-white font-light leading-tight mb-2"
            style={{ 
              fontFamily: 'freight-display-pro, serif',
              letterSpacing: '-0.02em'
            }}
          >
            Rates and Insurance
          </h2>
        </div>

        {/* Session Fees */}
        <div className={`mb-12 transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="space-y-6">
            <div 
              className="text-white text-xl md:text-2xl font-normal"
              style={{ 
                fontFamily: 'freight-sans-pro, sans-serif',
                letterSpacing: '0.02em'
              }}
            >
              Session Fee - $200
            </div>
            
            <div 
              className="text-white text-xl md:text-2xl font-normal"
              style={{ 
                fontFamily: 'freight-sans-pro, sans-serif',
                letterSpacing: '0.02em'
              }}
            >
              Couples Session - $240
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className={`space-y-8 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p 
            className="text-white text-lg md:text-xl leading-[1.7] max-w-4xl mx-auto"
            style={{ 
              fontFamily: 'freight-sans-pro, sans-serif',
              fontWeight: '300',
              letterSpacing: '0.02em'
            }}
          >
            I do not accept insurance, but I provide a superbill for self-submission to your insurance company for potential reimbursement.
          </p>
        </div>
      </div>
    </section>
  );
}

// Unable to Accept New Clients Section
function UnableToAcceptNewClients() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#F5F3ED] py-24 px-8 md:px-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p 
            className="text-[#A4926B] text-2xl md:text-3xl leading-[1.6]"
            style={{ 
              fontFamily: 'freight-display-pro, serif',
              letterSpacing: '-0.01em',
              fontWeight: '400'
            }}
          >
            Unable to accept new clients at this time.
          </p>
        </div>
      </div>
    </section>
  );
}
// Lake Inspirational Quote Section (Updated)

function LakeInspirationalQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[450px] flex items-center justify-center"
    >
      {/* High Quality Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lake.jpg"
          alt="Serene lake landscape"
          className="w-full h-full object-cover"
          style={{
  imageRendering: 'crisp-edges',
  filter: 'contrast(1.1) brightness(0.95)',
}}


        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-8 md:px-16 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Main Quote */}
          <blockquote              
  className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-8"             
  style={{                
    fontFamily: 'freight-display-pro, serif',               
    letterSpacing: '-0.01em',               
    textShadow: '0 3px 6px rgba(0,0,0,0.5)'             
  }}           
>             
  &ldquo;The curious paradox is that when I accept myself just as I am, then I can change.&rdquo;           
</blockquote>
          
          {/* Attribution */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p 
              className="text-white text-lg md:text-xl font-light"
              style={{ 
                fontFamily: 'freight-sans-pro, sans-serif',
                letterSpacing: '0.02em',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              — Carl Rogers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
// FAQ Section Component

function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  // Type openItems as an object with number keys and boolean values
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "Do you accept insurance?",
      answer: "No, but a superbill is provided for self-submission.",
    },
    {
      question: "Are online sessions available?",
      answer: "Yes—all virtual sessions via Zoom.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "24-hour notice required.",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white py-24 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#A4926B] font-normal leading-tight mb-4"
            style={{
              fontFamily: 'freight-display-pro, serif',
              letterSpacing: '-0.02em',
              fontWeight: '400',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-b border-[#A4926B]/20 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${0.1 + index * 0.1}s`,
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left py-6 flex items-center justify-between group hover:bg-gray-50/50 transition-colors duration-200"
              >
                <span
                  className="text-[#A4926B] text-lg md:text-xl font-normal pr-8 leading-relaxed group-hover:text-[#8D7E57] transition-colors duration-200"
                  style={{
                    fontFamily: 'freight-display-pro, serif',
                    letterSpacing: '-0.01em',
                    fontWeight: '400',
                  }}
                >
                  {item.question}
                </span>

                {/* Toggle Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-[#A4926B] flex items-center justify-center transition-all duration-300 ${
                      openItems[index] ? 'bg-[#A4926B] rotate-45' : 'group-hover:border-[#8D7E57]'
                    }`}
                  >
                    <svg
                      className={`w-3 h-3 transition-colors duration-300 ${
                        openItems[index] ? 'text-white' : 'text-[#A4926B] group-hover:text-[#8D7E57]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-6 pr-8">
                  <p
                    className="text-[#A4926B] leading-[1.7]"
                    style={{
                      fontFamily: 'freight-sans-pro, sans-serif',
                      fontSize: '16px',
                      fontWeight: '300',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      letterSpacing: '0.3px',
                      textRendering: 'optimizeLegibility',
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Get In Touch Section Component


function GetInTouch() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: '',
    preferredMethod: '',
    agreeToContact: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    if (!formData.message.trim())
      newErrors.message = 'Please tell us what brings you here';

    if (!formData.preferredTime.trim())
      newErrors.preferredTime = 'Preferred contact time is required';

    if (!formData.agreeToContact)
      newErrors.agreeToContact = 'You must agree to be contacted';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredTime: '',
        preferredMethod: '',
        agreeToContact: false,
      });

      alert(
        'Thank you for your message! Dr. Blake will be in touch with you soon.'
      );
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F3ED] py-24 px-8 md:px-16"
      id="contact"
    >
      <div className="max-w-2xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="text-3xl md:text-4xl text-[#A4926B] font-normal leading-tight mb-4"
            style={{
              fontFamily: 'freight-display-pro, serif',
              letterSpacing: '-0.02em',
              fontWeight: '400',
            }}
          >
            Get In Touch
          </h2>
          <p
            className="text-[#A4926B] leading-[1.6] max-w-lg mx-auto"
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontSize: '16px',
              fontWeight: '300',
              letterSpacing: '0.3px',
            }}
          >
            Simply fill out the brief fields below and Dr. Blake will be in
            touch with you soon, usually within one business day. This form is
            safe, private, and completely free.
          </p>
        </div>

        <div
          className={`bg-white rounded-lg shadow-lg p-8 md:p-10 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white ${
                  errors.name ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Your name"
                style={{ color: '#1f2937' }}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white ${
                  errors.email ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
                style={{ color: '#1f2937' }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white ${
                  errors.phone ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="(555) 234-5678"
                style={{ color: '#1f2937' }}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                What brings you here?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white resize-vertical ${
                  errors.message ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="How can I help you?"
                style={{ color: '#1f2937' }}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred time to reach you
              </label>
              <input
                id="preferredTime"
                name="preferredTime"
                type="text"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white ${
                  errors.preferredTime ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="e.g. Mornings, Afternoons, Evenings, Weekends"
                style={{ color: '#1f2937' }}
              />
              <p className="mt-1 text-xs text-[#A4926B]/70">
                Let us know when you&apos;re typically available

              </p>
              {errors.preferredTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.preferredTime}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="preferredMethod" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <select
                id="preferredMethod"
                name="preferredMethod"
                value={formData.preferredMethod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#A4926B]/50 focus:border-[#A4926B] transition-colors text-gray-900 bg-white border-gray-300"
                style={{ color: '#1f2937' }}
              >
                <option value="">Select preferred method</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="text">Text Message</option>
              </select>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="agreeToContact"
                name="agreeToContact"
                type="checkbox"
                checked={formData.agreeToContact}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-[#A4926B] focus:ring-[#A4926B]/50 border-gray-300 rounded"
              />
              <label htmlFor="agreeToContact" className="block text-sm font-medium text-gray-700">
                I agree to be contacted by Dr. Blake regarding my inquiry
              </label>
            </div>
            {errors.agreeToContact && (
              <p className="text-sm text-red-500">{errors.agreeToContact}</p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-md font-medium text-white transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#5C7A7A] hover:bg-[#4A6565] focus:outline-none focus:ring-2 focus:ring-[#5C7A7A]/50 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>

            <p className="text-xs text-[#A4926B]/70 text-center pt-2">
              By clicking submit you consent to receive texts and emails from
              Dr. Serena Blake
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#eae9e0] py-16 px-8 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Name and Title */}
        <h3 
          className="mb-8"
          style={{ 
            fontFamily: 'freight-display-pro, serif',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '27px',
            lineHeight: '36px',
            color: 'rgb(164, 146, 107)'
          }}
        >
          Dr. Serena Blake, PsyD, Licensed Clinical Psychologist
        </h3>

        {/* Contact Information */}
        <div className="space-y-4 mb-8">
          <p 
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)'
            }}
          >
            <a 
              href="mailto:serena@blakepsychology.com"
              className="hover:underline transition-all duration-200"
              style={{ color: 'inherit' }}
            >
              serena@blakepsychology.com
            </a>
          </p>
          
          <p 
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)'
            }}
          >
            Phone: <a 
              href="tel:3235550192"
              className="hover:underline transition-all duration-200"
              style={{ color: 'inherit' }}
            >
              (323) 555-0192
            </a>
          </p>
          
          <p 
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)'
            }}
          >
            1287 Maplewood Drive, Los Angeles, CA 90026
          </p>
        </div>

        {/* Office Hours */}
        <div className="mb-8">
          <h4 
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)',
              marginBottom: '16px'
            }}
          >
            Office Hours
          </h4>
          <div className="space-y-2">
            <p 
              style={{
                fontFamily: 'freight-sans-pro, sans-serif',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '18px',
                lineHeight: '32px',
                color: 'rgb(164, 146, 107)'
              }}
            >
              In-person: Tue & Thu, 10 AM–6 PM
            </p>
            <p 
              style={{
                fontFamily: 'freight-sans-pro, sans-serif',
                fontStyle: 'normal',
                fontWeight: '300',
                fontSize: '18px',
                lineHeight: '32px',
                color: 'rgb(164, 146, 107)'
              }}
            >
              Virtual via Zoom: Mon, Wed & Fri, 1 PM–5 PM
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a 
            href="#about"
            className="hover:opacity-80 transition-opacity duration-200 underline"
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)'
            }}
          >
            About
          </a>
          <a 
            href="#contact"
            className="hover:opacity-80 transition-opacity duration-200 underline"
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)'
            }}
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6" style={{ borderColor: 'rgba(164, 146, 107, 0.2)' }}>
          <p 
            style={{
              fontFamily: 'freight-sans-pro, sans-serif',
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: '18px',
              lineHeight: '32px',
              color: 'rgb(164, 146, 107)',
              opacity: '0.7'
            }}
          >
            © 2025 Dr. Serena Blake Psychological Services, PLLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default function Page() {
  return (
    <div>
      <Hero />
      <About />
      <TherapyQuote />
      <AreasOfFocus />
      <RatesAndInsurance />
      <UnableToAcceptNewClients />
      <LakeInspirationalQuote />
      <FAQ/>
      <GetInTouch/>
      <Footer />
    </div>
  );
}