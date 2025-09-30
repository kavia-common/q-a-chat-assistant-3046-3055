import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  @Output() loginClick = new EventEmitter<void>();
  @Output() askClick = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  query = '';

  // PUBLIC_INTERFACE
  doSearch() {
    /** This is a public function. Emits the search query to parent. */
    this.searchChange.emit(this.query.trim());
  }
}
