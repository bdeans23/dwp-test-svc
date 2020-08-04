/**
 * Can be created by JOI if the user is not allowed to access.
 *
 * @class ValidationError
 */
export default class ValidationError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
