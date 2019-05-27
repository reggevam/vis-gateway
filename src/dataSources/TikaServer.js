const request = require('request');
const { RESTDataSource } = require('apollo-datasource-rest');
const { Buffer } = require('buffer');

const bufferFromStream = stream =>
  new Promise(res => {
    const data = [];

    stream.on('data', chunk => {
      data.push(chunk);
    });

    stream.on('end', () => {
      res(Buffer.concat(data));
    });
  });

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

  async parseFile({ createReadStream }) {
    const fileBuffer = await bufferFromStream(createReadStream());
    return new Promise((res, rej) =>
      request.post(
        {
          url: `${this.baseURL}/tika/form`,
          formData: {
            upload: fileBuffer,
          },
          headers: {
            Accept: 'text/plain',
          },
        },
        (err, response, body) => {
          if (err) {
            return rej(err);
          }
          return res(body);
        }
      )
    );
  }
}

module.exports = TikaServer;
