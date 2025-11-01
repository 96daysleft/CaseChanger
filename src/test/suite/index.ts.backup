import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		color: true,
		timeout: 10000, // Increase timeout for integration tests
		reporter: 'spec', // Use spec reporter for detailed output
		slow: 2000 // Mark tests as slow if they take more than 2 seconds
	});

	// Set up global test hooks
	mocha.suite.beforeAll(async function() {
		this.timeout(20000); // Allow extra time for extension activation
		console.log('Setting up test environment...');
	});

	mocha.suite.afterAll(function() {
		console.log('Test environment cleanup complete.');
	});

	glob('**/**.test.js', { cwd: testsRoot })
		.then((files) => {
			// Sort files to ensure consistent test order
			files.sort();
			
			// Add files to the test suite
			files.forEach((f) => {
				console.log(`Adding test file: ${f}`);
				mocha.addFile(path.resolve(testsRoot, f));
			});

			try {
				// Run the mocha test
				mocha.run((failures) => {
					console.log(`Tests completed. Failures: ${failures || 0}`);
					cb(null, failures);
				});
			} catch (err) {
				console.error('Error running tests:', err);
				cb(err);
			}
		})
		.catch((err) => {
			console.error('Error finding test files:', err);
			return cb(err);
		});
}