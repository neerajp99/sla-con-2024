import { APIGatewayProxyHandler } from "aws-lambda";
import {} from "../client/apis/DefaultApi";
import { v4 as uuidv4 } from "uuid";
import { UsersPost201Response, UsersPostRequest } from "../client";

export const handler: APIGatewayProxyHandler = async (event) => {
  const body = JSON.parse(event.body || "{}") as UsersPostRequest;

  if (!body.name || !body.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Name and email are required" }),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
    };
  }

  const user: UsersPost201Response = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
  };

  return {
    statusCode: 201,
    body: JSON.stringify(user),
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
  };
};
