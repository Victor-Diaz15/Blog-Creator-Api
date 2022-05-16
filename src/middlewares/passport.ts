import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { IPayload } from "../interfaces/payload.interface";
import userService from "../services/user.service";

const jwtSecret: string =  process.env.JWT_SECRET || 'somesecrettoken';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
    secretOrKey: jwtSecret
};

export const ValidateToken = new Strategy(opts,
    async (payload: IPayload, done) => {
        try {
            const user = await userService.UserExist(payload.email);
            if(!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    
});