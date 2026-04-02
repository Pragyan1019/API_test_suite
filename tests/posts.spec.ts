import {test , expect, request, APIRequestContext} from "@playwright/test";
import { newPost } from "../utils/testdata";
import { titlelessPost } from "../utils/testdata"

test.describe('post cases',()=>{  let apiContext: APIRequestContext;
    test.beforeAll(async () => {
        apiContext = await request.newContext({
        baseURL: "https://jsonplaceholder.typicode.com",
        });
    });

    test('get all posts @smoke', async()=>{
        const response = await apiContext.get('/posts/');
        expect(response.ok()).toBeTruthy();
        const responseBody = await  response.json();
        expect(responseBody.length).toBe(100);
        expect(responseBody[0]).toMatchObject({ id: 1 });
        for(const user of responseBody ){
            expect(user).toHaveProperty("userId")
            expect(user).toHaveProperty("id")
            expect(user).toHaveProperty("title")
            expect(user).toHaveProperty("body")
            expect(user).toMatchObject({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String)
            });            
        }
    })
    test('create a post @critical',async()=>{
        const response = await apiContext.post('/posts',{
            data: newPost
        })
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.title).toBe(newPost.title);
        expect(responseBody.body).toBe(newPost.body);
        expect(responseBody.userId).toBe(newPost.userId);    
    })
    test('negative tests create post with missing title @negative',async()=>{
        const response = await apiContext.post('/posts',{
            data: titlelessPost
        })
        expect.soft(response.status()).toBe(101)
    })
    test('get post with non existing id @negative',async()=>{
        const response = await apiContext.get('/posts/999')
        expect(response.status()).toBe(404);
    });
})