import { peco } from '../src';

const data = ['option1', 'option2', 'option3'];

/**
 * Simple usecase
 */
(async (): Promise<void> => {
  await peco(data, {
    bin: 'peco2', // throw ENOENT error and exit
    onError: 'exit',
  });
})();
