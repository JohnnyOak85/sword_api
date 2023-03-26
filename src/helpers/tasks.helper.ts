import { notFound } from '@hapi/boom';
import { v4 } from 'uuid';
import { TaskData, UserRole } from '../interfaces';

interface Task {
    createdAt: number;
    id: string;
    performedAt?: number;
    summary: string;
    updatedAt?: number;
    userId: string;
}

let tasks: Task[] = [
    {
        id: '1',
        summary: 'Some random task',
        userId: '1',
        createdAt: 1
    },
    {
        id: '2',
        summary: 'Some other task',
        userId: '3',
        createdAt: 1
    }
];

const getUpdatedTask = (task: Task, { performed, summary }: TaskData): Task => {
    if (performed) {
        task.performedAt = new Date().valueOf();
    }

    return {
        ...task,
        summary,
        updatedAt: new Date().valueOf()
    };
};

export const getTasks = (id: string, role: UserRole) => {
    try {
        return role === 'manager' ? tasks : tasks.filter(({ userId }) => userId === id);
    } catch (error) {
        throw error;
    }
};

export const createTask = (id: string, { summary }: TaskData) => {
    try {
        tasks.push({ id: v4(), summary, userId: id, createdAt: new Date().valueOf() });

        return { OK: true };
    } catch (error) {
        throw error;
    }
};

export const updateTask = (userId: string, taskId: string, updatedTask: TaskData) => {
    try {
        const task = tasks.find(task => task.id === taskId);
        if (!task) {
            throw notFound();
        }

        tasks = tasks.map(task =>
            task.id === taskId && task.userId === userId ? getUpdatedTask(task, updatedTask) : task
        );

        return { OK: true };
    } catch (error) {
        throw error;
    }
};

export const deleteTask = (id: string) => {
    try {
        tasks = tasks.filter(task => task.id !== id);

        return { OK: true };
    } catch (error) {
        throw error;
    }
};
