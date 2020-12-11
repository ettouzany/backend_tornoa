import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthSignupCredentialsDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(22)
    @Matches(
        /^(?=[a-zA-Z0-9._]{4,22}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        {message:"Invalid Username"},
    )
    username: string;

    @IsString()
    @IsEmail({},{message:'Invalid Email'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @MinLength(8)
    @MaxLength(22)
    @Matches(
        /((?=.*\d)|(?=.*W+))(?![.\n])(?=.*[a-z]).*$/,
        {message:"Password is too weak"},
    )
    password: string;
}