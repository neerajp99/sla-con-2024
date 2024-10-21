# Serverless.yml Configuration Guide

The `serverless.yml` file is the core configuration file for Serverless Framework projects. It defines your service, provider settings, functions, and more. Here's a breakdown of a typical `serverless.yml` file:

```yaml
service: typesafe-lambda-api

provider:
  name: aws
  runtime: nodejs18.x
  stage: ${opt:stage, 'dev'}
  region: 'us-east-1'
  profile: ${opt:profile, 'default'}

functions:
  hello:
    handler: src/handlers/hello.handler
    events:
      - http:
          path: hello
          method: get
  users:
    handler: src/handlers/users.handler
    events:
      - http:
          path: users
          method: any

plugins:
  - serverless-offline
  - serverless-plugin-typescript

custom:
  serverless-offline:
    httpPort: 3000
    noPrependStageInUrl: true

package:
  individually: true
  exclude:
    - node_modules/**
```

## Sections Explained

### Service
```yaml
service: typesafe-lambda-api
```
This defines the name of your service. It's used as a prefix for your Lambda functions and other resources.

### Provider
```yaml
provider:
  name: aws
  runtime: nodejs18.x
  stage: ${opt:stage, 'dev'}
  region: 'us-east-1'
  profile: ${opt:profile, 'default'}
```
- `name`: The cloud provider (AWS in this case)
- `runtime`: The runtime environment for your functions
- `stage`: Deployment stage (uses command line option or defaults to 'dev')
- `region`: AWS region to deploy to
- `profile`: AWS credentials profile to use

### Functions
```yaml
functions:
  hello:
    handler: src/handlers/hello.handler
    events:
      - http:
          path: hello
          method: get
  users:
    handler: src/handlers/users.handler
    events:
      - http:
          path: users
          method: any
```
Defines your Lambda functions:
- `handler`: Path to the function code
- `events`: Triggers for the function (HTTP endpoints in this case)

### Plugins
```yaml
plugins:
  - serverless-offline
  - serverless-plugin-typescript
```
List of Serverless Framework plugins to use:
- `serverless-offline`: Emulates AWS λ and API Gateway locally
- `serverless-plugin-typescript`: Enables TypeScript support

### Custom
```yaml
custom:
  serverless-offline:
    httpPort: 3000
    noPrependStageInUrl: true
```
Custom settings, in this case for the serverless-offline plugin.

### Package
```yaml
package:
  individually: true
  exclude:
    - node_modules/**
```
Packaging settings:
- `individually`: Package each function separately
- `exclude`: Files/folders to exclude from the deployment package

## How to Create serverless.yml

1. Create a new file named `serverless.yml` in your project root.
2. Copy the template above into the file.
3. Modify the settings according to your project needs:
   - Update the `service` name
   - Adjust the `provider` settings (runtime, region, etc.)
   - Define your `functions`
   - Add necessary `plugins`
   - Configure any `custom` settings
   - Set `package` options as needed
4. Save the file and use it with the Serverless Framework CLI commands.

Remember to install the Serverless Framework and any plugins you've specified in the `plugins` section.