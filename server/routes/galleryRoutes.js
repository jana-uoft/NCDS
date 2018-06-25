import GalleryController from '../controllers/galleryController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../helpers/validations';
import { schemas } from '../helpers/galleryValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    GalleryController.list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  GalleryController.retrieve
)

router.route('/')
  .post(
    validateBody(schemas.galleryCreateUpdateSchema),
    passportJWT,
    GalleryController.create
  )

router.route('/:id')
  .put(
    validateBody(schemas.galleryCreateUpdateSchema),
    passportJWT,
    GalleryController.update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    GalleryController.delete
  )


export default router;
