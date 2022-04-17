class ConflictError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = 'BodyError';
    }
}

export default ConflictError;
