import UserController from '../controllers/userController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody, schemas } from '../helpers/userValidations';

const router = PromiseRouter();
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/register')
  .post(
    validateBody(schemas.userRegisterSchema),
    UserController.regsiter
  )

router.route('/login')
  .post(
    validateBody(schemas.userLoginSchema),
    passportSignIn,
    UserController.login
  )

router.route('/delete/:email')
  .delete(
    validateParam(schemas.userDeleteSchema, 'email'),
    passportJWT,
    UserController.delete
  )


export default router;
