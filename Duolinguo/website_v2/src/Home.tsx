import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <header className="text-center mt-[10%]">
        <h1 className="text-4xl font-bold text-gray-700 mb-6">
          Duolingo Vocabulary Test
        </h1>
        <Link to="/gameconfig">
          <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Play
          </button>
        </Link>
      </header>
    </div>
  );
}

export default Home;