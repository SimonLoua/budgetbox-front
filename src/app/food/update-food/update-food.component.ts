import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Food} from '../food.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodService} from '../service/food.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {
  food: Food;
  idFood: number;
  foodForm: FormGroup;
  regExp: RegExp = /^[a-zA-Z\u00E0-\u00FC 0-9_,'-]*$/;
  isFormValid: boolean;

  constructor(
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isFormValid = false;
    this.foodForm = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.pattern(this.regExp), Validators.maxLength(50)]),
      scientificName: new FormControl('', [ Validators.pattern(this.regExp), Validators.maxLength(50)]),
      mainGroup: new FormControl('', [Validators.required, Validators.pattern(this.regExp), Validators.maxLength(50)]),
      subGroup: new FormControl('', [Validators.required, Validators.pattern(this.regExp), Validators.maxLength(50)])
    });
    this.idFood = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getFood(this.idFood);

  }

  checkForm(): void {
    this.isFormValid =
      this.foodForm.get('name').value &&
      !this.foodForm.controls.name.hasError('pattern') &&
      this.foodForm.get('scientificName').value &&
      !this.foodForm.controls.scientificName.hasError('pattern') &&
      this.foodForm.get('mainGroup').value &&
      !this.foodForm.controls.mainGroup.hasError('pattern') &&
      this.foodForm.get('subGroup').value &&
      !this.foodForm.controls.subGroup.hasError('pattern')
    ;
  }

  getFood(id: number): void {
    this.foodService.getFood(id).subscribe(
      (food: any) => {
        this.food = food;
        this.foodForm.patchValue({
          id: food.id,
          name: food.name,
          scientificName: food.scientificName,
          mainGroup: food.mainGroup,
          subGroup: food.subGroup
        });
        this.checkForm();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  submitForm(): void {
    if (this.isFormValid) {
      this.saveForm();
    } else {
      this.openSnackBar('Erreur champs incorrectes', 'Fermer');
    }
  }

  saveForm(): void {
    this.foodService.update(this.foodForm.value).subscribe(
      res => {
        if (res && res.id > 0) {
          this.openSnackBar('Aliment modifié', 'Fermer');
          this.router.navigate(['food/list']);
        } else {
          this.openSnackBar('Erreur : Aliment non modifié', 'Fermer');
        }
      },
      err => {
        alert('Erreur survenue lors de la modification de l\'aliment');
        console.log('error :', err);
      }
    );
  }

  reset(): void {
    Object.keys(this.foodForm.controls).forEach(key => {
      this.foodForm.get(key).setErrors(null);
    });
    this.router.navigate(['food/list']);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  getErrotMsgName(): any {
    return this.foodForm.controls.name.hasError('required') ? 'Ce champ est obligatoire' :
      this.foodForm.controls.name.hasError('pattern') ? 'Ce champ est invalide' :
        (this.foodForm.get('name').value && this.foodForm.get('name').value.length > 50) ? 'Ce champ accepte maximum 50 caractères' :
          '';
  }

  getErrotMsgScientificName(): any {
    return this.foodForm.controls.scientificName.hasError('required') ? 'Ce champ est obligatoire' :
      this.foodForm.controls.scientificName.hasError('pattern') ? 'Ce champ est invalide' :
        (this.foodForm.get('scientificName').value && this.foodForm.get('scientificName').value.length > 50) ? 'Ce champ accepte maximum 50 caractères' : '';
  }

  getErrotMsgMainGroup(): any {
    return this.foodForm.controls.mainGroup.hasError('required') ? 'Ce champ est obligatoire' :
      this.foodForm.controls.mainGroup.hasError('pattern') ? 'Ce champ est invalide' :
        (this.foodForm.get('mainGroup').value && this.foodForm.get('mainGroup').value.length > 50) ? 'Ce champ accepte maximum 50' +
          ' caractères' :
          '';
  }

  getErrotMsgSubGroup(): any {
    return this.foodForm.controls.subGroup.hasError('required') ? 'Ce champ est obligatoire' :
      this.foodForm.controls.subGroup.hasError('pattern') ? 'Ce champ est invalide' :
        (this.foodForm.get('subGroup').value && this.foodForm.get('subGroup').value.length > 60) ? 'Ce champ accepte maximum 60' +
          ' caractères' :
          '';
  }

}
