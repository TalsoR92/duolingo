import './App.css';

function App() {
  const handlePlayClick = () => {
    console.log('Game started!'); // Vous pouvez remplacer cette ligne par la logique pour lancer le jeu.
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <header className="text-center mt-[10%]"> {/* Augmentation de la marge et du padding du header */}
        <h1 className="text-4xl font-bold text-gray-700 mb-6"> {/* Augmentation de la taille du texte */}
          Duolingo Vocabulary Test
        </h1>
        <button
          onClick={handlePlayClick}
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Play
        </button>
      </header>
    </div>
  );
}

export default App;
