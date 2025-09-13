import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from 'src/movies/movies.module';
import { ActorsModule } from 'src/cast/cast.module';
import { UsersModule } from 'src/users/users.module';
import { StudiosModule } from 'src/studios/studios.module';
import { SocketGateway } from './gateways/socket.gateway';
import { CategoriesModule } from './categories/categories.module';
import { GenresModule } from './genres/genres.module';
import { CountriesModule } from './countries/countries.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://Shoxruxasadov:Sh4157833@moviego.5164gwd.mongodb.net/?retryWrites=true&w=majority&appName=MovieGo`,
      { dbName: 'moviego' },
    ),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.sendgrid.net',
    //     auth: {
    //       user: 'apikey',
    //       pass: process.env.SENDGRID_API_KEY,
    //     },
    //   },
    //   // template: {
    //   //   dir: join(__dirname, 'mails'),
    //   //   adapter: new HandlebarsAdapter(),
    //   // },
    // }),
    // StreamModule,
    AdminModule,
    UsersModule,
    MoviesModule,
    StudiosModule,
    CategoriesModule,
    CountriesModule,
    GenresModule,
    ActorsModule,
  ],
  providers: [SocketGateway],
})
export class AppModule {}
