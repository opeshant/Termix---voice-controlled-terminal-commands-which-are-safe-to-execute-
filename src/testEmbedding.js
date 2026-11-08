import { generateEmbedding } from './services/embedding.service.js';

const testEmbedding = async () => {

    const text = 'Show me all files in this folder';

    const embedding = await generateEmbedding(text);

    console.log('Embedding generated successfully!');
    console.log('Vector dimensions:', embedding.length);
    console.log('First 10 values:', embedding.slice(0, 10));

};

testEmbedding();