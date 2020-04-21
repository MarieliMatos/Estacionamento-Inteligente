'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});

  const params = {
    TableName: "Estacionamento",
    Item: {
      vaga: "C01",
      placa: "asd 4567",
      status: 1
    }
  }

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}