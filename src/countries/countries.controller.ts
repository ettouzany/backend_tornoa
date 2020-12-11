import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { AuthGuard } from '@nestjs/passport';
import { title } from 'process';
import { GetUser } from 'src/auth/getUser.decoretor';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { GetCountriesFillter } from './dto/get-countries-fillter';
import { CountryCreateValidationPipe } from './dto/pipes/create-country-validation-pipe';
import { extname } from 'path';
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('countries')
@UseGuards(AuthGuard())
export class CountriesController {
    constructor(
        private countriesService: CountriesService,
    ){}
    
    @Get()
    getCountries(
        @Query(ValidationPipe) getCountriesFillter:GetCountriesFillter,
        @GetUser() user:User,
        ) : Promise<Country[]>{
        return this.countriesService.getCountries(getCountriesFillter,user);
    }

    @Get(':id')
    getCountryByid(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<Country>{
        return this.countriesService.getCountryById(id);
    }


    @Post()
    @UseInterceptors(FileInterceptor('logo', {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    @UsePipes(ValidationPipe)
    createCountry(
        @Body() createCountryDto : CreateCountryDto,
        @GetUser() user:User,
        @UploadedFile() logo
    ) : Promise<Country>{
        console.log(logo);
        return this.countriesService.createCountry(createCountryDto,logo, user);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('logo', {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    @UsePipes(ValidationPipe)
    UpdateCountryById(
        @Param('id',ParseIntPipe) id:number,
        @Body() createCountryDto : CreateCountryDto,
        @GetUser() user:User,
        @UploadedFile() logo
    ) : Promise<Country>{
                return this.countriesService.UpdateCountryById(id,createCountryDto,logo,user);
    }

    @Delete(':id')
    deleteCountryById(@Param('id',ParseIntPipe) id:number,@GetUser() user:User) : Promise<number>{
        return this.countriesService.deleteCountryById(id,user);
    }
}
