import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthSignupCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dto/auth-signin-credentials.dto';
import { PlayerCredentialsDto } from './dto/player-credentials.dto';
import { GetUser } from './getUser.decoretor';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authSignupCredentialsDto:AuthSignupCredentialsDto) :Promise<void> {
        return this.authService.signUp(authSignupCredentialsDto);

    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authSigninCredentialsDto:AuthSigninCredentialsDto) :Promise<{accessToken:string}> {
        console.log("isentered");
        return this.authService.signIn(authSigninCredentialsDto);
    }

    @Post('/player')
    addPlayer(@Body(ValidationPipe) playerCredentialsDto:PlayerCredentialsDto) :Promise<void> {

        return this.authService.addPlayer(playerCredentialsDto);
    }

    @Post('/player')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        return user;
    }
}
