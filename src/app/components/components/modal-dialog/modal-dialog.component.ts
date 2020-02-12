import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from '@angular/core';
import {trigger, transition, animate, style} from '@angular/animations';
import {Store} from '@app/store/store';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),

        animate('300ms ease-in', style({transform: 'translateY(5%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class ModalDialogComponent implements OnDestroy, OnInit {
  @Output() saveButtonAction: EventEmitter<any> = new EventEmitter();
  @Output() closeButtonAction: EventEmitter<any> = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() headerTitle = 'Create Tasks and Projects';
  @Input() noteTemplate = false;
  @Input() headerTemplate;
  @Input() footerTemplate;
  @Input() isSaveButtonDisabled = false;
  @Input() isCloseButtonDisabled = false;
  @Input() isFooterVisible = true;
  @Input() isHeaderVisible = true;
  @Input() visible;
  @Input() labelSave = 'Save';
  @Input() labelClose = 'Close';
  @Input() width = '70%';
  @Input() height = '565px';

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSaveButtonAction(): void {
    this.saveButtonAction.emit({buttonLabel: this.labelSave, save: true});
  }

  onCloseButtonAction(): void {
    this.closeButtonAction.emit({
      buttonLabel: this.labelClose,
      closed: false
    });
    this.store.set('showPopUp', false);
  }

  ngOnDestroy() {
  }
}
