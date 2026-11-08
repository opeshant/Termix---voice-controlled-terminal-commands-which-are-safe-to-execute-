// Calculate cosine similarity between two vectors
export const cosineSimilarity = (vector1, vector2) => {

    if (vector1.length !== vector2.length) {
        throw new Error('Vectors must have the same dimensions');
    }

    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vector1.length; i++) {

        dotProduct += vector1[i] * vector2[i];

        magnitude1 += vector1[i] * vector1[i];

        magnitude2 += vector2[i] * vector2[i];
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0;
    }

    return dotProduct / (magnitude1 * magnitude2);
};