import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class PlayerCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(8)
    email: string;

    @IsString()
    @MinLength(1)
    @MaxLength(22)
    first_name: string;


    @IsString()
    @MinLength(1)
    @MaxLength(22)
    last_name: string;
}