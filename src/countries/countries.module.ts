import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CountriesController } from './countries.controller';
import { CountryRepository } from './countries.repository';
import { CountriesService } from './countries.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CountryRepository]),
    AuthModule,
  ],
  controllers: [CountriesController],
  providers: [CountriesService]
})
export class CountriesModule {}
