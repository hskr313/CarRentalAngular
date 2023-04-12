import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import {Collapsible} from 'materialize-css'



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit{

  @ViewChild('collapsibleElement', { static: false }) collapsibleElement!: ElementRef;
  
  ngAfterViewInit() {
    Collapsible.init(this.collapsibleElement.nativeElement, {});  }
}
