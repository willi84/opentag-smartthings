import { getProjects } from './result';
// Import the function to be tested

// Describe block for grouping tests
describe('add function', () => {
  // Individual test case
  it('should add two numbers correctly', () => {
    const result = getProjects();

    // Assert: Check the expected output
    expect(result.projects).toEqual( ["bahn-helpers.", "tiny-helpers.dev", "ng-helpers.dev"]); // Expect the result to be 8 when adding 5 and 3
  });

  // Add more test cases as needed
});
