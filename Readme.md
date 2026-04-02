# Playwright API Test Suite
API test suite built with Playwright and TypeScript targeting the JSONPlaceholder REST API.

# Tech Stack
-Playwright (API testing via request context)
-TypeScript
-JSONPlaceholder (free fake REST API)

# Folder Structure
playwright-api-testing/
├── tests/
│   ├── users.spec.ts
│   ├── posts.spec.ts
│   └── negative.spec.ts
├── utils/
│   └── testData.ts
├── playwright.config.ts
└── README.md


# Test Coverage
## Users (/users)
Tag         Test Case
@api        Get all users — validates count, shape, data types
@api        Email format validation using regex
@critical   Content-Type header is application/json@negativeNon-existent user ID (999) returns 404
@negative   String ID (/users/abc) returns 404
@negative   Zero ID (/users/0) returns 404

## Posts (/posts)
Tag         Test Case
@smoke      Get all posts — validates count, shape, data types
@critical   Create post (POST) returns 201 with correct response body
@negative   Create post with missing title
@negative   Non-existent post ID (999) returns 404


# How to Run
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run by tag
npx playwright test --grep @smoke
npx playwright test --grep @negative
npx playwright test --grep @critical

# View HTML report
npx playwright show-report


# Key Concepts

Schema validation using toHaveProperty and toMatchObject
Regex-based email format validation
Negative testing for edge cases and invalid inputs
Test data separated into utils/testData.ts
Tagged tests (@smoke, @api, @critical, @negative`) for selective runs


