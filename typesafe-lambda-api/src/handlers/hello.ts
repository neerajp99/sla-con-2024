import { APIGatewayProxyHandler } from "aws-lambda";
import { HelloGetRequest } from "../client/apis/DefaultApi";
import { HelloGet200Response } from "../client";

export const handler: APIGatewayProxyHandler = async (event) => {
  const query = event.queryStringParameters as HelloGetRequest;
  const name = query?.name || "World";
  const response: HelloGet200Response = {
    message: `Hello, ${name}!`,
  };

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
    body: JSON.stringify(response),
  };
};
