/**
 * Return a function that works in the same exact way as Math.random(), but with the given seed.
 * See http://indiegamr.com/generate-repeatable-random-numbers-in-js/
 */
export default function seededRandom(seed: number): () => number;
