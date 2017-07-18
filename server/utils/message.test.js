const expect = require("expect");
const {generateMsg, generateLocationMsg} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object',  () => {
    var from = "Anand";
    var text = "Hey there";
    var res = generateMsg(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});

describe('generateLocationMsg', () => {
  it('should generate correct location object', () => {
    var from = "Anand";
    var lat = 39.93;
    var long = -75.17;
    var url = "https://www.google.com/maps?q=39.93,-75.17";
    var res = generateLocationMsg('Anand', lat, long);


    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, url});
    expect(res.url).toBe(url);

  });
});
