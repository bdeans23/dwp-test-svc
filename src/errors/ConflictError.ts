/**
 * Error for conflicting information.
 *
 * @class ConflictError
 */
export default class ConflictError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'ConflictError';
    }
}
