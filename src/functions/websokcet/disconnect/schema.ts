import { ConnectionRepository } from '@libs/domain/repositories/connectionRepository';

interface DisconnectServiceRequest {
  connectionId: string;
  connectRepository: ConnectionRepository;
}


export {
  DisconnectServiceRequest
}