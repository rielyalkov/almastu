import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { serverTimestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css']
})
export class NewsEditorComponent implements OnInit {

  @ViewChild('text') text: ElementRef;
  selection: [number, number, string] = [0, 0, ''];

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.openFormatMenu();
  }

  openFormatMenu(): void {
    const sheet = this.bottomSheet.open(EditorSheetComponent, {data: this.selection});
    sheet.afterDismissed().subscribe((obj) => {
      if (obj) {
        if (obj.dialog) {
          const dialog = obj.dialog as MatDialogRef<EditorInsertDialogComponent>;
          dialog.afterClosed().subscribe((objDial) => {
            if (objDial) {
              const textToAdd = objDial.data;
              this.text.nativeElement.value += textToAdd;
            }
          });
        }
        if (obj.formattedStr) {
          const txt = obj.formattedStr[0];
          const indices = obj.formattedStr[1];
          let current = (this.text.nativeElement.value as string).split('');
          const currentEnd = [...current.slice(indices[1])];
          current.splice(indices[0], (indices[1] - indices[0]) + currentEnd.length);
          current = [...current, ...txt.split(''), ...currentEnd];
          this.text.nativeElement.value = current.join('');
        }
      }
    });
  }

  recordSelection(): void {
    this.selection = [this.text.nativeElement.selectionStart, this.text.nativeElement.selectionEnd, window.getSelection().toString()];
  }

  send(title, text): void {
    const news = {
      name: title,
      html: text,
      time: serverTimestamp()
    };
    this.firestore.collection('news').add(news).then(() => {
      this.snack.open('Новость загружена!', undefined, {duration: 1000});
    });
  }

  constructor(private bottomSheet: MatBottomSheet, private firestore: AngularFirestore, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    document.onselectionchange = () => this.recordSelection();
  }

}

@Component({
  selector: 'app-editor-sheet',
  templateUrl: 'templates/bottom-sheet.html',
  styleUrls: ['templates/bottom-sheet.css']
})
export class EditorSheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public selectionShared: [number, number, string],
    private bs: MatBottomSheetRef,
    public dialog: MatDialog
  ) {}

  offsets: [number, number] = [this.selectionShared[0], this.selectionShared[1]];
  flags: string[] = [];
  selectionText = this.selectionShared[2];

  onTapped(event, choice): void {
    const dialog = this.dialog.open(EditorInsertDialogComponent, {data: choice});
    this.bs.dismiss({dialog});
  }

  preview(): string {
    let result = this.selectionText;
    this.flags.forEach((tag) => {
      result = `<${tag}>` + result + `</${tag}>`;
    });
    return result;
  }

  formatDone(): void {
    this.bs.dismiss({formattedStr: [this.preview(), this.offsets]});
  }

}


@Component({
  selector: 'app-editor-insert-dialog',
  templateUrl: 'templates/insert-dialog.html',
  styleUrls: ['templates/insert-dialog.css']
})
export class EditorInsertDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditorInsertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public choice: string,
  ) {
  }

  add_image(link): void {
    const element = `<img src=${link} alt="Фото">`;
    this.dialogRef.close({data: element});
  }

  add_link(title, link): void {
    const element = `<a href="${link}">${title}</a>`;
    this.dialogRef.close({data: element});
  }
}
