import * as assert from 'assert';
import { transformCase, caseTypes } from '../../transformCase.js';

suite('transformCase', () => {
  test('upper converts to uppercase', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.upper), 'HELLO WORLD');
  });

  test('lower converts to lowercase', () => {
    assert.strictEqual(transformCase('HELLO WORLD', caseTypes.lower), 'hello world');
  });

  test('camel converts to camelCase', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.camel), 'helloWorld');
  });

  test('pascal converts to PascalCase', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.pascal), 'HelloWorld');
  });

  test('kebab converts to kebab-case', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.kebab), 'hello-world');
  });

  test('snake converts to snake_case', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.snake), 'hello_world');
  });

  test('constant converts to CONSTANT_CASE', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.constant), 'HELLO_WORLD');
  });

  test('dot converts to dot.case', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.dot), 'hello.world');
  });

  test('capital converts to Capital Case', () => {
    assert.strictEqual(transformCase('hello world', caseTypes.capital), 'Hello World');
  });

  test('sentence converts to Sentence case', () => {
    assert.strictEqual(transformCase('HELLO world', caseTypes.sentence), 'Hello world');
  });

  test('none converts to no case', () => {
    assert.strictEqual(transformCase('HelloWorld', caseTypes.none), 'hello world');
  });

  test('preserves leading and trailing spaces', () => {
    assert.strictEqual(transformCase('  hello world  ', caseTypes.upper), '  HELLO WORLD  ');
  });

  test('preserves leading/trailing tabs', () => {
    assert.strictEqual(transformCase('\thello\t', caseTypes.upper), '\tHELLO\t');
  });

  test('handles empty string', () => {
    assert.strictEqual(transformCase('', caseTypes.upper), '');
  });

  test('throws for an unknown case type', () => {
    assert.throws(() => transformCase('hello', 'not-a-real-case'), /Case type not-a-real-case not found/);
  });
});
