import { peco } from '../src';

const data = ['option1', 'option2', 'option3'].join('\n');

/**
 * Simple usecase
 */
(async (): Promise<void> => {
  const selected = await peco(data, {
    bin: 'peco2', // throw ENOENT error
    reject: false, // process exit option
  });
  console.log(selected);
})();
