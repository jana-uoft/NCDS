import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { list, create, update, remove } from '../controllers/cloudinaryController';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    passportJWT,
    list
  )

router.route('/')
.post(
  passportJWT,
  create
)

router.route('/')
.put(
  passportJWT,
  update
)

router.route('/')
.delete(
  passportJWT,
  remove
)


export default router;
