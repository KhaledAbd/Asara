import { FormGroup } from '@angular/forms';
export function MustMatch(contollerName: string, matchingControlName: string){
    return(formGroup: FormGroup) => {
        const control = formGroup.controls[contollerName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch){
            return;
        }
        if (control.value !== matchingControl.value){
            matchingControl.setErrors({mustMatch: true});
        }else{
            matchingControl.setErrors(null);
        }
    }
}
