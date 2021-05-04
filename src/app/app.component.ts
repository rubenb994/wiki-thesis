import { AfterViewInit, Component } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { Position } from 'src/models/position';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  svgPanZoomMap: SvgPanZoom.Instance;
  readonly svgZoomFactor = 2;
  readonly minZoom = 1;
  readonly maxZoom = 10;

  positions: Position[] = [
    {
      id: 'e4fff7aa-1fb9-46d5-adda-72c58b3b2b8e',
      iFrame: 'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&oldid=371683795',
      title: 'FIRST PAGE',
      text: 'On July 4th, 2010, editor name Melchior copied his original version of the page from the Wikipedia trial editor and created the page: Toilet paper orientation. Back then, Melchior was already an established Wikipedia with quite a list of edits under his name. As you can see in the window where the original page is displayed, the article was already quite substantial and well sourced.',
      order: 0,
      x: 5,
      y: 600,
      disabled: true,
    },
    {
      id: '151dde65-d46c-4b87-a543-349945524465',
      title: 'GOOD EDIT',
      iFrame:
        'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&diff=prev&oldid=815853210#mw-diff-otitle1',
      text:
        'After someone has created an article, everyone (with or without account) can continue editing. In this example, LindsayH made a series of improvements regarding writing and formatting. All edits are saved and can be found in the via the history tab on the top right of a page. This article later became a protected article that can only be edited by known Wikipedians. This was done due to its controversial topic which, as you will see later, caused intense discussions and vandalism of the page. ',
      order: 1,
      x: 40,
      y: 90,
      disabled: true,
    },
    {
      id: '84f0594f-af34-49ad-979c-9eb05b4ad23e',
      title: 'COMMUNITY',
      iFrame:
        'https://en.wikipedia.org/wiki/Talk:Toilet_paper_orientation',
      text:
        'On Wikipedia, every page has a dedicated discussion page that can be found in tabs on the top left of the page. The structure of this page is exactly the same: everyone can write, and every edit is saved and kept in the history page. The difference is its use, editors share their opinions, ask questions, and motivate their actions if necessary. As you can see, the discussion page of this article contains heavy debate about whether this should be on Wikipedia or not. ',
      order: 2,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '7ee8ba59-326b-402d-a2b6-29a73f019f0f',
      title: 'RULES FOR PARTICIPATION',
      iFrame:
        'https://en.wikipedia.org/wiki/Wikipedia:List_of_policies#Conduct',
      text:
        'To guide the online debate and make sure the democratic culture drives an equal collaboration for all participants, Wikipedia maintains a set of behavioural guides that stimulate good conduct. Wikipedia stimulates the transcendence of the individual and aim for the quality of content. Applying these roles in the talk pages means that the discussion maintains civil and productive. In addition, these rules can be used to assess behaviour and intervene if needed. The community can, as objectively as possible, motivate their reasons to restrict or ban access for misbehaving users. ',
      order: 3,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '41ca064a-8184-42a1-a9fd-d3c4451e93b1',
      title: 'POLICIES',
      iFrame:
        'https://en.wikipedia.org/wiki/Wikipedia:List_of_policies#Content',
      text:
        'To manage its content online, Wikipedia maintains three core content policies together with a few secondary ones. On the page which describes these principles, Wikipedia clearly states that these may not be edited. The page can only be edited to improve the application of explanation of the principles as these three core policies form the foundation of its functioning. ',
      order: 4,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '6152c778-02c5-42f4-869c-6ebd7a580830',
      title: 'VANDALISM',
      iFrame:
        'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&oldid=583107446',
      text:
        'The open design of Wikipedia means everyone can change. Unfortunately, people also abuse this and do harm to the content. Especially this page has been under constant attack as many people hold strong opinions on its existence and its content. In the example above, the page has been removed and the violator has left a message with his opinion. The page has been removed many times during its existence and usually is put back within several minutes. Others examples of vandalism are: writing strong opinions, disturbing content or text, and purposely grammar, information, and layout. ',
      order: 5,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: 'fba311eb-a5c5-426b-b49d-680c0751fee7',
      title: 'BOTS',
      iFrame:
        'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&type=revision&diff=934807176&oldid=934807165#mw-diff-otitle1',
      text:
        'Although there are many volunteering editors actively curating and protecting content, Wikipedia also uses bots to do the simple repetitive tasks. These bots are computer programs that automate functions and interact with Wikipedia as if they were human editors. Examples of their work can be adding templates to large amounts of pages or checking for obvious vandalism. Wikipedia offers many tools for creating bots together with a bot policy. ',
      order: 6,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: 'a885e148-9fb2-4302-b92d-042e6dbbc128',
      title: 'VOTE  FOR DELETION',
      iFrame:
        'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&direction=next&oldid=373122417#mw-content-text',
      text:
        'This article was signed up for deletion quickly after it was created. This process means that for a certain period of time, people can vote to delete the page or keep it online. On discussion map, this part of the discussion is highlighted. It was later removed and achieved when the decision was made to keep the article online. Several times later, the deletion process was posed again but rejected due to having passed this trajectory before. ',
      order: 7,
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '11cb99aa-9cc5-437c-98a7-fcf7364a6bda',
      title: 'ARCHIVE TWO',
      iFrame:
        'https://en.wikipedia.org/wiki/Talk:Toilet_paper_orientation/Archive_2',
      text:
        'This article was signed up for deletion quickly after it was created. This process means that for a certain period of time, people can vote to delete the page or keep it online. On discussion map, this part of the discussion is highlighted. It was later removed and achieved when the decision was made to keep the article online. Several times later, the deletion process was posed again but rejected due to having passed this trajectory before. ',
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '55c57baa-7fc5-4d39-a4bc-dd29ef9ccc64',
      title: 'ARCHIVE ONE',
      iFrame:
        'https://en.wikipedia.org/wiki/Talk:Toilet_paper_orientation/Archive_1',
      text:
        'This article was signed up for deletion quickly after it was created. This process means that for a certain period of time, people can vote to delete the page or keep it online. On discussion map, this part of the discussion is highlighted. It was later removed and achieved when the decision was made to keep the article online. Several times later, the deletion process was posed again but rejected due to having passed this trajectory before. ',
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: '1e537d9f-9733-4d63-80eb-cb511cb74757',
      title: 'CURRENT TALK PAGE',
      iFrame:
        'https://en.wikipedia.org/wiki/Talk:Toilet_paper_orientation',
      text:
        'This article was signed up for deletion quickly after it was created. This process means that for a certain period of time, people can vote to delete the page or keep it online. On discussion map, this part of the discussion is highlighted. It was later removed and achieved when the decision was made to keep the article online. Several times later, the deletion process was posed again but rejected due to having passed this trajectory before. ',
      x: 6660,
      y: 333,
      disabled: true,
    },
    {
      id: 'e23f5176-3528-4d7b-bc26-6c2c8525e556',
      title: 'DELETED',
      iFrame:
        'https://en.wikipedia.org/w/index.php?title=Toilet_paper_orientation&oldid=371683795',
      text:
        'This article was signed up for deletion quickly after it was created. This process means that for a certain period of time, people can vote to delete the page or keep it online. On discussion map, this part of the discussion is highlighted. It was later removed and achieved when the decision was made to keep the article online. Several times later, the deletion process was posed again but rejected due to having passed this trajectory before. ',
      x: 6660,
      y: 333,
      disabled: true,
    },
  ];
  currentPosition = 0;

  constructor(private dialog: MatDialog) {
    this.setDisabledStateForPositions();
  }

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
    this.onClickPosition('e4fff7aa-1fb9-46d5-adda-72c58b3b2b8e');
    
    this.svgPanZoomMap = SvgPanZoom('#thesisMap', svgPanZoomOptions);
    this.svgPanZoomMap.zoom(3);
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
    const currentPosition = this.getCurrentPosition();

    // Check if the clicked position is the next position.
    if (
      currentPosition.order &&
      clickedPosition.order === currentPosition.order + 1
    ) {
      // Yes
      this.onClickNextPosition();
    }
    // Open popup
    this.dialog.open(PopupComponent, {
      data: {
        iFrame: clickedPosition.iFrame,
        title: clickedPosition.title,
        text: clickedPosition.text,
      },
    });
  }

  onClickNextPosition(): void {
    this.currentPosition++;
    this.setDisabledStateForPositions();
        // Wat is de current positions
        const currentPosition = this.getCurrentPosition();
        // Haal HTML element op voor current position
        const positionElement = document.getElementById(
          `position-${currentPosition.order}`
        );
        // Zoom element naar center
        this.panElementToCenter(positionElement);
  }

  onClickPreviousPosition(): void {
    this.currentPosition--;
    this.setDisabledStateForPositions();
            // Wat is de current positions
            const currentPosition = this.getCurrentPosition();
            // Haal HTML element op voor current position
            const positionElement = document.getElementById(
              `position-${currentPosition.order}`
            );
            // Zoom element naar center
            this.panElementToCenter(positionElement);
  }

  onClickCenterView(): void {
    // Wat is de current positions
    const currentPosition = this.getCurrentPosition();
    // Haal HTML element op voor current position
    const positionElement = document.getElementById(
      `position-${currentPosition.order}`
    );
    // Zoom element naar center
    this.panElementToCenter(positionElement);
  }

  onClickInfo(): void {}

  positionVisible(order: number): boolean {
    return this.currentPosition + 1 >= order;
  }

  panElementToCenter(element: HTMLElement): void {
    const body = document.body;
    const bodyPositonInfo = body.getBoundingClientRect();
    const elementPositionInfo = element.getBoundingClientRect();

    const xToMove = bodyPositonInfo.width / 2 - elementPositionInfo.x;
    const yToMove = bodyPositonInfo.height / 2 - elementPositionInfo.y;
    this.customPanBy({ x: xToMove, y: yToMove });
  }

  customPanBy(amount): void {
    // {x: 1, y: 2}
    var animationTime = 300, // ms
      animationStepTime = 15, // one frame per 30 ms
      animationSteps = animationTime / animationStepTime,
      animationStep = 0,
      intervalID = null,
      stepX = amount.x / animationSteps,
      stepY = amount.y / animationSteps;
    const svgPanZoomMapCopy = this.svgPanZoomMap;
    intervalID = setInterval(() => {
      if (animationStep++ < animationSteps) {
        svgPanZoomMapCopy.panBy({ x: stepX, y: stepY });
      } else {
        // Cancel interval
        clearInterval(intervalID);
      }
    }, animationStepTime);
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
