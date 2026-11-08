import Command from '../models/command.model.js';
import { generateEmbedding } from './embedding.service.js';

export const generateCommandEmbeddings = async () => {

    try {

        const commands = await Command.find({
            isEnabled: true
        });

        for (const command of commands) {

            const updatedExamples = [];

            for (const example of command.examples) {

                const text = typeof example === 'string'
                    ? example
                    : example.text;

                const embedding = await generateEmbedding(text);

                updatedExamples.push({
                    text: text,
                    embedding: embedding
                });
            }

            command.examples = updatedExamples;

            await command.save();

            console.log(`Embeddings saved for: ${command.intent}`);
        }

        console.log('All command embeddings generated successfully!');

    } catch (error) {

        console.log('Command embedding generation failed:', error.message);

        throw error;
    }
};