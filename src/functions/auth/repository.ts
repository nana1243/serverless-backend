import { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import { UserEntity } from './models';

const ddbClient = new DynamoDBClient({});
const USER_TABLE = process.env.USER_TABLE_NAME; // 환경 변수 사용

export class UserRepository {
  async getUserById(id: string): Promise<UserEntity | null> {
    const params = {
      TableName: USER_TABLE,
      Key: marshall({ id }), // JS 객체를 DDB 형식(AttributeValue)으로 변환
    };

    const { Item } = await ddbClient.send(new GetItemCommand(params));

    if (!Item) {
      return null;
    }
    return unmarshall(Item) as UserEntity;
  }

  async saveUser(user: UserEntity): Promise<void> {
    const params = {
      TableName: USER_TABLE,
      Item: marshall(user), // User 객체를 DDB 형식으로 변환
    };

    await ddbClient.send(new PutItemCommand(params));
  }

  async deleteUser(id: string): Promise<void> {
    const params = {
      TableName: USER_TABLE,
      Key: marshall({ id }),
    };
    await ddbClient.send(new DeleteItemCommand(params));
  }
}
