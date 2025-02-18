import { Response, Request, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_TOKEN_SECRET;

export function verifyUser(req: Request, res: Response, next: NextFunction){
    try {
        
        const token = extractJWTToken(req.headers);

        if( !token ) throw new Error('No proper JWT token found');
        
        const isValid = jwt.verify(token, secret);
        
        if( !isValid ) throw new Error('Unauthorized');
        return next();
        
    } catch (error) {
        console.log('Error authorizing token', error.message);
        res.status(403).json({message:"Unauthorized"})
    }
}

export function verifyAuthorizedRole(req: Request, res: Response, next: NextFunction){
    try {
        let token = extractJWTToken(req.headers);

        if( !token ) throw new Error('No token found');
        const data = jwt.decode(token, secret);

        if( data && data.role === 'admin' ){
            return next();
        }
        
        res.status(403).json({message:'Administrator permission required'});
    } catch (error) {
        console.log('Error verifying role', error.message);
        res.status(500).json({message:'Internal server error'});
    }
}

function extractJWTToken(headers: IncomingHttpHeaders) {
    try {
        let token = '';
        const authHeader = headers['authorization'];

        if( !authHeader ) throw new Error('No authorization header found');
        token = authHeader.split(' ')[1];

        if( !token ) throw new Error('No token found');
        return token;
        
    } catch (error) {
        console.log('Error extracting token', error.message);
        return null;
    }

}