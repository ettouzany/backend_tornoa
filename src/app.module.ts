import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { EntitesModule } from './entites/entites.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TeamsModule } from './teams/teams.module';
import { PlatformsModule } from './platforms/platforms.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CoursesModule,
    EntitesModule,
    TournamentsModule,
    TeamsModule,
    PlatformsModule,
    CountriesModule,
    AuthModule],
})
export class AppModule {}
