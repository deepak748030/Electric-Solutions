
import React, { useEffect, useState } from 'react';

const stats = [
  { id: 1, value: 2565, label: 'Total Orders', icon: '/public/lovable-uploads/5a8cf556-989b-41d2-a042-c2945172714f.png' },
  { id: 2, value: 1255, label: 'Active Clients', icon: '/public/lovable-uploads/5a8cf556-989b-41d2-a042-c2945172714f.png' },
  { id: 3, value: 37, label: 'Team Members', icon: '/public/lovable-uploads/5a8cf556-989b-41d2-a042-c2945172714f.png' },
  { id: 4, value: 21, label: 'Years of Experience', icon: '/public/lovable-uploads/5a8cf556-989b-41d2-a042-c2945172714f.png' }
];

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    let animationFrame = null;
    
    const countUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };
    
    animationFrame = requestAnimationFrame(countUp);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);
  
  return <span>{count}</span>;
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  return (
    <section id="stats-section" className="py-16 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="bg-white rounded-full p-4 mb-4 w-24 h-24 flex items-center justify-center">
                <img src={stat.icon} alt={stat.label} className="w-12 h-12" />
              </div>
              <h3 className="text-4xl font-bold mb-2">
                {isVisible ? <Counter end={stat.value} /> : 0}
                <span>+</span>
              </h3>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
