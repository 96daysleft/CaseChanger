const { Transform } = require('./out/src/transform.js');

console.log('Creating Transform instance...');
const transform = new Transform();

console.log('Transform instance created');
console.log('Available case types:', transform.caseTypes);

console.log('\nTesting camel case:');
console.log('Input: "hello world"');
try {
    const result = transform.transformCase('hello world', 'camel');
    console.log('transformCase result:', JSON.stringify(result));
    
    const direct = transform.camel.runFunction('hello world');
    console.log('Direct runFunction result:', JSON.stringify(direct));
} catch (error) {
    console.error('Error:', error);
}

console.log('\nTesting upper case:');
console.log('Input: "hello world"');
try {
    const result = transform.transformCase('hello world', 'upper');
    console.log('transformCase result:', JSON.stringify(result));
    
    const direct = transform.upper.runFunction('hello world');
    console.log('Direct runFunction result:', JSON.stringify(direct));
} catch (error) {
    console.error('Error:', error);
}