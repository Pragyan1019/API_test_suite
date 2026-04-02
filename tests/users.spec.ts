import { test, expect, request, APIRequestContext } from "@playwright/test";

test.describe("API testing", () => {
  let apiContext: APIRequestContext;
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com",
    });
  });
  test("Get all users @api", async () => {
    const response = await apiContext.get("/users");
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.length).toBe(10);
    expect(responseBody[0]).toMatchObject({ id: 1 });

    const emailregex = /^[A-Za-z0-9.+/_&-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    for (const user of responseBody) {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("address");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("phone");

      expect(user).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.stringMatching(emailregex),
      });
    }
  });

  test('Negative test cases @negative',async()=>{
    const response = await apiContext.get("/users/999");
    expect(response.status()).toBe(404);
    const res = await apiContext.get("/users/abc");
    expect(res.status()).toBe(404);
    const re = await  apiContext.get("/users/0");
    expect(res.status()).toBe(404);
  })
  test('Respnse type checks @critical', async()=>{
    const response = await apiContext.get('/users');
    expect(response.status()).toBe(200)
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  })
});
