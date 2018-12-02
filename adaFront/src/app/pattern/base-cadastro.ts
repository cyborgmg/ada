export class BaseCadastro {

    public message: any;
    public classCss: any;

    public getFormGroupClass(isInvalid: boolean, isDirty): any {
        return {
          'form-group': true,
          'has-error': isInvalid && isDirty,
          'has-success': isInvalid && isDirty
        };
    }

    public buildClasses(type: string) {
        this.classCss = {
          'alert': true
        };
        this.classCss['alert-' + type] = true;
    }

    public showMessage(message: {type: string, text: string}): void {
        this.message = message;
        this.buildClasses(message.type);
        setTimeout(() => {
          this.message = undefined;
        }, 3000);
    }

}
