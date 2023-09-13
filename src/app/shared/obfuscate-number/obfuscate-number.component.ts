import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-obfuscate-number',
  templateUrl: './obfuscate-number.component.html',
  styleUrls: ['./obfuscate-number.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ObfuscateNumberComponent implements OnInit {
  @Input() accountNumber: string = '';
  @Input() text: string = '';

  public obfuscate: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public toogleObfuscate(): void {
    this.obfuscate = !this.obfuscate;
  }
}
