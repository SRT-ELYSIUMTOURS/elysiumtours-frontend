import React from 'react';
import TestimonialCard from '../cards/TestimonialCard';

const REVIEWS = [
  {
    id: 1,
    quote: "Elysium Tours made my trip to Ghana absolutely amazing!",
    body: "Elysium Tours made my trip to Ghana absolutely amazing! Our guide was so knowledgeable and friendly, and every destination felt thoughtfully chosen. I especially loved the Cape Coast tour.",
    attribution: "Sarah M., United Kingdom",
    reviewerName: "Amira Hassan",
    timestamp: "2 weeks ago",
    rating: 5,
    avatar: "https://picsum.photos/seed/user1/60/60"
  },
  {
    id: 2,
    quote: "Elysium Tours completely changed the way I travel.",
    body: "Elysium Tours completely changed the way I travel. I didn't just visit Ghana — I lived it. From cooking lessons in Cape Coast to dancing at a local festival, every day was full of connection & joy.",
    attribution: "David O., Nigeria",
    reviewerName: "David O.",
    timestamp: "1 month ago",
    rating: 4,
    avatar: "https://picsum.photos/seed/user2/60/60"
  },
  {
    id: 3,
    quote: "The best possible way to see West Africa.",
    body: "I was in Accra for a business conference but extended my stay for a bleisure tour with Elysium. It was the best decision! They helped me blend meetings with cultural adventures.",
    attribution: "Estella Sackey",
    reviewerName: "Estella Sackey",
    timestamp: "2 months ago",
    rating: 5,
    avatar: "https://picsum.photos/seed/user3/60/60"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-primary-light-default w-full py-[80px] px-6 xl:px-[157px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px]">
        
        {/* Header Row: Label and Title on the same baseline */}
        <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-10 mb-[10px]">
          {/* Left: OUR TRAVELERS Label */}
          <div className="flex items-center gap-[12px] shrink-0">
            <div className="w-[32px] h-[2px] bg-tertiary-normal-default"></div>
            <span className="text-[12px] font-bold text-tertiary-normal-default tracking-widest uppercase">
Testimonials            </span>
          </div>

          {/* Right: Main Headline */}
          <div className="flex-1 text-right">
            <h2 className="text-[25px] font-bold text-tertiary-normal-default leading-[1.2] font-raleway md:whitespace-nowrap">
              What Our Travelers Say
            </h2>
          </div>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {REVIEWS.map(review => (
            <TestimonialCard 
              key={review.id}
              quote={review.quote}
              body={review.body}
              attribution={review.attribution}
              reviewerName={review.reviewerName}
              timestamp={review.timestamp}
              rating={review.rating}
              avatar={review.avatar}
              className="w-full"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
