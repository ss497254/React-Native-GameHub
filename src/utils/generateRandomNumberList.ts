export const generateRandomNumberList = (length: number, range: number) => {
  const x = new Set<number>();

  for (let i = 0; i < length; i++) {
    const y = Math.floor(Math.random() * 10000) % range;
    if (x.has(y)) i--;
    else {
      x.add(y);
    }
  }

  return x;
};
