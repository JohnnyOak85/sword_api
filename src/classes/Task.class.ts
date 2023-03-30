import { Sequelize, Model, DataTypes } from 'sequelize';
import { Task } from '../interfaces';

class TaskClass extends Model<Task> {}

const TaskModel = {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    performedAt: { type: DataTypes.INTEGER, allowNull: true },
    summary: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
};

export const initTask = (sequelize: Sequelize) => {
    TaskClass.init(TaskModel, { sequelize, modelName: 'Task' });
};

export const getAllTasks = async () => {
    try {
        const tasks = await TaskClass.findAll();

        return tasks.map(task => task.toJSON());
    } catch (error) {
        throw error;
    }
};

export const getUserTasks = async (userId: string) => {
    try {
        const tasks = await TaskClass.findAll({ where: { userId } });

        return tasks.map(task => task.toJSON());
    } catch (error) {
        throw error;
    }
};

export const createTask = async (userId: number, summary: string) => {
    try {
        const createdTask = await TaskClass.create({ id: 1, summary, userId });

        return createdTask.toJSON();
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (userId: string, task: Task) => {
    try {
        const [, rows] = await TaskClass.update(task, {
            where: { id: task.id, userId },
            returning: true
        });

        return rows[0].toJSON();
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id: string) => {
    try {
        await TaskClass.destroy({ where: { id } });

        return { ok: true };
    } catch (error) {
        throw error;
    }
};
