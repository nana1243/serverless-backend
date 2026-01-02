import { ConnectionRepository } from '@libs/domain/repositories/connectionRepository';

interface websocketConnectServiceRequestSchema {
  connectionRepository: ConnectionRepository;
  connectionId: string;
  userId: string;
  roomId?: string;
}



export {
  websocketConnectServiceRequestSchema
}