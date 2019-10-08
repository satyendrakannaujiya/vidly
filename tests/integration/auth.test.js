const {User} = require('../../models/user');
const request = require('supertest');
describe('Auth middleware ',()=>{
	  beforeEach(()=>{
	  	token = new User().generateAuthToken();
	  	server = require('../../index');
	  })
	  afterEach(async ()=>{await server.close();})

	  const exec = ()=>{
	  	  return request(server).post('/api/genres')
	  	  .set('x-auth-token',token)
	  	  .send({name: 'genre1'});

	  }
	  it('Should return 404 if no token is provided ',async ()=>{
	  	  token= '';
	  	 const res = await exec();
         expect(res.status).toBe(401);
	  })

	  it('Should return 400 if no token is invalid ',async ()=>{
	  	  token= 'a';
	  	 const res = await exec();
         expect(res.status).toBe(400);
	  })
})