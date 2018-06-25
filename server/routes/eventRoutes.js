import EventController from '../controllers/eventController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../helpers/validations';
import { schemas } from '../helpers/eventValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    EventController.list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  EventController.retrieve
)

router.route('/')
  .post(
    validateBody(schemas.eventCreateUpdateSchema),
    passportJWT,
    EventController.create
  )

router.route('/:id')
  .put(
    validateBody(schemas.eventCreateUpdateSchema),
    passportJWT,
    EventController.update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    EventController.delete
  )


export default router;
