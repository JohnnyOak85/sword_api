import { TaskModel } from '../classes';
import { Task } from '../interfaces';

export const getAllTasks = async () => {
    try {
        const tasks = await TaskModel.findAll();

        return tasks.map(task => task.toJSON());
    } catch (error) {
        throw error;
    }
};

export const getUserTasks = async (userId: string) => {
    try {
        const tasks = await TaskModel.findAll({ where: { userId } });

        return tasks.map(task => task.toJSON());
    } catch (error) {
        throw error;
    }
};

export const createTask = async (userId: number, summary: string) => {
    try {
        const createdTask = await TaskModel.create({ id: 1, summary, userId });

        return createdTask.toJSON();
    } catch (error) {
        throw error;
    }
};

export const updateTask = async (userId: string, task: Task) => {
    try {
        const [, rows] = await TaskModel.update(task, {
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
        await TaskModel.destroy({ where: { id } });

        return { ok: true };
    } catch (error) {
        throw error;
    }
};
