import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Country } from "./country.entity";
import { CreateCountryDto } from "./dto/create-country.dto";
import { GetCountriesFillter } from "./dto/get-countries-fillter";

@EntityRepository(Country)
export class CountryRepository extends Repository<Country>{
    async getCountries(getCountriesFillter:GetCountriesFillter, user:User) : Promise<Country[]>{
        const {name} = getCountriesFillter;
        const quiry = this.createQueryBuilder('country');
        if(name){
            quiry.andWhere('country.name = :name', {name});
        }

        // if(code){
        //     quiry.andWhere('(country.title LIKE :code OR country.description LIKE :code)', {code: `%${code}%`})
        // }

        const countries = await quiry.getMany();
        return countries;
    }

    async createCountry(createCountryDto : CreateCountryDto,logo:any, user:User) : Promise<Country>{
        const {name} = createCountryDto;
        const country = new Country();

        country.name = name;
        country.logo = name;
        await country.save();
        return country;
    }
}