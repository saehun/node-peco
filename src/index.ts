import { spawn } from 'child_process';

const peco = async (data: string, prompt = 'find'): Promise<string> => {
  return new Promise(resolve => {
    const peco = spawn('peco', ['--layout=bottom-up', `--prompt=[${prompt}]`]);

    let selected = '';
    peco.stdout.on('data', data => {
      selected += data;
    });

    peco.stdout.on('end', () => {
      resolve(selected.trim());
    });

    peco.stdin.write(data);
    peco.stdin.end();
  });
};

export default peco;
