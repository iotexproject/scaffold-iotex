export class MappingState<T> {
    map: {
        [key: string]: T;
    };
    constructor(args: Partial<MappingState<T>>) {
        Object.assign(this, args)
    }
}