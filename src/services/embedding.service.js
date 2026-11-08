
import { pipeline } from '@huggingface/transformers';

// Store the model so we don't load it repeatedly
let embeddingPipeline = null;

// Load the embedding model
const loadModel = async () => {

    if (!embeddingPipeline) {

        console.log('Loading embedding model...');

        embeddingPipeline = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2'
        );

        console.log('Embedding model loaded successfully!');
    }

    return embeddingPipeline;
};

// Generate embedding for text
export const generateEmbedding = async (text) => {

    try {

        const model = await loadModel();

        const output = await model(text, {
            pooling: 'mean',
            normalize: true
        });

        return Array.from(output.data);

    } catch (error) {

        console.log('Embedding generation failed:', error.message);

        throw error;
    }
};
