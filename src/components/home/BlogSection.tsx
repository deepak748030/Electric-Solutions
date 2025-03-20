
import React from 'react';
import BlogCard from '@/components/common/BlogCard';

const blogs = [
  {
    id: 1,
    title: 'Transforming Your Home With RepairingBuddy.Com: The Ultimate Guide',
    image: '/public/lovable-uploads/5a0f916a-7a99-4eb3-b204-8fc666f610fc.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  },
  {
    id: 2,
    title: 'Common Washing Machine Problems And How To Troubleshoot',
    image: '/public/lovable-uploads/aebc62a7-752a-4cce-bb1b-eddb3cfa4c3a.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  },
  {
    id: 3,
    title: 'Troubleshooting Common Refrigerator Problems: A Hand Guide',
    image: '/public/lovable-uploads/57758589-e6a5-40ce-96c9-f4b63dff38b8.png',
    author: 'Admin',
    commentsCount: '0',
    url: '#'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in">Explore Blogs</h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              image={blog.image}
              author={blog.author}
              commentsCount={blog.commentsCount}
              className="animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
