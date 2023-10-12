import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {DogsService} from "../../services/dogs.service";
import {Activity, ActivityCoefMap, Age, FeedingsPerDayMap, IDog, IFood, IRation, Size, WeightMap} from "../../models";
import {map, Observable, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogFormComponent} from "../dialog-form/dialog-form.component";

@Component({
  selector: 'app-calc-food-for-dog',
  templateUrl: './calc-food-for-dog.component.html',
  styleUrls: ['./calc-food-for-dog.component.scss'],
  providers: [DogsService],
})
export class CalcFoodForDogComponent implements OnInit, OnDestroy {
  public onDestroy$ : Subject<boolean> = new Subject<boolean>();
  public dogs : Array<IDog> = [];
  public foods : Array<IFood> = [];
  public myForm : FormGroup= new FormGroup({});
  public dogsBreedOptions : string[] = ['Далматинец', 'Золотистый ретривер', 'Немецкая овчарка', 'Пудель',
                                        'Такса', 'Английский бульдог', 'Бигль', 'Джек-рассел-терьер',
                                        'Йоркширский терьер', 'Мопс', 'Шпиц', 'Ротвейлер', 'Французский бульдог',
                                        'Чихуахуа'];
  public dogsBreedFilterdOptions : Observable<string[]> = new Observable<string[]>();
  public foodOptions : string[] = [];
  public foodFilteredOptions : Observable<string[]> = new Observable<string[]>();
  public ageEnum: typeof Age = Age;
  public sizeEnum: typeof Size = Size;
  public activityEnum: typeof Activity = Activity;
  private feedingsPerDayMap: typeof FeedingsPerDayMap = FeedingsPerDayMap;
  private weightMap: typeof WeightMap = WeightMap;
  private activityMap: typeof ActivityCoefMap = ActivityCoefMap;
  private ration!: IRation;

  constructor(private dogSer : DogsService, private dialog: MatDialog) {
    this.myForm = this.formInit();
  }

  ngOnInit(): void {
    (<FormGroup>(<FormArray>this.myForm.controls['formArray']).controls[1]).controls['breedForAutCompl']
      .valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.dogSer.getDogsWithFilter(value)),
        takeUntil(this.onDestroy$)
      )
      .subscribe(data => {
        this.dogs = data
      })

    this.dogsBreedFilterdOptions = (<FormGroup>(<FormArray>this.myForm.controls['formArray']).controls[1]).controls['breedForAutCompl']
      .valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value,this.dogsBreedOptions)),
        takeUntil(this.onDestroy$)
      )

    this.dogSer.getFoods()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(data => {
        this.foods = data;
        data.forEach(item => {
          this.foodOptions.push(item.name)
        })
    })
  }

  private _filter(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  private formInit () : FormGroup {
    const fg : FormGroup = new FormGroup({
      formArray : new FormArray([
        new FormGroup({
          name : new FormControl('',[Validators.required])
        }),
        new FormGroup({
          breedForAutCompl : new FormControl(''),
          breed : new FormControl('')
        }),
        new FormGroup({
          size: new FormControl('')
        }),
        new FormGroup({
          age : new FormControl('')
        }),
        new FormGroup({
          activity : new FormControl('')
        }),
        new FormGroup({
          food : new FormControl('')
        })])
    }, {updateOn: "change"})
    return fg;
  }

  public filtrationBeforeChoosingFeed () : void {
    this.foodOptions.splice(0, this.foodOptions.length);
    this.foods.filter(value => {
      if (value.forAge.includes(this.myForm.get('formArray.3.age')?.value)) {
        if (value.forSize.includes(this.myForm.get('formArray.2.size')?.value)) {
          return value
        } else {
          return
        }
      } else {
        return
      }
    })
      .forEach(value => {
        this.foodOptions.push(value.name)
      })
    this.foodFilteredOptions = (<FormGroup>(<FormArray>this.myForm.controls['formArray']).controls[5]).controls['food'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value,this.foodOptions)),
        takeUntil(this.onDestroy$)
      )
  }

  public calcRation (): void {
    const dogWeight = this.weightMap.get(this.myForm.get('formArray.2.size')?.value);
    const actCof = this.activityMap.get(this.myForm.get('formArray.4.activity')?.value)
    const caloricFood = this.foods.find(value => value.name === this.myForm.get('formArray.5.food')?.value)?.caloricIn100Gram
    const caloricInDayCalc = ((dogWeight ?? 10) * 30 + 70) * (actCof ?? 1);
    const feedWeightCalc = caloricInDayCalc / (caloricFood ?? 350) * 100;
    this.ration = {
      dogName: this.myForm.get('formArray.0.name')?.value,
      dogBreed : this.myForm.get('formArray.1.breed')?.value,
      dogImg : this.dogs.find(value => value.breed === this.myForm.get('formArray.1.breed')?.value)?.img,
      feedingsPerDay : this.feedingsPerDayMap.get(this.myForm.get('formArray.3.age')?.value) ?? 2,
      caloricInDay: caloricInDayCalc,
      feedWeight : feedWeightCalc
    }
  }

  public openDialogForm(): void {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      restoreFocus: false,
      disableClose: true,
      width: '600px',
      data : this.ration
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
