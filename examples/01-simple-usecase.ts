import { peco } from '../src';

const data = ['option1', 'option2', 'option3'];

/**
 * Simple usecase
 */
(async (): Promise<void> => {
  const selected = await peco({ candidates: { candidates: data } });
  console.log(selected);
})();
