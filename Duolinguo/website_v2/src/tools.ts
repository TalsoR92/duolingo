import { levenshteinEditDistance as levenshtein } from "levenshtein-edit-distance";
import unidecode from "unidecode";

type WordEntry = {
	word: string;
	translation: string;
};

// Function to check if two strings can be made equal by swapping at most one pair of characters
export const isEqualWithOneSwitchMax = (s1: string, s2: string): boolean => {
	if (s1 === s2) {
		return true;
	}
	if (s1.length !== s2.length) {
		return false;
	}
	let i = 0;
	while (i < s1.length - 1) {
		if (s1[i] !== s2[i]) {
			if (s1[i] !== s2[i + 1] || s1[i + 1] !== s2[i]) {
				return false;
			}
			i += 2;
		} else {
			i += 1;
		}
	}
	return true;
};

// Function to calculate Levenshtein distance similarity
export const myLevenshtein = (s1: string, s2: string): number => {
	s1 = unidecode(s1.toLowerCase());
	s2 = s2.toLowerCase();
	let listS2: string[] = s2.split(",");
	listS2 = listS2.map((x) => unidecode(x.trim()));

	let maxSimilarity = 0;
	listS2.forEach((elt) => {
		const similarity = levenshtein(s1, elt);
		if (similarity > maxSimilarity) {
			maxSimilarity = similarity;
		}
	});

	return maxSimilarity;
};

// Function to read JSON file using fetch
async function readJsonFile(jsonFilePath: string): Promise<WordEntry[]> {
	try {
		const response = await fetch(jsonFilePath);
		if (!response.ok) {
			throw new Error(`Error fetching JSON file: ${response.statusText}`);
		}
		const jsonContent = await response.json();
		return jsonContent as WordEntry[];
	} catch (error) {
		console.error("Error reading JSON file:", error);
		throw error;
	}
}

export async function getRandomWordsFromFile(language: string, count: number): Promise<WordEntry[]> {
	let jsonFilePath: string;
	console.log("language", language);
	// Sélection du fichier JSON en fonction de la langue
	switch (language) {
		case "English":
			console.log("english on y passe");
			jsonFilePath = "vocab_en-fr.json";
			break;
		case "Ukrainian":
			jsonFilePath = "vocab_uk-fr.json";
			break;
		default:
			throw new Error(`Unsupported language: ${language}.`);
	}

	try {
		// Read the JSON file
		const words = await readJsonFile("../JSON/" + jsonFilePath);

		// Check if the requested count is greater than the number of available words
		if (count > words.length) {
			throw new Error("The requested count is greater than the number of words available in the file.");
		}

		// Generate random indexes to select random words
		const randomIndexes = getRandomIndexes(count, words.length);
		const randomWords = randomIndexes.map((index) => words[index]);

		return randomWords;
	} catch (error) {
		console.error("Error fetching random words:", error);
		throw error;
	}
}

// Function to generate unique random indexes within a specified range
export function getRandomIndexes(count: number, maxIndex: number): number[] {
	const indexes: number[] = [];
	while (indexes.length < count) {
		const randomIndex = Math.floor(Math.random() * maxIndex);
		if (!indexes.includes(randomIndex)) {
			indexes.push(randomIndex);
		}
	}
	return indexes;
}