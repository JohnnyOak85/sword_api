import { Sequelize } from 'sequelize';
import { initTask, initUser } from '../classes';

export const initClasses = (sequelize: Sequelize) => {
    initUser(sequelize);
    initTask(sequelize);
};
