const defaults = {
    NODE_ENV: 'development',
    SERVER_PORT:  process.env.PORT || 3000,
    MONGODB_CONN_STRING: 'mongodb://road:road123@ds255309.mlab.com:55309/esafety',
    JWT_SECRET: 'JWT AUTHENTICATION TOKEN FOR HASHING',
    BASE_DIR: __dirname
};
  
const getEnvVariables = (name) => {
    if (process.env[name])
        return process.env[name];
    return defaults[name];
};

module.exports = {
    NODE_ENV: getEnvVariables('NODE_ENV'),
    SERVER_PORT: getEnvVariables('SERVER_PORT'),
    MONGODB_CONN_STRING: getEnvVariables('MONGODB_CONN_STRING'),
    JWT_SECRET: getEnvVariables('JWT_SECRET'),
    BASE_DIR: getEnvVariables('BASE_DIR'),
};

  