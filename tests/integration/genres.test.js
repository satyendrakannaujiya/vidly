const request = require('supertest');
let server;
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');
describe('/api/genres',()=>{

	 beforeEach( ()=>{

	 	server = require('../../index');
            token = new User().generateAuthToken();

	 })

	 afterEach(async ()=>{
	 	  server.close();
	 	  await Genre.remove({});
	 })

       const exec = ()=>{
              return request(server).post('/api/genres')
              .set('x-auth-token',token)
              .send({name: 'genre1'});

        }
       describe(' GET /',()=>{
       	
       	   it('Should return all genres ',async ()=>{
       	   	     await Genre.collection.insertMany([
       	   	     	   {
       	   	     	   	
       	   	     	   	name: 'genre1'
       	   	     	   },
       	   	     	   {
       	   	     	   	
       	   	     	   	name: 'genre2'
       	   	     	   }
       	   	     	])
       	   	     
                 const res = await request(server).get('/api/genres');
                 expect(res.status).toBe(200);
                 expect(res.body.length).toBe(2);
                 expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();

                 
       	   })
       })

       describe(' GET/:id ',()=>{

       	   it('Should return genre with provided id ',async ()=>{
       	   	      
       	   	      const genre = new Genre({name:'sachin'});
       	   	      await genre.save();

       	   	      const res = await request(server).get('/api/genres/'+genre._id);
       	   	      expect(res.status).toBe(200);
       	   	      expect(res.body).toHaveProperty('name','sachin');
       	   })

       	   it('Should return 404 if id is invalid',async ()=>{
       	   	      
       	   	      const res = await request(server).get('/api/genres/1');
       	   	      expect(res.status).toBe(404);
       	   	      
       	   })
       })


       describe('POST ',()=>{
       	   it('Should return 401 if client is not logged in ',async ()=>{
       	   	  const res = await request(server).post('/api/genres').send({name:'genre1'});
       	   	 expect(res.status).toBe(401);
       	   })

               it('Should return 400 if genres is invalid ',async () =>{
               const res = await request(server).post('/api/genres/').set('x-auth-token',token).send({name:'x'});
                  expect(res.status).toBe(400);
               })
       })
})