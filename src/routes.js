import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Fabricio Rocha',
    email: 'fabriciofrocha87@gmail.com',
    password_hash: 'pampam',
  });

  return res.json(user);
});

export default routes;
