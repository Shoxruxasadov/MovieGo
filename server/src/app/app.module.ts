import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from 'src/movies/movies.module';
import { ActorsModule } from 'src/actors/actors.module';
import { UsersModule } from 'src/users/users.module';
import { StudiosModule } from 'src/studios/studios.module';
import { FamousModule } from 'src/famous/famous.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://Shoxruxasadov:Sh4157833@moviego.5164gwd.mongodb.net/?retryWrites=true&w=majority&appName=MovieGo`,
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
    UsersModule,
    MoviesModule,
    FamousModule,
    StudiosModule,
    ActorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
