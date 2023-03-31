import { findUserById } from '../controllers';
import { User } from '../interfaces';

export const validate = async (decoded: User) => {
    const user = await findUserById(decoded.id);

    if (!user || decoded.role !== user.role) {
        return { isValid: false };
    }

    return { isValid: true };
};
