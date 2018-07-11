import { list, retrieve, create, update, remove } from '../controllers/galleryController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../validations';
import { schemas } from '../validations/galleryValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  retrieve
)

router.route('/')
  .post(
    validateBody(schemas.galleryCreateUpdateSchema),
    passportJWT,
    create
  )

router.route('/:id')
  .put(
    validateBody(schemas.galleryCreateUpdateSchema),
    passportJWT,
    update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    remove
  )


export default router;
