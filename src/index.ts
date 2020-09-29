import { spawn } from 'child_process';

const handleError = (reject: (reason?: any) => void, option?: PecoOption) => (error: Error): void => {
  if (option?.reject) {
    reject(error);
  } else {
    if (error.message.includes('ENOENT')) {
      // when 'peco' binary is not in path
      console.error(`command not found: peco\ninstall peco from https://github.com/peco/peco`);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

const getPath = (option?: PecoOption): string => {
  return option?.path ?? 'peco';
};

export interface PecoOption {
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

export const peco = async (data: string, option?: PecoOption): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const peco = spawn('peco', ['--layout=bottom-up', `--prompt=[find]`]);

    let selected = '';
    peco.stdout.on('data', data => {
      selected += data;
    });

    peco.stdout.on('end', () => {
      resolve(selected.trim().split('\n'));
    });

    peco.on('error', handleError(reject, option));
    peco.stdin.on('error', handleError(reject, option));

    peco.stdin.write(data);
    peco.stdin.end();
  });
};
