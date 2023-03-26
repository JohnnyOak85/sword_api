import { getUser } from '.';
import { User } from '../interfaces';

export const validate = async (decoded: User) => {
    const user = getUser(decoded.id);

    if (!user || decoded.role !== user.role) {
        return { isValid: false };
    }

    return { isValid: true };
};
