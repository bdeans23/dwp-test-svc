/**
 * Endpoint not found.
 *
 * @class NotFoundError
 */
export default class NotFoundError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}
