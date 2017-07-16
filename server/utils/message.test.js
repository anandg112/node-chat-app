const expect = require("expect");
const {generateMsg} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object',  () => {
    var from = "Anand";
    var text = "Hey there";
    var res = generateMsg(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text})
  });
});
