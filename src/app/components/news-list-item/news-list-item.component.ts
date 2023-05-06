import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DomainPipe } from '@app/components/pipes/domain.pipe';
import { ReadableTimePipe } from '@app/components/pipes/readable-time.pipe';
import { NewsItem } from '@app/interfaces/news-item.typing';

@Component({
  selector: 'app-news-list-item',
  standalone: true,
  imports: [CommonModule, DomainPipe, ReadableTimePipe],
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListItemComponent {
  @Input({ required: true }) index!: number;
  @Input({ required: true }) item!: NewsItem;

  openLink(): void {
    if (this.item.url) {
      window.open(this.item.url, '_blank');
    }
  }
}
