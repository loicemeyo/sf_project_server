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
    MAIL_USER: joi.string().required(),
    MAIL_PASS: joi.string().required(),
    CLIENT_ID: joi.string().required(),
    CLIENT_SECRET: joi.string().required(),
    REFRESH_TOKEN: joi.string().required(),
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
  mail: {
    mailUser: string;
    mailPass: string;
    oAuthClientId: string;
    oAuthClientSecret: string;
    refreshToken: string;
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
      mail: {
        mailUser: envVariables.MAIL_USER,
        mailPass: envVariables.MAIL_PASS,
        oAuthClientId: envVariables.CLIENT_ID,
        oAuthClientSecret: envVariables.CLIENT_SECRET,
        refreshToken: envVariables.REFRESH_TOKEN,
      }
    };
  }

  return config;
};
