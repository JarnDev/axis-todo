import { postgresConstants } from '../constants/index';
export const development = {
  dialect: 'postgres',
  host: postgresConstants.host,
  port: postgresConstants.port,
  username: postgresConstants.user,
  password: postgresConstants.password,
  database: postgresConstants.database,
};
export const test = {
  dialect: 'postgres',
  host: postgresConstants.host,
  port: postgresConstants.test_port,
  username: postgresConstants.user,
  password: postgresConstants.password,
  database: postgresConstants.database,
};
