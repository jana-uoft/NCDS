import { list, update } from '../controllers/contactController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    list
  )
  .put(
    passportJWT,
    update
  )




export default router;
