import   { Config }  from 'knex';
import path from 'path';
import {getConfig} from '../config';

const {
  env,
  db: { name, username, password, host, url  },
} = getConfig();

let connectionString: string;
if(url) {

  connectionString = url
} else {
  connectionString = `postgresql://${username}:${password}@${host}/${name}`;
}

const defaultOptions: Config = {
  client: 'pg',
  connection: connectionString, 
  migrations: {
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
};

interface Configs {
  [key: string]: Config;
}

const configs: Configs = {
  development: defaultOptions,
  staging: defaultOptions,
  production: defaultOptions,
  local: defaultOptions,
  test: defaultOptions,
};

if (configs[env] === undefined) {
  throw Error(`Missing configuration for environment: ${env}`);
}

module.exports = configs;
