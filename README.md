# test-dwp-svc

API to handle retrieval of data from Department for Work and Pensions API.

Retrieves details of people who are listed as either living in London or whose current
coordinates are within 50 miles of London.

## Deployment
    
  - Config settings
  API_URL - URL for API  

## Running

Install Node.js
Install npm

```shell
npm install
npm start
```

## Tests

### Unit tests

```shell
npm run test
```

This will also run the coverage which is stored in a folder named coverage

## Developer Documentation

Creates documentation from the code comments

```shell
npm run docs
```
