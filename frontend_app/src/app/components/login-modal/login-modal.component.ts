import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ email: string; password: string }>();

  email = '';
  password = '';

  // PUBLIC_INTERFACE
  doSubmit() {
    /** This is a public function. Emits credentials for login. */
    this.submit.emit({ email: this.email.trim(), password: this.password });
  }
}
