import peco from '../src';

const data = ['option1', 'option2', 'option3'].join('\n');

(async (): Promise<void> => {
  const selected = await peco(data);
  console.log(selected);
})();
