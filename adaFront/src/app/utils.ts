export class Utils {

    public static strIsEmpty(str: string): boolean {
        return str === null || str === '' ;
    }

    public static arrayRemoveItem(array: Array<any>, item: any, key: string): void {
        let idx = 0;
        array.forEach((element: any) => {
            if ( element[key] === item[key] ) {
                array.splice(idx, 1);
            }
            idx++;
        });

    }

    public static arraySetItem(array: Array<any>, item: any, key: string): void {
        let idx = 0;
        array.forEach((element: any) => {
            if ( element[key] === item[key] ) {
                array[idx] = item;
            }
            idx++;
        });
    }

}
