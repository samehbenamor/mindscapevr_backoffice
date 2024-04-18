import React from 'react';

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center">Your Landing Page Title</h1>
        <p className="text-xl mt-4">A brief description of your product/service.</p>
      </header>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc space-y-2">
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Call to Action</h2>
        <a href="#" className="btn btn-primary">Get Started</a>
      </section>
    </div>
  );
};

export default LandingPage;
