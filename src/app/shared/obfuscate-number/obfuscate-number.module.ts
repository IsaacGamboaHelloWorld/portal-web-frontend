import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { ObfuscateNumberComponent } from './obfuscate-number.component';

@NgModule({
  declarations: [ObfuscateNumberComponent],
  imports: [CommonModule, CoreModule],
  exports: [ObfuscateNumberComponent],
})
export class ObfuscateNumberModule {}
