interface JWT{
    generateToken(_id:string, name: string): string;
    verifyToken(token: string): string | object;
}

export default JWT;