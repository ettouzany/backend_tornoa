import {TypeOrmModuleOptions} from '@nestjs/typeorm';
// export const typeOrmConfig:TypeOrmModuleOptions ={
//     type:'postgres',
//     host:'ec2-52-31-94-195.eu-west-1.compute.amazonaws.com',
//     port:5432,
//     username:'dxrdlgtqxtixbx',
//     password:'7a3ef1e77122582c79960920d8b375712981de891be6acb5561ad33471953462',
//     database:'d1mja0cjft30k7',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true
// }

export const typeOrmConfig:TypeOrmModuleOptions ={
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'postgres',
    database:'Courses',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}