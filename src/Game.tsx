import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRandomWordsFromFile, myLevenshtein, isEqualWithOneSwitchMax } from "./tools"; // Assure-toi que le chemin vers tes utilitaires est correct

const Game: React.FC = () => {
	const [wordsMap, setWordsMap] = useState<{ [key: string]: string }>({});
	const [scoreWords, setScoreWords] = useState<{ [key: string]: number }>({});
	const [oldWords, setOldWords] = useState<{ [key: string]: string }>({});
	const [gameStarted, setGameStarted] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const language = queryParams.get("language")!;
		const direction = queryParams.get("direction")!;
		const numQuestions = parseInt(queryParams.get("numberOfQuestions")!);
		const numRepeats = parseInt(queryParams.get("repeats")!);
		const numWrongRepeats = parseInt(queryParams.get("wrongRepeats")!);

		async function fetchRandomWords() {
			try {
				const randomWords = await getRandomWordsFromFile(language, numQuestions);
				const initialScore = numRepeats;

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

				let newWordsMap = { ...wordsMap };
				delete newWordsMap[word];
				setWordsMap(newWordsMap);
			}

			setScoreWords(newScoreWords);
			console.log("\nCorrect!\n");
			if (answer.includes(":") || similarity !== 1) {
				console.log(`These are all the answers:\n${answer}\n`);
			}
		} else {
			let newScoreWords = { ...scoreWords };
			newScoreWords[word] = parseInt(queryParams.get("wrongRepeats") || "0");
			setScoreWords(newScoreWords);

			console.log(`\nWrong! The correct answer is: ${answer}\n`);
		}
	};

	if (!gameStarted) {
		return <div>Loading...</div>;
	}

	const currentWord = Object.keys(wordsMap)[0];

	return (
		<div>
			<h1>Vocabulary Quiz</h1>
			{Object.keys(wordsMap).length > 0 ? (
				<div>
					<p>Translate: {currentWord}</p>
					<input type="text" id="userInput" />
					<button onClick={() => handleAnswer(currentWord, (document.getElementById("userInput") as HTMLInputElement).value)}>
						Submit Answer
					</button>
				</div>
			) : (
				<p>Game Over! You've finished all questions.</p>
			)}
		</div>
	);
};

export default Game;
