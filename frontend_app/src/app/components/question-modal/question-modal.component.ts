import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.css'
})
export class QuestionModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ title: string; body: string; tags: string[] }>();

  title = '';
  body = '';
  tagsInput = '';

  // PUBLIC_INTERFACE
  doSubmit() {
    /** This is a public function. Emits the question payload. */
    const tags = this.tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    this.submit.emit({ title: this.title.trim(), body: this.body.trim(), tags });
    this.title = '';
    this.body = '';
    this.tagsInput = '';
  }
}
