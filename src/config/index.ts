import joi from 'joi';

const envVariablesSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow('development', 'production', 'test', 'staging')
      .default('development'),
    PORT: joi.number().default(4000),
    DATABASE_NAME: joi.string().required(),
    DATABASE_DIALECT: joi.string().default('postgres'),
    DATABASE_PASSWORD: joi.string().default(null),
    DATABASE_USER: joi.string().required(),
    DATABASE_URL: joi.string().default(null),
    DB_HOST: joi.string().required(),
    SECRET_KEY: joi.string().required(),
    JWT_EXPIRATION: joi.string().default('1h'),
  })
  .unknown()
  .required();


type NodeEnv = 'development' | 'staging' | 'production' | 'test' | 'local';

export interface AppConfig {
  env: NodeEnv;
  port: number;
  db: {
    name: string;
    username: string;
    dialect: string;
    password: string;
    host: string;
    url: string;
  };
  jwt: {
    secretKey: string;
    expiresIn: string;
  };
}

let config: AppConfig;

export const getConfig = (): AppConfig => {
  if (!config) {
    const { error, value: envVariables } = envVariablesSchema.validate(process.env);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    config = {
      env: envVariables.NODE_ENV,
      port: envVariables.PORT,
      db: {
        name: envVariables.DATABASE_NAME,
        username: envVariables.DATABASE_USER,
        dialect: envVariables.DATABASE_DIALECT,
        password: envVariables.DATABASE_PASSWORD,
        host: envVariables.DB_HOST,
        url: envVariables.DATABASE_URL,
      },
      jwt: {
        secretKey: envVariables.SECRET_KEY,
        expiresIn: envVariables.JWT_EXPIRATION,
      },
    };
  }

  return config;
};
