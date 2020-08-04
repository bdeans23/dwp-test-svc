
/* tslint:disable */

// Update Express Request interface to accept mutations required
declare namespace Express {
    export interface Request {
       log?: any;
       config?: any;
       user?: any;
       cookies?: any;
       requestWithDefaults?: any;
       [key: string]: any;
    }
 }
