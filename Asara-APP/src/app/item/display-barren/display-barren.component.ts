import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-display-barren',
  templateUrl: './display-barren.component.html',
  styleUrls: ['./display-barren.component.scss']
})
export class DisplayBarrenComponent implements OnInit {
  @Input() infoBarren: {
    earn: number,
    cost: number,
    extraExpenses: number
  };
  @Output() openDisplayBarrenEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    console.log(this.infoBarren);
  }
  setOpenDisplayBarren(stat){
    this.openDisplayBarrenEvent.emit(stat);
  }

  @HostListener('window:click', ['$event.target'])
  hide(event) {
    if (event.id === 'myModal') {
      this.setOpenDisplayBarren(false);
    }
  }
}
