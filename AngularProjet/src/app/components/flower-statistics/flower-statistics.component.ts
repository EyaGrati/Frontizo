import { Component, OnInit } from '@angular/core';
import { FlowerStatisticsService } from 'src/app/services/flower-statistics.service';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-statistics',
  templateUrl: './flower-statistics.component.html',
  styleUrls: ['./flower-statistics.component.css']
})
export class FlowerStatisticsComponent implements OnInit {
  topSelectedFlowers: { flowerName: string, selectionCount: number }[] = [];

  constructor(
    private flowerService: FlowerService,
    private flowerStatisticsService: FlowerStatisticsService
  ) { }

  ngOnInit(): void {
    
    this.topSelectedFlowers = this.flowerStatisticsService.getTopSelectedFlowers();
  }

  // ...
}