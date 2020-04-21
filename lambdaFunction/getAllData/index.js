'use strict';
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
AWS.config.update({ region: "us-east-1"});

exports.handler = async event => {
  const params = {
    TableName: "Estacionamento" // The name of your DynamoDB table
  };
  try {
    // Utilising the scan method to get all items in the table
    const data = await documentClient.scan(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (err) {
    return {
      body: `Unable to get products: ${err}`,
      statusCode: 500
    };
  }
};