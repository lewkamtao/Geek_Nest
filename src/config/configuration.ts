import { join } from 'path';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

const config = {
  development: 'dev',
  production: 'prod',
  test: 'test',
};

export default () => {
  return yaml.load(
    readFileSync(
      join(process.cwd(), `src/config`, `${config[process.env.NODE_ENV]}.yml`),
      'utf8',
    ),
  );
};
