import { peco } from '../src';

const data = ['option1', 'option2', 'option3'];

/**
 * Simple usecase
 */
(async (): Promise<void> => {
  const selected = await peco(data);
  console.log(selected);
})();
