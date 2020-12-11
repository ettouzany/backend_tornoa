import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthSignupCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthSigninCredentialsDto } from './dto/auth-signin-credentials.dto';
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { PlayerCredentialsDto } from "./dto/player-credentials.dto";
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authSignupCredentialsDto: AuthSignupCredentialsDto) : Promise<void>{
        const {username,email,country,password} = authSignupCredentialsDto;


        const user = new User();
        user.email = email;
        user.username = username;
        user.country = country;
        user.first_name = user.last_name = user.time_zone = user.organization = user.position = user.role = '';
        user.valid = false;

        user.salt = await bcrypt.genSalt();
        user.password = await this.hashcode(password, user.salt);
        try{
            await user.save();
        } catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exists');
            }
            else{
                throw new InternalServerErrorException();
            }
        }

    }


    async addPlayer(playerCredentials: PlayerCredentialsDto) : Promise<void>{
        const {email,first_name,last_name} = playerCredentials;


        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;

        try{
            await user.save();
        } catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exists');
            }
            else{
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUser(authSigninCredentialsDto: AuthSigninCredentialsDto) : Promise<User>{
        const {username,password} = authSigninCredentialsDto;
        const user = await this.findOne({
            where: [{email: username},{username: username}]
          });

            if(user && user.validatePassword(password))
                return user;
            else 
                return null
        
    }

    private async hashcode(password:string, salt:string) : Promise<string>{
        return bcrypt.hash(password, salt);
    }
}