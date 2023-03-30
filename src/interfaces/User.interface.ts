export type UserRole = 'manager' | 'technician';

export interface User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
}
