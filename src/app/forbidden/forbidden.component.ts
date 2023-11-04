import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="alert alert-danger">
      <strong>You are not authorized...</strong>
    </div>
  `,
})
export class ForbiddenComponent {}