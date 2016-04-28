import {Stream} from 'stream';
import * as test from 'blue-tape';

import * as npmlog from 'npmlog';

let resultExpect = [
  '\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[7msill\u001b[0m \u001b[0m\u001b[35msilly prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',
  '\u001b[0m\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[34m\u001b[40mverb\u001b[0m \u001b[0m\u001b[35mverbose prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',
  '\u001b[0m\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[32minfo\u001b[0m \u001b[0m\u001b[35minfo prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',
  '\u001b[0m\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[32m\u001b[40mhttp\u001b[0m \u001b[0m\u001b[35mhttp prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',
  '\u001b[0m\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[30m\u001b[43mWARN\u001b[0m \u001b[0m\u001b[35mwarn prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',
  '\u001b[0m\u001b[37m\u001b[40mnpm\u001b[0m \u001b[0m\u001b[31m\u001b[40mERR!\u001b[0m \u001b[0m\u001b[35merror prefix\u001b[0m x = {"foo":{"bar":"baz"}}\n',

  '\u001b[0m'
];

let result = [];
let stream: any = new Stream();
stream.write = function (message) {
  result.push(message);
};

stream.writable = true;
stream.isTTY = true;
stream.end = function () {};

npmlog.stream = stream;

npmlog.heading = 'npm';

test('request', (t) => {
  t.plan(1);
  npmlog.level = 'silly';
  npmlog.silly('silly prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.verbose('verbose prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.info('info prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.http('http prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.warn('warn prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.error('error prefix', 'x = %j', {foo:{bar:'baz'}});
  npmlog.silent('silent prefix', 'x = %j', {foo:{bar:'baz'}});

  t.deepEqual(result.join('').trim(), resultExpect.join('').trim(), 'result');
});
