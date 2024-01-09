import { Directive, ElementRef, HostListener, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//las directive clases lo que hacen es añadir comportamiento o modifican el existente
//a los elementos de la plantilla
const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,//cuando creamos un nuevo ControlValueAccessor, demeos registrarlo como un proveedor NG_VALUE_ACCESSOR
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true
}

@Directive({ //esta directiva será usada sobre cualquier elemento de tipo Date
  //siempre que tenga una de estas tres directivas de formularios(formcontrolname, formcontrol, ngmodel)
  selector: 'input([type=date])[formControlName], input([type=date])[formControl], input([type=date])[ngModel]',
  providers: [DATE_VALUE_PROVIDER]
})                                                 //controlvalue accessor es el responsable de actualizar
                                                   //el valor de un elemento html cuando cambia el formcontrol
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  //hostlistener es el evento que queremos escuchar
  //cuando se activa el evento hostlistener onChange
  //llamará a esta lógica this.onChange = (valueAsDate: Date) => { fn(valueAsDate); };
  //y le pasará este parámetro valueAsDate que obtuvo del evento de entrada del elemento host 'input', ['$event.target.valueAsDate'])
  //y luego lo pasaremos al callback fn(valueAsDate); que en realidad actualizará nuestro formControl
  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;

  //hostlistener escuchará el evento blur
  //quiere decir que se activará cada vez que alguien ingrese a este elemento de entrada
  //y luego lo abandone
  @HostListener('blur')
  private onTouched!: Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate); };
  }

  //se llamará cada vez que se toque nuestro elemento
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  //se llama cada vez que cambia el valor de un formControl
  //esta función es responsable de actualizar eñ elemtno HTML
  //cuando cambia su formcontrol correspondiente
  writeValue(newValue: any): void {
    //yyyy-mm-dd
    if (newValue instanceof Date){
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
    }
  }
}
