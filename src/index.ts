import { spawn } from 'child_process';

const handleError = (option: Option, reject: (reason?: any) => void) => (error: Error): void => {
  if (option.reject) {
    reject(error);
  } else {
    if (error.message.includes('ENOENT')) {
      console.error(`command not found: peco\ninstall peco from https://github.com/peco/peco`);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

interface Option {
  path?: string;
  reject?: boolean;
  query?: string;
  prompt?: string;
  selectOne?: boolean;
  printQuery?: boolean;
  initialIndex?: number;
  initialFilter?: 'IgnoreCase' | 'CaseSensitive' | 'SmartCase' | 'Regexp' | 'Fuzzy';
  onCancel?: 'success' | 'error';
  layout?: 'bottom-up' | 'top-down';
}

const getPath = (option: Option): string => {
  return option.path ?? 'peco';
};

const peco = async (data: string, option: Option): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const peco = spawn('peco', ['--layout=bottom-up', `--prompt=[find]`]);

    let selected = '';
    peco.stdout.on('data', data => {
      selected += data;
    });

    peco.stdout.on('end', () => {
      resolve(selected.trim().split('\n'));
    });

    peco.on('error', handleError(option, reject));
    peco.stdin.on('error', handleError(option, reject));

    peco.stdin.write(data);
    peco.stdin.end();
  });
};

export default peco;
