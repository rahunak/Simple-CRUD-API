import supertest, { SuperTest, Test, Response } from 'supertest'
import TestAgent from 'supertest/lib/agent'

import serverHandler from '../src/services/server_handler'
import { createServer } from 'http'

export const createServerForTests = () => createServer(serverHandler);

describe('simple tests on GET api/users', () => {
const expectedID = 1;
  test('should return correct header on successful request', async() => {
    const response = await supertest(serverHandler).get(`/api/users/${expectedID}`)
    expect(response.statusCode).toBe(200)
  });

  test('should return user on request with correct id', async() => {
    const response = await supertest(serverHandler).get(`/api/users/${expectedID}`)
    expect(JSON.parse(response.text)).toStrictEqual(
      {
        id: 1, DataBaseUserID: 'ef223a0e-38ed-454d-8ea5-4eb6bbc54445', username: 'Maksim Znak', age: 30, hobbies: ['BOXING', 'Myau Thai', 'Rugby']
      }
    );
  });
  test('should return error on request with user wrong id', async() => {
     const response = await supertest(serverHandler).get(`/api/users/${expectedID}a`);
       expect(response.text).toBe( 'Bad request - user id is invalid');
  });
});

describe('simple tests on POST api/users', () => {
  let newUser = {"username":"Mikola Statkevich","age":67,"hobbies":["Honor of Belarus"]}
  test('should return create new user', async() => {
     const response = await supertest(serverHandler).post(`/api/users`).send(newUser);
      expect(response.status).toBe(201);
      let responseData = JSON.parse(response.text)
      expect(responseData).toHaveProperty('id')
      expect(responseData).toHaveProperty('username',"Mikola Statkevich");
      
      dataForNextTest = responseData.id;
  });

});