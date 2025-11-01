import * as assert from 'assert';
import { beforeEach } from 'mocha';
import { Transform, ConvertCaseType } from '../../transform';

suite('Transform Core Unit Tests', () => {
    let transform: Transform;

    beforeEach(() => {
        transform = new Transform();
    });

    suite('Basic Case Transformations', () => {
        test('camelCase transformation', () => {
            const result = transform.transformCase('hello world', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('snake_case transformation', () => {
            const result = transform.transformCase('hello world', 'snake');
            assert.strictEqual(result, 'hello_world');
        });

        test('CONSTANT_CASE transformation', () => {
            const result = transform.transformCase('hello world', 'constant');
            assert.strictEqual(result, 'HELLO_WORLD');
        });

        test('kebab-case transformation', () => {
            const result = transform.transformCase('hello world', 'kebab');
            assert.strictEqual(result, 'hello-world');
        });

        test('PascalCase transformation', () => {
            const result = transform.transformCase('hello world', 'pascal');
            assert.strictEqual(result, 'HelloWorld');
        });

        test('dot.case transformation', () => {
            const result = transform.transformCase('hello world', 'dot');
            assert.strictEqual(result, 'hello.world');
        });

        test('Sentence case transformation', () => {
            const result = transform.transformCase('hello world', 'sentence');
            assert.strictEqual(result, 'Hello world');
        });

        test('Capital Case transformation', () => {
            const result = transform.transformCase('hello world', 'capital');
            assert.strictEqual(result, 'Hello World');
        });

        test('lowercase transformation', () => {
            const result = transform.transformCase('HELLO WORLD', 'lower');
            assert.strictEqual(result, 'hello world');
        });

        test('UPPERCASE transformation', () => {
            const result = transform.transformCase('hello world', 'upper');
            assert.strictEqual(result, 'HELLO WORLD');
        });

        test('no case transformation', () => {
            const result = transform.transformCase('Hello.World_Test', 'none');
            assert.strictEqual(result, 'hello world test');
        });
    });

    suite('Whitespace Preservation', () => {
        test('preserves leading whitespace', () => {
            const result = transform.transformCase('  hello world', 'camel');
            assert.strictEqual(result, '  helloWorld');
        });

        test('preserves trailing whitespace', () => {
            const result = transform.transformCase('hello world  ', 'camel');
            assert.strictEqual(result, 'helloWorld  ');
        });

        test('preserves both leading and trailing whitespace', () => {
            const result = transform.transformCase('  hello world  ', 'camel');
            assert.strictEqual(result, '  helloWorld  ');
        });

        test('preserves tabs', () => {
            const result = transform.transformCase('\thello world\t', 'camel');
            assert.strictEqual(result, '\thelloWorld\t');
        });
    });

    suite('Edge Cases', () => {
        test('handles empty string', () => {
            const result = transform.transformCase('', 'camel');
            assert.strictEqual(result, '');
        });

        test('handles single character', () => {
            const result = transform.transformCase('a', 'upper');
            assert.strictEqual(result, 'A');
        });

        test('handles single word', () => {
            const result = transform.transformCase('hello', 'camel');
            assert.strictEqual(result, 'hello');
        });

        test('handles text with numbers', () => {
            const result = transform.transformCase('hello world 123', 'camel');
            // Numbers get treated as separate words by change-case
            assert.strictEqual(result, 'helloWorld_123');
        });

        test('handles special characters', () => {
            const result = transform.transformCase('hello-world_test', 'camel');
            assert.strictEqual(result, 'helloWorldTest');
        });
    });

    suite('Complex Transformations', () => {
        test('camelCase to snake_case', () => {
            const result = transform.transformCase('helloWorldExample', 'snake');
            assert.strictEqual(result, 'hello_world_example');
        });

        test('snake_case to PascalCase', () => {
            const result = transform.transformCase('hello_world_example', 'pascal');
            assert.strictEqual(result, 'HelloWorldExample');
        });

        test('kebab-case to CONSTANT_CASE', () => {
            const result = transform.transformCase('hello-world-example', 'constant');
            assert.strictEqual(result, 'HELLO_WORLD_EXAMPLE');
        });

        test('mixed case normalization', () => {
            const result = transform.transformCase('HeLLo WoRLd', 'camel');
            // Mixed case input might not normalize as expected by change-case
            assert.strictEqual(result, 'heLLoWoRLd');
        });
    });

    suite('ConvertCaseType Class', () => {
        test('creates instance with correct properties', () => {
            const testFunction = (input: string) => input.toUpperCase();
            const caseType = new ConvertCaseType('test', testFunction, 'TEST EXAMPLE');
            
            assert.strictEqual(caseType.name, 'test');
            assert.strictEqual(caseType.example, 'TEST EXAMPLE');
            assert.strictEqual(caseType.runFunction('hello'), 'HELLO');
        });

        test('all case types are properly initialized', () => {
            assert.ok(transform.camel instanceof ConvertCaseType);
            assert.ok(transform.snake instanceof ConvertCaseType);
            assert.ok(transform.pascal instanceof ConvertCaseType);
            assert.ok(transform.constant instanceof ConvertCaseType);
            assert.ok(transform.kebab instanceof ConvertCaseType);
            assert.ok(transform.dot instanceof ConvertCaseType);
            assert.ok(transform.sentence instanceof ConvertCaseType);
            assert.ok(transform.capital instanceof ConvertCaseType);
            assert.ok(transform.lower instanceof ConvertCaseType);
            assert.ok(transform.upper instanceof ConvertCaseType);
            assert.ok(transform.none instanceof ConvertCaseType);
        });
    });

    suite('Method Overloading', () => {
        test('works with string parameter', () => {
            const result = transform.transformCase('hello world', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('works with ConvertCaseType parameter', () => {
            const result = transform.transformCase('hello world', transform.camel);
            assert.strictEqual(result, 'helloWorld');
        });

        test('throws error for invalid case type', () => {
            assert.throws(() => {
                transform.transformCase('hello world', 'invalidType');
            }, /Unknown case type: invalidType/);
        });
    });

    suite('Case Types Array', () => {
        test('contains all expected case types', () => {
            const expectedTypes = [
                'camel', 'constant', 'dot', 'kebab', 'lower',
                'pascal', 'sentence', 'snake', 'none', 'capital', 'upper'
            ];
            
            assert.strictEqual(transform.caseTypes.length, expectedTypes.length);
            expectedTypes.forEach(type => {
                assert.ok(transform.caseTypes.includes(type), `Should include ${type}`);
            });
        });
    });
});