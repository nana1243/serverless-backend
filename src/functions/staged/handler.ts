const getS3Object = async () => {
    const s3Object = {
        id: '123',
        name: 'My S3 Object',
        bucket: 'my-s3-bucket',
    };

    return formatJSONResponse({
        data: s3Object,
    });
};

export const main = middyfy(getS3Object);