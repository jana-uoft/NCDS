import { regsiter, login, remove } from '../controllers/userController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../validations';
import { schemas } from '../validations/userValidationSchemas';


const router = PromiseRouter();
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/register')
  .post(
    validateBody(schemas.userRegisterSchema),
    regsiter
  )

router.route('/login')
  .post(
    validateBody(schemas.userLoginSchema),
    passportSignIn,
    login
  )

router.route('/delete/:email')
  .delete(
    validateParam(schemas.userDeleteSchema, 'email'),
    passportJWT,
    remove
  )


export default router;
