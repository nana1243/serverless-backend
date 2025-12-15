import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { ChatEntity, ChatEntitySchema } from '@libs/domain/models/chatModel';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const ddbClient = new DynamoDBClient({});
const CHAT_TABLE = process.env.CHAT_ROOM_TABLE_NAME;

export class ChatRepository {
  async getUserChatById(chatId: string): Promise<ChatEntity | null> {
    const params = {
      TableName: CHAT_TABLE,
      Key: {
        userId: { S: chatId }
      }
    };
    const { Item } = await ddbClient.send(new GetItemCommand(params));
    if (!Item) {
      return null;
    }
    const unmarshalledItem = unmarshall(Item);
    return ChatEntitySchema.parse(unmarshalledItem);
  }

  async getUserChats(userId: string): Promise<ChatEntity[]> {
    const params = {
      TableName: CHAT_TABLE,
      IndexName: 'UserIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: {
        ':uid': { S: userId }
      }
    };

    try {
      const { Items } = await ddbClient.send(new QueryCommand(params));
      if (!Items) {
        return [];
      }
      return Items.map(item => ChatEntitySchema.parse(unmarshall(item)));
    } catch (error) {
      console.error('Error fetching user chats:', error);
      return [];
    }
  }
}