import ProcessEnv = NodeJS.ProcessEnv;

const appConfig = {
  APP_NAME: process.env.APP_NAME || 'test-dwp-svc',
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_PORT: process.env.APP_PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  API_URL: process.env.API_URL || 'https://bpdts-test-app.herokuapp.com'
};

export type AppConfig = typeof appConfig;

/**
 * Generate a configuration object based on the node environment variables
 *
 * @export
 * @param {Object} env override env variables
 * @returns {Object} configuration object
 */
export default function(env: ProcessEnv) {
  return { ...appConfig, ...env };
}
