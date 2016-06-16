export class TakeValueConverter {
    toView(value: any, count: number) {
        if (Array.isArray(value)) {
            return (value as []).slice(0, count);
        }
        return value;
    }
}