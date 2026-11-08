import Command from '../models/command.model.js';

import { generateEmbedding } from './embedding.service.js';

import { cosineSimilarity } from './cosineSimilarity.service.js';

// Find the best matching command
export const matchCommand = async (userText) => {

    const userEmbedding = await generateEmbedding(userText);

    const commands = await Command.find({
        isEnabled: true
    });

    let bestMatch = null;
    let highestScore = 0;

    for (const command of commands) {

        for (const example of command.examples) {

            const score = cosineSimilarity(
                userEmbedding,
                example.embedding
            );

            if (score > highestScore) {

                highestScore = score;

                bestMatch = command;
            }
        }
    }

    // Reject weak matches
    if (highestScore < 0.40) {

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