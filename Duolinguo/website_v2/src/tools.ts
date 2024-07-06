import * as textdistance from 'text-distance';
import unidecode from 'unidecode';

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

// Function to calculate similarity between two strings
export const calculateSimilarity = (str1: string, str2: string): number => {
    // Replace with your own similarity calculation (e.g., Levenshtein distance)
    return str1 === str2 ? 1 : 0;
};


// Function to calculate Levenshtein distance similarity
export const myLevenshtein = (s1: string, s2: string): number => {
  s1 = unidecode(s1.toLowerCase());
  s2 = s2.toLowerCase();
  let listS2: string[] = s2.split(',');
  listS2 = listS2.map(x => unidecode(x.trim()));

  let maxSimilarity = 0;
  listS2.forEach(elt => {
    const similarity = textdistance.levenshtein.normalizedSimilarity(s1, elt);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
    }
  });

  return maxSimilarity;
};