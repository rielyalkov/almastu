import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlacesService} from '../../services/places.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-delete-place-dialog',
  templateUrl: './delete-place-dialog.component.html',
  styleUrls: ['./delete-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePlaceDialogComponent implements OnDestroy {

  public isDeleting: boolean;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private placesService: PlacesService,
    private dialogRef: MatDialogRef<DeletePlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {docId: string, name: string},
  ) { }

  deletePlace(id: string): void {
    this.isDeleting = true;
    this.placesService.deletePlace(id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.isDeleting = false;
      this.dialogRef.close();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}
