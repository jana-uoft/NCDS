import { contactSubmissions, donateSubmissions, create, remove } from '../controllers/contactController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../helpers/validations';
import { schemas } from '../helpers/contactValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    contactSubmissions
  )

router.route('/donate')
  .get(
    donateSubmissions
)

router.route('/')
  .post(
    validateBody(schemas.contactCreateUpdateSchema),
    passportJWT,
    create
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    remove
  )


export default router;
