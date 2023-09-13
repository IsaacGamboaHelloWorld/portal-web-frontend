import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';

@NgModule({
  imports: [CommonModule],
  providers: [Security, SecurityService],
})
export class SecurityModule {}
