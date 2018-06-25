import ObituaryController from '../controllers/obituaryController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../helpers/validations';
import { schemas } from '../helpers/obituaryValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    ObituaryController.list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  ObituaryController.retrieve
)

router.route('/')
  .post(
    validateBody(schemas.obituaryCreateUpdateSchema),
    passportJWT,
    ObituaryController.create
  )

router.route('/:id')
  .put(
    validateBody(schemas.obituaryCreateUpdateSchema),
    passportJWT,
    ObituaryController.update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    ObituaryController.delete
  )


export default router;
