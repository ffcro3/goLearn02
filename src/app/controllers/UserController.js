import User from '../models/User';

/* !!! IMPORTANT. MUST READ !!! THIS CONTROLLER HANDLES THE CRUD FOR THE USERS. */

class UserController {
  async store(req, res) {
    // CHECK IF USER EMAIL ALREADY EXISTS
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    // ELSE CREATE USER
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    // CHECK IF USER IS CHANGING THE E-MAIL FOR ONE THAT ALREADY EXISTS
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({
          error: 'User already exists',
        });
      }
    }

    // CHECK IF USER IS TRYINT TO CHANGE PASSWORD AND THEN HE MUST CONFIRM THE
    // OLD PASSWORD THAT ALREADY IS REGISTRED
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
