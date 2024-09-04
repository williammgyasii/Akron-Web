import React from "react";
import { motion } from "framer-motion";
import SectionLayout from "../layouts/SectionLayout";

const LandingTestimonials = () => {
  const testimonials = [
    {
      text: "Astroship has transformed the way we manage our projects. Its well-designed interface and powerful features make it a must-have tool for any startup. We've seen a great increase in our productivity and collaboration.",
      name: "John Doe",
      position: "CEO at TechCorp",
      image: "/path/to/john-doe-image.png",
    },
    {
      text: "As a marketing professional, I love using Astroship to streamline our marketing campaigns. The automation tools are incredibly effective, and the platform is so user-friendly!",
      name: "Jane Smith",
      position: "Marketing Director at MarketMinds",
      image: "/path/to/jane-smith-image.png",
    },
    {
      text: "Astroship's customer support is top-notch. They are always ready to help with any issues we might face. Highly recommend this platform to any business looking to scale!",
      name: "Alice Johnson",
      position: "COO at FinTech Innovators",
      image: "/path/to/alice-johnson-image.png",
    },
  ];

  // Duplicate the testimonials to create an infinite loop effect
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <SectionLayout className={"overflow-hidden !px-0 !py-4"}>
      <div className="mt-3">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight text-center">
          Client <span className="text-indigo-600">Testimonials</span>
        </h2>
        <p className="text-lg mt-4 text-slate-600 text-center">
          Astroship is trusted by the world's leading companies and brands.
        </p>
      </div>
      <div className="overflow-hidden relative">
        <motion.div
          className="flex space-x-8"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 20, // Duration of the entire animation
            repeat: Infinity, // Infinite loop
            ease: "linear",
          }}
        >
          {loopedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-xl min-w-[300px] max-w-[350px] flex-shrink-0"
            >
              <p className="text-gray-800 text-lg mb-4">"{testimonial.text}"</p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-900 font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionLayout>
  );
};

export default LandingTestimonials;
