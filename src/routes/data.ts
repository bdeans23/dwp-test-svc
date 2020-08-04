// tslint:disable:max-line-length
import { DataController } from '../controllers/dataController';
import requestWithDefaults from '../middleware/requestWithDefaultsForDwpMiddleware';
import schemaValidator from '../middleware/schemaValidationMiddleware';
import dwpGetDetailsSchema from '../schemas/dwpGetDetailsSchema';

/**
 * Add all the API routes to the server
 *
 * @module routes/data
 * @export
 * @param {Express} app express server object
 */
export default function(app: any) {
  const controller = new DataController();
  app.post('/api/data', schemaValidator(dwpGetDetailsSchema), requestWithDefaults, controller.getDetails);
}
