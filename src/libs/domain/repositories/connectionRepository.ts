import { DeleteItemCommand, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { ConnectionEntitySchema } from '@libs/domain/models/connectionModel';
import { marshall } from '@aws-sdk/util-dynamodb';

const ddbClient = new DynamoDBClient({});
const CONNECTION_TABLE = process.env.CHAT_ROOM_TABLE_NAME;

export class ConnectionRepository {

  // async getConnectionById(connectionId: string) {
  //
  // }

  async postConnection(connectionId: string, userId: string, roomId?: string) {
    const item = marshall(ConnectionEntitySchema.parse({
      connectionId,
      roomId,
      userId,
      connectedAt: new Date().toISOString()
    }));

    await ddbClient.send(new PutItemCommand({
      TableName: CONNECTION_TABLE,
      Item: item
    }));
  }

  async deleteConnection(connectionId: string) {
    await ddbClient.send(new DeleteItemCommand({
      TableName: CONNECTION_TABLE,
      Key: marshall({ connectionId })
    }));
  }
}