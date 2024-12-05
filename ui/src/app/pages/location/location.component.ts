import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent {
  constructor(private route: ActivatedRoute) {}

  location: string | null = '';

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.location = paramMap.get('location');
    });
  }
}
