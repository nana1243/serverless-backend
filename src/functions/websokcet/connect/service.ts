import { websocketConnectServiceRequestSchema } from '@functions/websokcet/connect/schema';


const websocketConnectService = async (props: websocketConnectServiceRequestSchema) => {
  const { connectionRepository, connectionId, userId, roomId } = props;


  await connectionRepository.postConnection(connectionId, userId, roomId);

};

export default websocketConnectService;