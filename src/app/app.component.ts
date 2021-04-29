import { AfterViewInit, Component } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { Position } from 'src/models/position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  svgPanZoomMap: SvgPanZoom.Instance;
  readonly svgZoomFactor = 2
;
  readonly minZoom = 1;
  readonly maxZoom = 12;

  positions: Position[] = [
    {
      id: '1eg',
      iFrame: 'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&oldid=371683795',
      text: 'Intressante text',
      order: 0,
      x: 20,
      y: 60,
      disabled: false,
    },
    {
      id: '2nb',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'testestest setestSET wett',
      order: 1,
      x: 5,
      y: 600,
      disabled: true,
    },
    {
      id: '151dde65-d46c-4b87-a543-349945524465',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Blablabla',
      order: 2,
      x: 40,
      y: 90,
      disabled: true,
    },
    {
      id: '84f0594f-af34-49ad-979c-9eb05b4ad23e',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 3,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '7ee8ba59-326b-402d-a2b6-29a73f019f0f',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 4,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '41ca064a-8184-42a1-a9fd-d3c4451e93b1',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 5,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '6152c778-02c5-42f4-869c-6ebd7a580830',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 6,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: 'fba311eb-a5c5-426b-b49d-680c0751fee7',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 7,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: 'a885e148-9fb2-4302-b92d-042e6dbbc128',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 8,
      x: 6660,
      y: 333,
      disabled: true,
    },
  ];
  currentPosition = 0;

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
    this.svgPanZoomMap = SvgPanZoom('#thesisMap', svgPanZoomOptions);
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

  onClickGroup(): void {
    console.log('Group was clicked');
  }

  onClickPosition(id: string): void {
    const clickedPosition = this.getPositionForId(id);
    console.log(clickedPosition);
    const currentPosition = this.getCurrentPosition();

    // Check if the clicked position is the next position.
    if (clickedPosition.order === currentPosition.order + 1) {
      // Yes
      this.onClickNextPosition();
    }
    // Open popup
    this.dialog.open(PopupComponent, {
      data: { iFrame: clickedPosition.iFrame, text: clickedPosition.text },
    });
  }

  onClickNextPosition(): void {
  
    this.currentPosition++;
    this.setDisabledStateForPositions();
  }

  onClickPreviousPosition(): void {
    this.currentPosition--;
    this.setDisabledStateForPositions();
  }

  onClickCenterView(): void {
    console.log('Center View was clicked');
  }

  /**
   * This method gets the current position within the story (a position with an order).
   */
  getCurrentPosition(): Position {
    const foundPositions = this.positions.filter(
      (position) => position.order === this.currentPosition
    );
    if (foundPositions.length <= 0) {
      console.log(`Could not find position for order: ${this.currentPosition}`);
      return;
    }
    return foundPositions[0];
  }

  /**
   * This method gets the position for the provided id.
   */
  getPositionForId(id: string): Position {
    const foundPositions = this.positions.filter(
      (position) => position.id === id
    );
    if (foundPositions.length <= 0) {
      console.log(`Could not find position for id: ${id}`);
      return;
    }
    return foundPositions[0];
  }

  getPositionDisabledState(positionToCheck: Position): boolean {
    const currentPosition = this.getCurrentPosition();

    // Is the position we are checking large than the current position + 1 (which indicates the next possible position).
    if (positionToCheck.order > currentPosition.order + 1) {
      // Disable knop (dus disabled = true)
      return true;
    }
    // Enable knop (dus disabled = false)
    return false;
    
  }

  setDisabledStateForPositions(): void {
    this.positions.forEach((position) => {
      position.disabled = this.getPositionDisabledState(position);
    });
  }
}
