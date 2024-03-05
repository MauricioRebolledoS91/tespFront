import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CostCalculationService } from '../costCalculation/costCalculation.service';
import {  FeesDetail ,carTypeValues } from '../costCalculation/FeesDetail.model';

@Component({
  templateUrl: './cost-calculation.component.html',
  styleUrls: ['./cost-calculation.component.css']
})
export class CostCalculationComponent implements OnInit {
carTypeValues = carTypeValues;
calculatedCost: FeesDetail | undefined;
carForm = this.fb.nonNullable.group({
  vehiclePrice: ['', Validators.required, Validators.minLength(1), Validators.pattern('^[0-9]*$')],
  vehicleType: ''})

  
  constructor(private route: ActivatedRoute,
    private costCalcultaionService: CostCalculationService,
    private router: Router,
    private fb: FormBuilder) {
     }

  ngOnInit() {

  }

  calculate() {
     console.log(this.carForm.value);
     let vehiclePrice = parseFloat(this.carForm.controls.vehiclePrice.getRawValue());
     let vehicleType = this.carForm.controls.vehicleType.getRawValue();
     this.costCalcultaionService.getContact(vehiclePrice, vehicleType).
      subscribe((calculatedCost) => {
        this.calculatedCost = calculatedCost;
      });
  }

  clear(){
    this.carForm.reset();

  }
}
