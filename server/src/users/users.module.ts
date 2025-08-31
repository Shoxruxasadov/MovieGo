import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { SocketGateway } from 'src/gateways/socket.gateway';
import { SocketModule } from 'src/gateways/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    SocketModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
