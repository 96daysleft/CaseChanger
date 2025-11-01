# CaseChanger Extension Test Suite

This comprehensive test suite covers all aspects of the CaseChanger VSCode extension functionality.

## Test Structure

### 1. Unit Tests (`transform.test.ts`)
Tests the core `Transform` class functionality in isolation:

- **ConvertCaseType Class Tests**: Validates the case type instances
- **Transform Class Initialization**: Ensures all case types are properly initialized
- **Case Transformation Tests**: Tests each case transformation type
- **Overloaded Method Tests**: Tests string and ConvertCaseType parameter handling
- **Whitespace Preservation**: Tests leading/trailing whitespace handling
- **Edge Cases**: Empty strings, single characters, special characters
- **Complex Input Tests**: Mixed case, already transformed text
- **Private Method Tests**: Internal method functionality

### 2. Integration Tests (`integration.test.ts`)
Tests the full extension integration with VSCode:

- **Basic Case Transformation Commands**: All 11 case types via VSCode commands
- **Multi-line Text Handling**: Line-by-line transformation logic
- **Whitespace and Formatting Preservation**: Real editor behavior
- **Edge Cases in Editor**: Empty selections, special scenarios
- **Complex Input Scenarios**: Real-world transformations
- **Partial Selection Tests**: Working with text ranges
- **Real-world Code Examples**: JavaScript, CSS, API endpoints

### 3. Advanced Tests (`advanced.test.ts`)
Comprehensive scenario testing:

- **Multiple Selection Tests**: Testing multiple cursor functionality
- **Performance Tests**: Large text handling
- **Command Registration**: Validation of command availability
- **Undo/Redo Functionality**: Editor state management
- **Unicode and Special Characters**: International text support
- **Boundary Conditions**: Edge cases in editor behavior
- **State Management**: Multiple consecutive operations

### 4. Original Tests (`extension.test.ts`)
Legacy integration tests maintained for compatibility.

## Test Utilities (`testHelper.ts`)

The `TestHelper` class provides utilities for:

- **basicTextTest()**: Standard case transformation testing
- **caseChanger()**: Custom text selection and transformation
- **multipleSelectionsTest()**: Testing multiple selections
- **performanceTest()**: Performance benchmarking
- **validateCommandRegistration()**: Command validation
- **undoTest()**: Undo functionality testing
- **whitespacePreservationTest()**: Whitespace handling validation

## Running Tests

### Prerequisites
1. Ensure the extension is compiled: `npm run compile`
2. Ensure dependencies are installed: `npm install`

### Running All Tests
```bash
npm test
```

### Running Specific Test Suites
The tests are organized by file, and you can run specific suites by modifying the test runner or using VSCode's test explorer.

### VSCode Test Explorer
1. Open the Command Palette (`Ctrl+Shift+P`)
2. Run "Test: Focus on Test Explorer View"
3. Expand the test tree to see all test suites
4. Run individual tests or suites by clicking the play button

## Test Categories

### Case Transformations Tested
1. **camelCase**: `helloWorld`
2. **constant_case**: `HELLO_WORLD`
3. **dot.case**: `hello.world`
4. **kebab-case**: `hello-world`
5. **lowercase**: `hello world`
6. **PascalCase**: `HelloWorld`
7. **Sentence case**: `Hello world`
8. **snake_case**: `hello_world`
9. **no case**: `hello world`
10. **Capital Case**: `Hello World`
11. **UPPERCASE**: `HELLO WORLD`

### Scenarios Covered
- Single line text transformation
- Multi-line text transformation
- Partial line selection
- Multiple simultaneous selections
- Empty selections
- Whitespace-only selections
- Text with numbers and symbols
- Unicode character handling
- Large text performance
- Undo/redo operations
- Command registration validation

## Test Data

### Standard Test Input
- Base text: `"hello world"`
- Modified for specific cases (e.g., uppercase for lowercase tests)

### Edge Cases
- Empty strings
- Single characters
- Large text blocks (performance testing)
- Unicode characters
- Mixed whitespace (tabs, spaces)
- Special symbols and punctuation

## Expected Behavior

### Whitespace Preservation
- Leading whitespace is preserved
- Trailing whitespace is preserved
- Internal whitespace is transformed according to case rules

### Multi-line Handling
- Each line is transformed independently
- Line breaks are preserved
- Selection ranges work across lines

### Performance Requirements
- Large text transformations should complete within 5 seconds
- Memory usage should remain reasonable
- No memory leaks during repeated operations

## Troubleshooting

### Common Test Failures

1. **Command Not Found**: Ensure extension is properly activated
2. **Timeout Errors**: Check that VSCode is responsive and not blocked
3. **Selection Issues**: Verify document is properly opened and focused
4. **Transformation Mismatches**: Check change-case library compatibility

### Debugging Tips

1. Use `console.log` statements in test helpers
2. Check VSCode Developer Tools for extension errors
3. Verify extension activation in Extension Host
4. Use breakpoints in test files for step-by-step debugging

## Coverage Goals

The test suite aims for:
- 100% function coverage of Transform class
- 100% command coverage for all registered commands
- Comprehensive edge case coverage
- Real-world scenario validation
- Performance benchmark establishment

## Contributing

When adding new features:
1. Add unit tests to `transform.test.ts` for core logic
2. Add integration tests to `integration.test.ts` for VSCode integration
3. Add advanced scenarios to `advanced.test.ts` for complex cases
4. Update this documentation with new test categories
5. Ensure all tests pass before submitting changes