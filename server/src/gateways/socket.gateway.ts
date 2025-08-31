import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface OnlineUser {
  userId: string;
  socketId: string;
}

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private onlineUsers: OnlineUser[] = [];

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.onlineUsers.push({ userId, socketId: client.id });
      this.server.emit('update_online_users', this.getOnlineUsers());
    }
  }

  handleDisconnect(client: Socket) {
    this.onlineUsers = this.onlineUsers.filter((u) => u.socketId !== client.id);
    this.server.emit('update_online_users', this.getOnlineUsers());
  }

  @SubscribeMessage('get_online_users')
  sendOnlineUsers(client: Socket) {
    client.emit('update_online_users', this.getOnlineUsers());
  }

  getOnlineUsers(): string[] {
    return this.onlineUsers.map((u) => u.userId);
  }
}
