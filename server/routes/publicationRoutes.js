import PublicationController from '../controllers/publicationController';
import PromiseRouter from 'express-promise-router';
import passport from '../passport';
import { validateParam, validateBody } from '../helpers/validations';
import { schemas } from '../helpers/publicationValidationSchemas';


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(
    PublicationController.list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  PublicationController.retrieve
)

router.route('/')
  .post(
    validateBody(schemas.publicationCreateUpdateSchema),
    passportJWT,
    PublicationController.create
  )

router.route('/:id')
  .put(
    validateBody(schemas.publicationCreateUpdateSchema),
    passportJWT,
    PublicationController.update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    PublicationController.delete
  )


export default router;
