import {  IsNotEmpty, IsOptional } from "class-validator";

export class GetCountriesFillter{
    @IsOptional()
    name:string;
    

}