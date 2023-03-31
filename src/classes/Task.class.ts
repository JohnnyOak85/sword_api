import { Sequelize, Model, DataTypes } from 'sequelize';
import { Task } from '../interfaces';

export class TaskModel extends Model<Task> {}

export const initTask = (sequelize: Sequelize) => {
    TaskModel.init(
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            performedAt: { type: DataTypes.INTEGER, allowNull: true },
            summary: { type: DataTypes.STRING, allowNull: false },
            userId: { type: DataTypes.INTEGER, allowNull: false }
        },
        { sequelize, tableName: 'Tasks' }
    );
};
