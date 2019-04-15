# PNV (Phone Numbers Verification) API

## Description

A simple API to verify users' phone number

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Documentation

This project automatically generates a OpenAPI(Swagger) specification based document 📑 that is exposed using Swagger UI  
After running the project just go to: [http://localhost:3000/developers](http://localhost:3000/developers)  
This UI also serves as a rest client. So every requests to the API can be tested directly from your browser 👍

## Architecture

### Class Diagrams

<img src="./diagrams/classes-diagram.png" width="880" alt="Get verification code process diagram" />

### Process Diagrams

<img src="./diagrams/get-verification-code-process-diagram.png" width="880" alt="Get verification code process diagram" />

<img src="./diagrams/verify-phone-number-with-code-process-diagram.png" width="880" alt="Get verification code process diagram" />
