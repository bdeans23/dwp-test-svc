import * as morgan from 'morgan';

export let getMorgan = (environment: string) => morgan(environment);

/**
 * Dev only logging statements with more info than bunyan
 * @module middleware/devLogging
 * @export
 * @param {Object} config configuration to declare what kind of logging to produce
 * @return {Function} middleware to be consumed by express
 */
export default (config: any) => {
    return config.NODE_ENV === 'development' ?
        getMorgan('dev') : getMorgan('common');
};
