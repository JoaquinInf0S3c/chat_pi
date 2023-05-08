import bcyrpt from 'bcryptjs';

export class UserPasswordService {
    static hash(password:string): Promise<string> {
        return bcyrpt.hash(password, 10);
    }
}