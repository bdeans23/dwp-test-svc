/**
 * No allowed to access the system
 *
 * @class UnauthorizedError
 */
export default class UnauthorizedError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
