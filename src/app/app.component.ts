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
  readonly maxZoom = 15;

  positions: Position[] = [
    {
      id: '340d79e8-05f7-4275-83a7-0ad527e37615',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text',
      order: 0,
      x: 20,
      y: 60,
      disabled: false,
    },
    {
      id: 'c3667925-f539-45be-9562-efac73d2f559',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'testestest setestSET wett',
      order: 1,
      x: 5,
      y: 600,
      disabled: true,
    },
    {
      id: 'f00a4777-c08a-4d35-9b3a-38b5071a8f6d',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Blablabla',
      order: 2,
      x: 40,
      y: 90,
      disabled: true,
    },
    {
      id: 'f2fe32d1-e1a2-4920-8f73-1212af364ccd',
      iFrame: 'wikipedia.nl/bla/bla',
      text: 'Intressante text 123',
      order: 3,
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
    this.setDisabledStateForPositions();
    this.currentPosition++;
    const nextPosition = this.getCurrentPosition();
  }

  onClickPreviousPosition(): void {
    console.log('Previous Position was clicked');
  }

  onClickCenterView(): void {
    console.log('Center View was clicked');
  }

  /**
   * This method gets the current position within the story (a position with a order).
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
