export class Configuration {
    private _apiRoot: string;
    private _userId: number;
    
    constructor(apiRoot: string, userId: number) {
        this._apiRoot = apiRoot;
        this._userId = userId;
    }

    get apiRoot(): string {
        return this._apiRoot;
    }

    get userId(): number {
        return this._userId;
    }
}