import { DisconnectServiceRequest } from '@functions/websokcet/disconnect/schema';


const disconnectService = async (props: DisconnectServiceRequest): Promise<void> => {
  const { connectionId, connectRepository } = props;
  await connectRepository.deleteConnection(connectionId);
};


export default disconnectService;