import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRandomWordsFromFile, myLevenshtein, isEqualWithOneSwitchMax } from "./tools"; // Assure-toi que le chemin vers tes utilitaires est correct

const Game: React.FC = () => {
	const [wordsMap, setWordsMap] = useState<{ [key: string]: string }>({});
	const [scoreWords, setScoreWords] = useState<{ [key: string]: number }>({});
	const [oldWords, setOldWords] = useState<{ [key: string]: string }>({});
	const [gameStarted, setGameStarted] = useState(false);
	const [resultMessage, setResultMessage] = useState<string>("");
	const [resultClass, setResultClass] = useState<string>("");

	const [language, setLanguage] = useState<string>("");
	const [direction, setDirection] = useState<string>("");
	const [numQuestions, setNumQuestions] = useState<number>(0);
	const [numRepeats, setNumRepeats] = useState<number>(0);
	const [numWrongRepeats, setNumWrongRepeats] = useState<number>(0);

	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);

		setLanguage(queryParams.get("language")!);
		setDirection(queryParams.get("direction")!);
		setNumQuestions(parseInt(queryParams.get("numberOfQuestions")!));
		setNumRepeats(parseInt(queryParams.get("repeats")!));
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
			} catch (error) {
				console.error("Error fetching random words:", error);
				// Handle error appropriately (e.g., show error message)
			}
		}

		fetchRandomWords();
	}, [location.search]);

	const handleAnswer = (word: string, userAnswer: string) => {
		const answer = wordsMap[word];
		const similarity = myLevenshtein(userAnswer, answer);

		if (similarity > 0.8 || isEqualWithOneSwitchMax(userAnswer, answer)) {
			let newScoreWords = { ...scoreWords };
			newScoreWords[word] -= 1;

			if (newScoreWords[word] === 0) {
				let newOldWords = { ...oldWords };
				newOldWords[word] = answer;
				setOldWords(newOldWords);

				// Check if this was the last repeat needed for validation
				const validatedWordsCount = Object.values(newScoreWords).filter((score) => score === 0).length;
				if (validatedWordsCount === numQuestions - 1) {
					setNumRepeats(numWrongRepeats); // Update numRepeats to numWrongRepeats
				}
			} else {
				setScoreWords(newScoreWords);
			}

			setResultMessage(`Correct! The answer is: ${answer}`);
			setResultClass("text-green-500");
			if (answer.includes(":") || similarity !== 1) {
				setResultMessage(`Correct! These are all the answers:\n${answer}`);
			}
		} else {
			let newScoreWords = { ...scoreWords };
			newScoreWords[word] = numWrongRepeats;
			setScoreWords(newScoreWords);

			setResultMessage(`Incorrect! The correct answer is: ${answer}`);
			setResultClass("text-red-500");

			// Check if this was the last repeat needed for validation
			const validatedWordsCount = Object.values(newScoreWords).filter((score) => score === 0).length;
			if (validatedWordsCount === numQuestions - 1) {
				setNumRepeats(numWrongRepeats); // Update numRepeats to numWrongRepeats
			}
		}

		let newWordsMap = { ...wordsMap };
		delete newWordsMap[word];
		setWordsMap(newWordsMap);

		(document.getElementById("userInput") as HTMLInputElement).value = "";
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const currentWord = Object.keys(wordsMap)[0];
			handleAnswer(currentWord, (event.target as HTMLInputElement).value);
		}
	};

	if (!gameStarted) {
		return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
	}

	const currentWord = Object.keys(wordsMap)[0];

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="p-6 bg-white rounded shadow-md text-center">
				<h1 className="text-2xl font-bold mb-4">Vocabulary Quiz</h1>
				{Object.keys(wordsMap).length > 0 ? (
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
				) : (
					<p className="text-lg font-semibold">Game Over! You've finished all questions.</p>
				)}
			</div>
		</div>
	);
};

export default Game;
