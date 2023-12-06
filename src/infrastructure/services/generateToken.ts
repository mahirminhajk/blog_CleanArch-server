import jwt from 'jsonwebtoken';
import JWT from '../../useCases/interfaces/jwt';

class JWTToken implements JWT{
    generateToken(_id: string, name: string): string {
        const key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ _id, name }, key as string, { expiresIn: '1h' });
        return token;
    }
};

export default JWTToken;