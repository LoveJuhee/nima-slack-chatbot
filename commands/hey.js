var slackTerminal = require('slack-terminalize'),
  commands = slackTerminal.getCommandObjects(),
  util = require('../util');

var _helpAll = function () {
  var response = [];
  response.push('왜요? 왜 불렀어요? 할 말 있어요?');
  return response.join('\n\n');
};

var _helpCommand = function (name) {
  var response;
  var command = commands[name];
  if (command) {
    response = [command.help, 'Alias: ' + command.alias.join(', '), command.description];
    response.join('\n\n');
  } else {
    response = "뭐라고요? ";
  }
  return response;
};

module.exports = function (param) {
  var channel = param.channel,
    response;

  if (!param.args.length) {
    response = _helpAll();
  } else {
    response = _helpCommand(param.args[0]);
  }

  util.postMessage(channel, response);
};
