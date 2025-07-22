export default function randomize(max = 100, min = 0): number {
  if (min !== 0) {
    const random = Math.floor(Math.random() * (max - min) + min);

    return random;
  }

  const random = Math.floor(Math.random() * max);

  return random;
}
