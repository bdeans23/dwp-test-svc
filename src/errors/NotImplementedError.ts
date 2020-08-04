/**
 * Error for not implemented code.
 *
 * @class NotImplementedError
 */
export default class NotImplementedError extends Error {
    public name: string;

    /**
     * @constructor
     * @param {String} message descriptive text
     */
    constructor(message?: string) {
        super(message);
        this.name = 'NotImplementedError';
    }
}
