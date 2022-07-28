process.on('message', (iterations: number) => {
  const randoms: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const rand = Math.floor(Math.random() * 1000) + 1;
    randoms[rand] = randoms[rand] + 1 || 1;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const randomObject: Record<string, any> = new Object();
  for (const key in randoms) {
    randomObject[key] = randoms[key];
  }

  process.send && process.send(randomObject);
});
