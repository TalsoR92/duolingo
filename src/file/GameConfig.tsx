import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Game = () => {
	const [languages] = useState<string[]>(["English", "Ukrainian"]);
	const [directions] = useState<string[]>(["Ukrainian => English", "English => French", "French => English"]);
	const [selectedLanguage, setSelectedLanguage] = useState<string>("");
	const [selectedDirection, setSelectedDirection] = useState<string>("");
	const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState<number | string>("");
	const [repeats, setRepeats] = useState<string>("");
	const [wrongRepeats, setWrongRepeats] = useState<string>("");
	const [repeatError, setRepeatError] = useState<boolean>(false);
	const [wrongRepeatError, setWrongRepeatError] = useState<boolean>(false);

	const navigate = useNavigate();

	const getNumberOfQuestionsOptions = () => {
		if (selectedLanguage === "English") {
			return [5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, "All"];
		} else if (selectedLanguage === "Ukrainian") {
			return [5, 10, 20, 30, 50, 100, 200, "All"];
		}
		return [];
	};

	const handlePlayButtonClick = () => {
		// Check if all conditions are met before navigating
		if (selectedLanguage && selectedDirection && selectedNumberOfQuestions && repeats && wrongRepeats) {
			// Construct the URL with necessary parameters
			const queryParams = `?language=${selectedLanguage}&direction=${selectedDirection}&numberOfQuestions=${selectedNumberOfQuestions}&repeats=${repeats}&wrongRepeats=${wrongRepeats}`;
			// Navigate to the result page with parameters
			navigate(`/game${queryParams}`);
		}
	};

	const handleRepeatChange = (value: string) => {
		if (/^\d+$/.test(value) && parseInt(value) <= 10) {
			setRepeatError(false);
		} else {
			setRepeatError(true);
		}
		setRepeats(value);
	};

	const handleWrongRepeatChange = (value: string) => {
		if (/^\d+$/.test(value) && parseInt(value) <= 10) {
			setWrongRepeatError(false);
		} else {
			setWrongRepeatError(true);
		}
		setWrongRepeats(value);
	};

	return (
		<div className="flex flex-col items-center mt-[10%] h-screen ">
			<h1 className="text-3xl font-bold mb-8">Duolingo Vocabulary Test</h1>

			<div className="p-4 w-full max-w-md">
				{/* Language container */}
				<div id="languageContainer" className="mb-4 ">
					<label className="block mb-2 text-center font-bold">Language to train :</label>
					<div className="relative">
						<select
							id="languageSelect"
							className="block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto"
							value={selectedLanguage}
							onChange={(e) => {
								setSelectedLanguage(e.target.value);
								setSelectedDirection(""); // Reset direction when language changes
							}}
						>
							<option value="">Select a language</option>
							{languages.map((lang, index) => (
								<option key={index} value={lang}>
									{lang}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Direction container */}
				<div id="directionContainer" className="mb-4">
					<label className="block mb-2 text-center font-bold">In which direction :</label>
					<div className="relative">
						<select
							id="directionSelect"
							className={`block py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto ${
								!selectedLanguage ? "hover:border-red-500 hover:bg-red-100" : "border-gray-300"
							}`}
							value={selectedDirection}
							onChange={(e) => setSelectedDirection(e.target.value)}
							disabled={!selectedLanguage}
						>
							<option value="">Select a direction</option>
							{directions
								.filter((dir) => {
									if (selectedLanguage === "English") {
										return dir === "English => French" || dir === "French => English";
									} else if (selectedLanguage === "Ukrainian") {
										return dir === "Ukrainian => English";
									}
									return false;
								})
								.map((dir, index) => (
									<option key={index} value={dir}>
										{dir}
									</option>
								))}
						</select>
					</div>
				</div>

				{/* Number of questions container */}
				<div id="numberOfQuestionsContainer" className="mb-4">
					<label className="block mb-2 text-center font-bold">Number of questions:</label>
					<div className="relative">
						<select
							id="numberOfQuestionsSelect"
							className={`block py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto ${
								!selectedLanguage ? "hover:border-red-500 hover:bg-red-100" : "border-gray-300"
							}`}
							value={selectedNumberOfQuestions}
							onChange={(e) => setSelectedNumberOfQuestions(e.target.value)}
							disabled={!selectedLanguage}
						>
							<option value="">Select number of questions</option>
							{getNumberOfQuestionsOptions().map((num, index) => (
								<option key={index} value={num}>
									{num}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Repeat count input */}
				<div id="repeatContainer" className="mb-4 text-center">
					<label className="block mb-2 font-bold">Enter repeats (up to 10):</label>
					<div className="relative">
						<input
							type="text"
							className={`block w-10 h-8 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto ${
								repeatError ? "border-red-500 bg-red-100" : "border-gray-300"
							} text-center`}
							value={repeats}
							onChange={(e) => handleRepeatChange(e.target.value)}
						/>
						{repeatError && <p className="text-red-500 text-xs mt-1">Please enter a positive number up to 10.</p>}
					</div>
				</div>

				{/* Wrong repeat count input */}
				<div id="wrongRepeatContainer" className="mb-4 text-center">
					<label className="block mb-2 font-bold">Enter wrong repeats (up to 10):</label>
					<div className="relative">
						<input
							type="text"
							className={`block border w-10 h-8 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm mx-auto ${
								wrongRepeatError ? "border-red-500 bg-red-100" : "border-gray-300"
							} text-center`}
							value={wrongRepeats}
							onChange={(e) => handleWrongRepeatChange(e.target.value)}
						/>
						{wrongRepeatError && <p className="text-red-500 text-xs mt-1">Please enter a positive number up to 10.</p>}
					</div>
				</div>

				<button
					id="playButton"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
					onClick={handlePlayButtonClick}
					disabled={!selectedLanguage || !selectedDirection || !selectedNumberOfQuestions || !repeats || !wrongRepeats}
				>
					Play
				</button>
			</div>
		</div>
	);
};

export default Game;
