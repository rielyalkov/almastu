import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css']
})
export class NewsEditorComponent implements OnInit {

  selection = null;

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.openFormatMenu();
  }

  openFormatMenu(): void {
    this.bottomSheet.open(EditorSheetComponent, {data: this.selection});
  }

  recordSelection(): void{
    this.selection = window.getSelection();
  }

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    document.onselectionchange = () => this.recordSelection();
  }

}

@Component({
  selector: 'app-editor-sheet',
  templateUrl: 'templates/bottom-sheet.html',
})
export class EditorSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public selection: string,
    private bs: MatBottomSheetRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.selection.toString() !== '') {
      document.getElementById('formatting').style.display = 'block';
      document.getElementById('selection').innerHTML = this.selection;
    } else {
      document.getElementById('add').style.display = 'block';
    }
  }

  onTapped(event, choice): void {
    this.dialog.open(EditorInsertDialogComponent, {data: choice});
    this.bs.dismiss();
  }

}


@Component({
  selector: 'app-editor-insert-dialog',
  templateUrl: 'templates/insert-dialog.html',
  styleUrls: ['templates/insert-dialog.css']
})
export class EditorInsertDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public choice: string,
  ) { }

  ngOnInit(): void {
    console.log(this.choice);
  }
}
