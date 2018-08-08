import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { list, create, update, removeByTag, removeByURLs } from '../controllers/cloudinaryController';


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

router.route('/tag')
.delete(
  passportJWT,
  removeByTag
)

router.route('/urls')
  .delete(
    passportJWT,
    removeByURLs
  )


export default router;
