
import Command from '../models/command.model.js';

// Convert text into lowercase words
const normalizeText = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0);
};

// Calculate similarity between two sentences
const calculateSimilarity = (text1, text2) => {
    const words1 = new Set(normalizeText(text1));
    const words2 = new Set(normalizeText(text2));

    const commonWords = [...words1].filter(word =>
        words2.has(word)
    );

    const allWords = new Set([...words1, ...words2]);

    return commonWords.length / allWords.size;
};

// Find the best matching command
export const matchCommand = async (userText) => {

    const commands = await Command.find({
        isEnabled: true
    });

    let bestMatch = null;
    let highestScore = 0;

    for (const command of commands) {

        for (const example of command.examples) {

            const score = calculateSimilarity(
                userText,
                example
            );

            if (score > highestScore) {
                highestScore = score;
                bestMatch = command;
            }
        }
    }

    // Reject weak matches
    if (highestScore < 0.30) {
        return {
            matched: false,
            message: 'No suitable command found'
        };
    }

    return {
        matched: true,
        score: highestScore,
        command: bestMatch
    };
};
