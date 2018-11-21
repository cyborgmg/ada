export class Utils {

    public static strIsEmpty(str: string): boolean {
        return str === null || str === '' ;
    }

    public static arrayRemoveItem<T>(array: Array<T>, item: T, key: string): void {
        let idx = 0;
        array.forEach((element: T) => {
            if ( element[key] === item[key] ) {
                array.splice(idx, 1);
            }
            idx++;
        });

    }

    public static arraySetItem<T>(array: Array<T>, item: T, key: string): void {
        let idx = 0;
        array.forEach((element: T) => {
            if ( element[key] === item[key] ) {
                array[idx] = item;
            }
            idx++;
        });
    }

    public static cleanObject<T>(o: T, key: string = ''): void {

        Object.keys(o).forEach((prop: string) => {
            if (JSON.stringify(o[prop]) !== JSON.stringify(o[key])) {
                o[prop] = null;
            }
        });
    }

    public static clone<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }

    public static equal<T>(o1: T, o2: T): boolean {
        return JSON.stringify(o1) === JSON.stringify(o2);
    }

}
