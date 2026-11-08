import { generateEmbedding } from './services/embedding.service.js';
import { cosineSimilarity } from './services/cosineSimilarity.service.js';

const testSimilarity = async () => {

    const text1 = 'Show me all files in this folder';

    const text2 = 'List all files in the current directory';

    const text3 = 'What is the weather today?';

    const embedding1 = await generateEmbedding(text1);
    const embedding2 = await generateEmbedding(text2);
    const embedding3 = await generateEmbedding(text3);

    const similarity1 = cosineSimilarity(embedding1, embedding2);
    const similarity2 = cosineSimilarity(embedding1, embedding3);

    console.log('Similarity between related sentences:', similarity1);

    console.log('Similarity between unrelated sentences:', similarity2);
};

testSimilarity();