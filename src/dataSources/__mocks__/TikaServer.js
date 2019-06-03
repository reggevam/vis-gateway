const request = require('request');
const { RESTDataSource } = require('apollo-datasource-rest');
const mockText = require('./../../../fixtures/ner-text');

class TikaServer extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.TIKA_URL) {
      throw new Error('missing environment variable: TIKA_URL');
    }
    this.baseURL = process.env.TIKA_URL;
  }

  sayHello() {
    return this.get('/tika');
  }

  async parseFile() {
    return mockText;
  }
}

module.exports = TikaServer;
