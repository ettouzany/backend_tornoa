import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignupCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dto/auth-signin-credentials.dto';
import { PlayerCredentialsDto } from './dto/player-credentials.dto';
import { JwtPayload } from './jwt/jwt.paylaod.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jtwServise: JwtService,
    ){}

    async signUp(authSignupCredentialsDto:AuthSignupCredentialsDto) : Promise<void>{
        return this.userRepository.signUp(authSignupCredentialsDto);
    }
    
    async signIn(authSigninCredentialsDto:AuthSigninCredentialsDto) :Promise<{accessToken:string}> {
        const user = await this.userRepository.validateUser(authSigninCredentialsDto);
        console.log(user);

        if(!user){
            throw new UnauthorizedException("invalide credentials");
        }

        const payload :JwtPayload = { username:user.username,role:user.role };
        const accessToken = await this.jtwServise.sign(payload);

        return { accessToken }
    }

    async addPlayer(playerCredentialsDto:PlayerCredentialsDto) : Promise<void>{
        return this.userRepository.addPlayer(playerCredentialsDto);
    }
}
