import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRandomWordsFromFile, myLevenshtein, isEqualWithOneSwitchMax } from "../utils/tools"; // Assure-toi que le chemin vers tes utilitaires est correct

const Game: React.FC = () => {
	const [wordsMap, setWordsMap] = useState<{ [key: string]: string }>({});
	const [scoreWords, setScoreWords] = useState<{ [key: string]: number }>({});
	const [oldWords, setOldWords] = useState<{ [key: string]: string }>({});
	const [gameStarted, setGameStarted] = useState(false);
	const [resultMessage, setResultMessage] = useState<string>("");
	const [resultClass, setResultClass] = useState<string>("");
	
	const [isLoading, setIsLoading] = useState<boolean>(true); // Nouvel état pour le chargement
	
	const [numWrongRepeats, setNumWrongRepeats] = useState<number>(0);
	const [currentWord, setCurrentWord] = useState<string>("");

	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);

		setNumWrongRepeats(parseInt(queryParams.get("wrongRepeats")!));

		async function fetchRandomWords() {
			try {
				const randomWords = await getRandomWordsFromFile(queryParams.get("language")!, parseInt(queryParams.get("numberOfQuestions")!));
				const initialScore = parseInt(queryParams.get("repeats")!);

				const wordsMapInit: { [key: string]: string } = {};
				const scoreWordsInit: { [key: string]: number } = {};

				randomWords.forEach((word) => {
					wordsMapInit[word.word] = word.translation;
					scoreWordsInit[word.word] = initialScore;
				});

				setWordsMap(wordsMapInit);
				setScoreWords(scoreWordsInit);
				setGameStarted(true);
				setCurrentWord(randomWords[Math.floor(Math.random() * randomWords.length)].word);
				setIsLoading(false); // Fin du chargement
			} catch (error) {
				console.error("Error fetching random words:", error);
			}
		}

		fetchRandomWords();
	}, [location.search]);

	const handleAnswer = (word: string, userAnswer: string) => {
		const answer = wordsMap[word];
		const similarity = myLevenshtein(userAnswer, answer);

		let newScoreWords = { ...scoreWords };
		let newOldWords = { ...oldWords };

		if (similarity > 0.8 || isEqualWithOneSwitchMax(userAnswer, answer)) {
			newScoreWords[word] -= 1;

			if (newScoreWords[word] === 0) {
				newOldWords[word] = answer;
				setOldWords(newOldWords);

				delete newScoreWords[word];
				delete wordsMap[word];
			}

			setResultMessage(`Correct! The answer is: ${answer}`);
			setResultClass("text-green-500");
			if (answer.includes(":") || similarity !== 1) {
				setResultMessage(`Correct! These are all the answers:\n${answer}`);
			}
		} else {
			newScoreWords[word] = numWrongRepeats;
			setResultMessage(`Incorrect! The correct answer is: ${answer}`);
			setResultClass("text-red-500");
		}

		setScoreWords(newScoreWords);
		setWordsMap({ ...wordsMap });

		if (Object.keys(newScoreWords).length != 0) {
			let remainingWords = Object.keys(newScoreWords);
			let nextWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
			while (nextWord === word && remainingWords.length > 1) {
				nextWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
			}
			setCurrentWord(nextWord);
		}

		(document.getElementById("userInput") as HTMLInputElement).value = "";
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleAnswer(currentWord, (event.target as HTMLInputElement).value);
		}
	};

	if (isLoading) { // Afficher le message de chargement si isLoading est vrai
		return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
	}

	if (Object.keys(wordsMap).length === 0 && gameStarted) {
		return <div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="p-6 bg-white rounded shadow-md text-center">
				<p className="text-lg font-semibold">Game Over! You've finished all questions.</p>
			</div>
		</div>
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="p-6 bg-white rounded shadow-md text-center">
				<h1 className="text-2xl font-bold mb-4">Vocabulary Quiz</h1>
				<div>
					<p className="mb-2">
						Translate: <span className="font-semibold">{currentWord}</span>
					</p>
					<input type="text" id="userInput" className="border rounded px-2 py-1 mb-2 w-full" onKeyPress={handleKeyPress} />
					<button
						onClick={() => handleAnswer(currentWord, (document.getElementById("userInput") as HTMLInputElement).value)}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Submit Answer
					</button>
					<p className={`mt-4 text-lg font-semibold ${resultClass}`}>{resultMessage}</p>
				</div>
			</div>
		</div>
	);
};

export default Game;
