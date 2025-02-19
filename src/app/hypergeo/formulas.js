function factorial(n) {
  if (n < 0)
    throw new Error('n must be positive');

  if (n <= 1)
    return 1;

  let product = 1;
  for (let i = 2; i <= n; i++) {
    product *= i;
  }

  return product;
}

function binomial(n, k) {
  if (k < 0)
    throw new Error(`${k} must be positive`);
  if (k > n)
    throw new Error(`${n} must be >= ${k}`);
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function isBlank(arg) {
  return arg == null;
}

export function hypergeometric(population, sampleSize, hits, target) {
  if (isBlank(population) || isBlank(sampleSize) || isBlank(hits) || isBlank(target)) {
    throw new Error('One or more args are blank.');
  }

  if (target > sampleSize) {
    throw new Error('Target cannot be larger than the sample size.');
  }
  if (sampleSize > population) {
    throw new Error('Sample size must be smaller than the population.');
  }
  if (hits > population) {
    throw new Error('Successes cannot be larger than the population.');
  }

  const top = (binomial(hits, target) * binomial((population - hits), (sampleSize - target)));
  const bottom = binomial(population, sampleSize);

  return top / bottom;
}

export function atLeast(N, n, K, k) {
  let ceiling = n >= K ? K : n;
  let cumulative = 0;

  for (let i = k; i <= ceiling; i++) {
    cumulative += hypergeometric(N, n, K, i);
  }
  return cumulative;
}

export function none(N, n, K) {
  return hypergeometric(N, n, K, 0);
}

export function pretty(n) {
  return `${(n * 100).toPrecision(4)}%`;
}

