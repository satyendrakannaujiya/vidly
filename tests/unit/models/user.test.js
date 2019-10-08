
const jwt = require('jsonwebtoken');
const config = require('config');
const {User} = require('../../../models/user');
describe('user.GenreateAuthtoken',()=>{

	it('Should return a valid json web token ',()=>{

       const user = new User({_id: 1, isAdmin: true});
       const token = user.generateAuthToken();

       const decoded  = jwt.verify(token,config.get('jwtPrivateKey'));
       expect(decoded).toHaveProperty('_id');
	})
})