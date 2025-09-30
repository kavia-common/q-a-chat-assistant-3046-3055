import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() shortcut = new EventEmitter<string>();

  // PUBLIC_INTERFACE
  trigger(action: string) {
    /** This is a public function. Emits a sidebar action shortcut. */
    this.shortcut.emit(action);
  }
}
