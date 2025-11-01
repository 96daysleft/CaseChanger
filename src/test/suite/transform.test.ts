import * as assert from 'assert';
import { beforeEach } from 'mocha';
import { Transform, ConvertCaseType } from '../../transform';

suite('Transform Unit Tests', () => {
    let transform: Transform;

    beforeEach(() => {
        transform = new Transform();
    });

    suite('ConvertCaseType Class Tests', () => {
        test('should create ConvertCaseType instance with correct properties', () => {
            const mockFunction = (input: string) => input.toUpperCase();
            const caseType = new ConvertCaseType('test', mockFunction, 'TEST EXAMPLE');
            
            assert.strictEqual(caseType.name, 'test');
            assert.strictEqual(caseType.example, 'TEST EXAMPLE');
            assert.strictEqual(caseType.runFunction('hello'), 'HELLO');
        });
    });

    suite('Transform Class Initialization', () => {
        test('should initialize all case types correctly', () => {
            assert.ok(transform.camel instanceof ConvertCaseType);
            assert.ok(transform.constant instanceof ConvertCaseType);
            assert.ok(transform.dot instanceof ConvertCaseType);
            assert.ok(transform.kebab instanceof ConvertCaseType);
            assert.ok(transform.lower instanceof ConvertCaseType);
            assert.ok(transform.pascal instanceof ConvertCaseType);
            assert.ok(transform.sentence instanceof ConvertCaseType);
            assert.ok(transform.snake instanceof ConvertCaseType);
            assert.ok(transform.none instanceof ConvertCaseType);
            assert.ok(transform.capital instanceof ConvertCaseType);
            assert.ok(transform.upper instanceof ConvertCaseType);
        });

        test('should have correct case type names', () => {
            assert.strictEqual(transform.camel.name, 'camel');
            assert.strictEqual(transform.constant.name, 'constant');
            assert.strictEqual(transform.dot.name, 'dot');
            assert.strictEqual(transform.kebab.name, 'kebab');
            assert.strictEqual(transform.lower.name, 'lower');
            assert.strictEqual(transform.pascal.name, 'pascal');
            assert.strictEqual(transform.sentence.name, 'sentence');
            assert.strictEqual(transform.snake.name, 'snake');
            assert.strictEqual(transform.none.name, 'none');
            assert.strictEqual(transform.capital.name, 'capital');
            assert.strictEqual(transform.upper.name, 'upper');
        });

        test('should have correct example outputs', () => {
            assert.strictEqual(transform.camel.example, 'helloWorld');
            assert.strictEqual(transform.constant.example, 'HELLO_WORLD');
            assert.strictEqual(transform.dot.example, 'hello.world');
            assert.strictEqual(transform.kebab.example, 'hello-world');
            assert.strictEqual(transform.lower.example, 'hello world');
            assert.strictEqual(transform.pascal.example, 'HelloWorld');
            assert.strictEqual(transform.sentence.example, 'Hello world');
            assert.strictEqual(transform.snake.example, 'hello_world');
            assert.strictEqual(transform.none.example, 'hello world');
            assert.strictEqual(transform.capital.example, 'Hello world');
            assert.strictEqual(transform.upper.example, 'HELLO WORLD');
        });

        test('should populate caseTypes array correctly', () => {
            const expectedCaseTypes = [
                'camel', 'constant', 'dot', 'kebab', 'lower', 
                'pascal', 'sentence', 'snake', 'none', 'capital', 'upper'
            ];
            
            assert.strictEqual(transform.caseTypes.length, expectedCaseTypes.length);
            expectedCaseTypes.forEach(caseType => {
                assert.ok(transform.caseTypes.includes(caseType), `Case type ${caseType} should be in caseTypes array`);
            });
        });
    });

    suite('Case Transformation Tests', () => {
        const testInput = 'hello world';

        test('camel case transformation', () => {
            const result = transform.transformCase(testInput, 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('constant case transformation', () => {
            const result = transform.transformCase(testInput, 'constant');
            assert.strictEqual(result, 'HELLO_WORLD');
        });

        test('dot case transformation', () => {
            const result = transform.transformCase(testInput, 'dot');
            assert.strictEqual(result, 'hello.world');
        });

        test('kebab case transformation', () => {
            const result = transform.transformCase(testInput, 'kebab');
            assert.strictEqual(result, 'hello-world');
        });

        test('lower case transformation', () => {
            const result = transform.transformCase('HELLO WORLD', 'lower');
            assert.strictEqual(result, 'hello world');
        });

        test('pascal case transformation', () => {
            const result = transform.transformCase(testInput, 'pascal');
            assert.strictEqual(result, 'HelloWorld');
        });

        test('sentence case transformation', () => {
            const result = transform.transformCase(testInput, 'sentence');
            assert.strictEqual(result, 'Hello world');
        });

        test('snake case transformation', () => {
            const result = transform.transformCase(testInput, 'snake');
            assert.strictEqual(result, 'hello_world');
        });

        test('no case transformation', () => {
            const result = transform.transformCase('Hello.World', 'none');
            assert.strictEqual(result, 'hello world');
        });

        test('capital case transformation', () => {
            const result = transform.transformCase(testInput, 'capital');
            assert.strictEqual(result, 'Hello World');
        });

        test('upper case transformation', () => {
            const result = transform.transformCase(testInput, 'upper');
            assert.strictEqual(result, 'HELLO WORLD');
        });
    });

    suite('Overloaded transformCase Method Tests', () => {
        test('should work with string parameter', () => {
            const result = transform.transformCase('hello world', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('should work with ConvertCaseType parameter', () => {
            const result = transform.transformCase('hello world', transform.camel);
            assert.strictEqual(result, 'helloWorld');
        });

        test('should throw error for invalid string case type', () => {
            assert.throws(() => {
                transform.transformCase('hello world', 'invalidCaseType');
            }, /Unknown case type: invalidCaseType/);
        });
    });

    suite('Whitespace Preservation Tests', () => {
        test('should preserve leading whitespace', () => {
            const result = transform.transformCase('  hello world', 'camel');
            assert.strictEqual(result, '  helloWorld');
        });

        test('should preserve trailing whitespace', () => {
            const result = transform.transformCase('hello world  ', 'camel');
            assert.strictEqual(result, 'helloWorld  ');
        });

        test('should preserve leading and trailing whitespace', () => {
            const result = transform.transformCase('  hello world  ', 'camel');
            assert.strictEqual(result, '  helloWorld  ');
        });

        test('should preserve tab characters', () => {
            const result = transform.transformCase('\thello world\t', 'camel');
            assert.strictEqual(result, '\thelloWorld\t');
        });

        test('should handle mixed whitespace characters', () => {
            const result = transform.transformCase(' \thello world\t ', 'camel');
            assert.strictEqual(result, ' \thelloWorld\t ');
        });
    });

    suite('Edge Case Tests', () => {
        test('should handle empty string', () => {
            const result = transform.transformCase('', 'camel');
            assert.strictEqual(result, '');
        });

        test('should handle string with only whitespace', () => {
            const result = transform.transformCase('   ', 'camel');
            assert.strictEqual(result, '   ');
        });

        test('should handle single character', () => {
            const result = transform.transformCase('a', 'upper');
            assert.strictEqual(result, 'A');
        });

        test('should handle single word', () => {
            const result = transform.transformCase('hello', 'upper');
            assert.strictEqual(result, 'HELLO');
        });

        test('should handle text with numbers', () => {
            const result = transform.transformCase('hello world 123', 'camel');
            assert.strictEqual(result, 'helloWorld123');
        });

        test('should handle text with special characters', () => {
            const result = transform.transformCase('hello-world_test!@#', 'camel');
            assert.strictEqual(result, 'helloWorldTest');
        });

        test('should handle already transformed text', () => {
            const result = transform.transformCase('helloWorld', 'snake');
            assert.strictEqual(result, 'hello_world');
        });
    });

    suite('Complex Input Tests', () => {
        test('should handle mixed case input', () => {
            const result = transform.transformCase('HeLLo WoRLd', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('should handle camelCase input', () => {
            const result = transform.transformCase('helloWorldExample', 'snake');
            assert.strictEqual(result, 'hello_world_example');
        });

        test('should handle snake_case input', () => {
            const result = transform.transformCase('hello_world_example', 'pascal');
            assert.strictEqual(result, 'HelloWorldExample');
        });

        test('should handle kebab-case input', () => {
            const result = transform.transformCase('hello-world-example', 'camel');
            assert.strictEqual(result, 'helloWorldExample');
        });

        test('should handle dot.case input', () => {
            const result = transform.transformCase('hello.world.example', 'constant');
            assert.strictEqual(result, 'HELLO_WORLD_EXAMPLE');
        });

        test('should handle CONSTANT_CASE input', () => {
            const result = transform.transformCase('HELLO_WORLD_EXAMPLE', 'sentence');
            assert.strictEqual(result, 'Hello world example');
        });

        test('should handle text with punctuation', () => {
            const result = transform.transformCase('hello, world!', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });

        test('should handle text with multiple spaces', () => {
            const result = transform.transformCase('hello    world', 'camel');
            assert.strictEqual(result, 'helloWorld');
        });
    });

    suite('Case Type Instance Retrieval Tests', () => {
        test('should retrieve correct case type instances', () => {
            // Use type assertion to access private method for testing
            const getCaseTypeInstance = (transform as any).getCaseTypeInstance.bind(transform);
            
            assert.strictEqual(getCaseTypeInstance('camel'), transform.camel);
            assert.strictEqual(getCaseTypeInstance('constant'), transform.constant);
            assert.strictEqual(getCaseTypeInstance('dot'), transform.dot);
            assert.strictEqual(getCaseTypeInstance('kebab'), transform.kebab);
            assert.strictEqual(getCaseTypeInstance('lower'), transform.lower);
            assert.strictEqual(getCaseTypeInstance('pascal'), transform.pascal);
            assert.strictEqual(getCaseTypeInstance('sentence'), transform.sentence);
            assert.strictEqual(getCaseTypeInstance('snake'), transform.snake);
            assert.strictEqual(getCaseTypeInstance('none'), transform.none);
            assert.strictEqual(getCaseTypeInstance('capital'), transform.capital);
            assert.strictEqual(getCaseTypeInstance('upper'), transform.upper);
        });

        test('should return undefined for invalid case type', () => {
            const getCaseTypeInstance = (transform as any).getCaseTypeInstance.bind(transform);
            assert.strictEqual(getCaseTypeInstance('invalidType'), undefined);
        });
    });

    suite('Private Method Tests', () => {
        test('toUpper method should convert to uppercase', () => {
            const toUpper = (transform as any).toUpper.bind(transform);
            assert.strictEqual(toUpper('hello world'), 'HELLO WORLD');
        });

        test('toLower method should convert to lowercase', () => {
            const toLower = (transform as any).toLower.bind(transform);
            assert.strictEqual(toLower('HELLO WORLD'), 'hello world');
        });
    });
});