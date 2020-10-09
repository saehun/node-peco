import { peco } from '../src';

const data = ['option1', 'option2', 'option3'];

/**
 * Simple usecase
 */
(async (): Promise<void> => {
  const selected = await peco(data, {
    onCancel: 'reject', // if press ctrl-c, reject error
  });
  console.log(selected);
})();
