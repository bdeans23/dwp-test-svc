/**
 * Error for access to a inaccessible part fot he API
 *
 * @class ForbiddenError
 */
export default class ForbiddenError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'ForbiddenError';
    }
}
