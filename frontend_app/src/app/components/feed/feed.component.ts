import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { QuestionDataService } from '../../services/question-data.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnChanges {
  @Input() query = '';
  @Output() openQuestion = new EventEmitter<string>();

  constructor(public qds: QuestionDataService) {
    this.qds.refresh('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      this.qds.refresh(this.query || '');
    }
  }

  // PUBLIC_INTERFACE
  open(id: string) {
    /** This is a public function. Emits the question id to open. */
    this.openQuestion.emit(id);
  }
}
