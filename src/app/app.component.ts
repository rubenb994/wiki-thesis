import { AfterViewInit, Component } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  svgPanZoomMap: SvgPanZoom.Instance;
  readonly svgZoomFactor = 0.2;
  readonly minZoom = 1;
  readonly maxZoom = 3;

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    const svgPanZoomOptions: SvgPanZoom.Options = {
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      zoomScaleSensitivity: this.svgZoomFactor,
      center: true,
      beforePan: (oldPan, newPan) => {
        // console.log(oldPan, newPan);
      },
    };
    this.svgPanZoomMap = SvgPanZoom('#smylos-map', svgPanZoomOptions);
  }

  onClickZoomIn(): void {
    const newZoom = this.svgPanZoomMap.getZoom() + this.svgZoomFactor;
    if (newZoom > this.maxZoom) {
      return;
    }
    this.svgPanZoomMap.zoom(newZoom);
  }

  onClickZoomOut(): void {
    const newZoom = this.svgPanZoomMap.getZoom() - this.svgZoomFactor;
    if (newZoom < this.minZoom) {
      return;
    }
    this.svgPanZoomMap.zoom(newZoom);
  }

  onClickOpenDialog(): void {
    this.dialog.open(PopupComponent);
  }

  onClickGroup(): void {
    console.log('Group was clicked');
  }

  onClickPreviousPosition(): void {
    console.log('Previous Position was clicked');
  }

  onClickCenterView(): void {
    console.log('Center View was clicked');
  }

  onClickNextPosition(): void {
    console.log('Next Position was clicked');
  }
}
