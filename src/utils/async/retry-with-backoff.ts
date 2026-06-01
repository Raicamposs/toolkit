import { sleep } from './sleep';

type Params<T> = {
  fn: () => Promise<T>;
  maxRetries: number;
  delay: number;
};

export const retryBackoffExponencial = async <T>({ fn, maxRetries, delay }: Params<T>) => {
  if (maxRetries <= 0) throw new Error('maxRetries deve ser maior que 0');
  if (delay <= 0) throw new Error('delay deve ser maior que 0');
  if (!fn) throw new Error('fn é obrigatório');

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }

  throw new Error('Unreachable code reached in retryBackoffExponencial');
};
