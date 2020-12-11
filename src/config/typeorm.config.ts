import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const typeOrmConfig:TypeOrmModuleOptions ={
    type:'postgres',
    host:'ec2-23-23-88-216.compute-1.amazonaws.com',
    port:5432,
    username:'ojdhjrosxhedns',
    password:'59ac9676ea0cf7b6e3b1f7d68e131c65049b59d31f91801da84bfc9628414fa5',
    database:'dedunskuvru9nm',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}

// export const typeOrmConfig:TypeOrmModuleOptions ={
//     type:'postgres',
//     host:'localhost',
//     port:5432,
//     username:'postgres',
//     password:'postgres',
//     database:'Courses',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: true
// }