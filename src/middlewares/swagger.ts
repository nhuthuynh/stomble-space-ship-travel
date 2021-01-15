import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerConfig from '../config/swagger.json';

export const handleAPIDocs = ( router: Router ) => router.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( swaggerConfig ) );