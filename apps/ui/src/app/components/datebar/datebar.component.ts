import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  inject,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-datebar',
  imports: [NgClass, DatePipe, MatButtonToggleModule, FormsModule],
  templateUrl: './datebar.component.html',
  styleUrl: './datebar.component.css',
})
export class DatebarComponent {
  dateService = inject(DateService);

  dateChange = output<string>();

  availableDates = [];
  currentDate: WritableSignal<String> = signal(
    this.dateService.getCurrentDate()
  );
  todayDate: string = new Date().toISOString().slice(0, 10);

  chooseDate(date: string) {
    this.dateService.setCurrentDate(date);
    this.dateChange.emit(date);
  }

  ngOnInit(): void {
    this.dateService.getAvailableDates.subscribe((dates) => {
      this.availableDates = dates;
    });
  }
}
