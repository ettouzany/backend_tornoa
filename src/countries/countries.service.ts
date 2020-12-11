import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import { Country } from './country.entity';
import { CountryRepository } from './countries.repository';
import { CreateCountryDto } from './dto/create-country.dto';
import { GetCountriesFillter } from './dto/get-countries-fillter';
@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(CountryRepository)
        private countriesrepository:CountryRepository,
    )
    {}
    async getCountries(getCountriesFillter:GetCountriesFillter,user:User) : Promise<Country[]>{
        return this.countriesrepository.getCountries(getCountriesFillter,user);
    }

    async getCountryById(id:number) : Promise<Country>{
        const found = await this.countriesrepository.findOne({where:{id}});
        //const found = await this.countriesrepository.findOne(id);
        if(!found)
            throw new NotFoundException();
        else
            return found;
    }

    async createCountry(createCountryDto : CreateCountryDto,image:any, user: User) : Promise<Country>{
        return this.countriesrepository.createCountry(createCountryDto, image, user);
     }
    async UpdateCountryById(id:number,createCountryDto : CreateCountryDto,image:any,user:User) : Promise<Country>{
        const country: Country = await this.getCountryById(id);
        const {name} = createCountryDto;
        country.name = name;
        country.save();
        return country;
    }

    async deleteCountryById(id:number, user: User):Promise<number>{
        const found = await this.countriesrepository.delete({id});
        return found.affected;
    }
}
