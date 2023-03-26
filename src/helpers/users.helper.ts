import { User } from '../interfaces';

const users: User[] = [
    {
        id: '1',
        username: 'alice',
        password: '$2b$10$QJnsvZmxuP850.qzKDzvyOddO7.OdhzaX8onE6X4rDSaihc3kEbRW', //password123
        role: 'technician'
    },
    {
        id: '2',
        username: 'bob',
        password: '$2b$10$piJqaKoAzu5/u895B43HpOtrlBL6kZO6cErqbzNs10YGsPR2LWoE6', // password456
        role: 'manager'
    }
];

export const getUser = (id: string) => users.find(user => user.id === id);
