import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface WordMap {
	[word: string]: string;
}

const ResultPage: React.FC = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const language = searchParams.get("language") || "";
	const direction = searchParams.get("direction") || "";
	const numberOfQuestions = parseInt(searchParams.get("numberOfQuestions") || "0", 10);
	const repeats = parseInt(searchParams.get("repeats") || "1", 10); // Default to 1 if not provided
	const wrongRepeats = parseInt(searchParams.get("wrongRepeats") || "1", 10); // Default to 1 if not provided

	const [wordsMap, setWordsMap] = useState<WordMap>({});
	const [scoreWords, setScoreWords] = useState<{ [word: string]: number }>({});
	const [oldWords, setOldWords] = useState<WordMap>({});
	const [currentWord, setCurrentWord] = useState<string>("");
	const [userAnswer, setUserAnswer] = useState<string>("");
	const [correctAnswer, setCorrectAnswer] = useState<string>("");

	// Simulated vocabulary data
	const mockVocabulary: WordMap = {
		Hello: "Bonjour",
		Goodbye: "Au revoir",
		Thankyou: "Merci",
		Yes: "Oui",
		No: "Non",
	};

	// Function to start the game
	const startGame = () => {
		let vocabCopy: WordMap = { ...mockVocabulary };
		let wordsMapCopy: WordMap = {};
		let scoreWordsCopy: { [word: string]: number } = {};

		// Choose random words from vocabulary based on numberOfQuestions
		for (let i = 0; i < numberOfQuestions; i++) {
			const randomWord = Object.keys(vocabCopy)[Math.floor(Math.random() * Object.keys(vocabCopy).length)];
			wordsMapCopy[randomWord] = vocabCopy[randomWord];
			scoreWordsCopy[randomWord] = repeats;
			delete vocabCopy[randomWord];
		}

		setWordsMap(wordsMapCopy);
		setScoreWords(scoreWordsCopy);
	};

	// Function to handle user answer submission
	const handleSubmitAnswer = () => {
		if (userAnswer.trim().length === 0) {
			alert("Please enter an answer.");
			return;
		}

		const currentAnswer = wordsMap[currentWord];
		const similarity = calculateSimilarity(userAnswer, currentAnswer);

		if (similarity > 0.8) {
			setScoreWords((prevScoreWords) => ({
				...prevScoreWords,
				[currentWord]: prevScoreWords[currentWord] - 1,
			}));

			if (scoreWords[currentWord] === 0) {
				setOldWords((prevOldWords) => ({
					...prevOldWords,
					[currentWord]: currentAnswer,
				}));
				delete wordsMap[currentWord];
			}

			setCorrectAnswer("");
		} else {
			setScoreWords((prevScoreWords) => ({
				...prevScoreWords,
				[currentWord]: wrongRepeats,
			}));

			setCorrectAnswer(currentAnswer);
		}

		setUserAnswer("");
	};


	// Effect to start the game when component mounts
	useEffect(() => {
		startGame();
	}, []);

	// Render results and game UI
	return (
		<div>
			<div>
				{Object.keys(wordsMap).length > 0 && (
					<>
						<h2>Current Word: {currentWord}</h2>
						<p>Translate this word: {wordsMap[currentWord]}</p>
						<input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
						<button onClick={handleSubmitAnswer}>Submit Answer</button>
						{correctAnswer && <p>Correct Answer: {correctAnswer}</p>}
					</>
				)}
				{Object.keys(oldWords).length > 0 && (
					<>
						<h2>Old Words</h2>
						{Object.keys(oldWords).map((word) => (
							<div key={word}>
								<p>Word: {word}</p>
								<p>Translation: {oldWords[word]}</p>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default ResultPage;
