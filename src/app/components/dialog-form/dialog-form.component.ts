import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {IRation} from "../../models";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit, OnDestroy {
  public ration!: IRation

  constructor(@Inject(MAT_DIALOG_DATA) private data : IRation) {
  }

  ngOnInit(): void {
    this.ration = {...this.data}
  }

  ngOnDestroy(): void {

  }
}
