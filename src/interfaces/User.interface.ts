export type UserRole = 'manager' | 'technician';

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}
