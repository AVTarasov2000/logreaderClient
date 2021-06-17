import {SearchingField} from "./searchingField";
import {FormControl} from "@angular/forms";

export abstract class SearchingObject{

  abstract getSearchingData(): string;
}

export class SearchingText extends SearchingObject{

  control: FormControl;
  fieldData: SearchingField;

  constructor(fieldData: SearchingField, control: FormControl) {
    super();
    this.fieldData = fieldData
    this.control = control;
  }

  getSearchingData(): string {
    let value = this.control.value;
    if (!value){
      value = "*"
    }
    return " " + this.fieldData.path + ":" + value + " ";
  }
}

export class SearchingDate extends SearchingObject{

  fieldData: SearchingField;
  controlDateFrom: FormControl;
  controlDateTo: FormControl;


  constructor(fieldData: SearchingField, controlDateFrom: FormControl, controlDateTo: FormControl) {
    super();
    this.fieldData = fieldData
    this.controlDateFrom = controlDateFrom;
    this.controlDateTo = controlDateTo;
  }

  getSearchingData(): string {
    let valueFrom = this.controlDateFrom.value;
    if (!valueFrom){
      valueFrom = "*"
    }
    let valueTo = this.controlDateTo.value;
    if (!valueTo){
      valueTo = "*"
    }
    return " " + this.fieldData.path + ":[" + valueFrom + " TO " + valueTo + "] ";
  }



}
