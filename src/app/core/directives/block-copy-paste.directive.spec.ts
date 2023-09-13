import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';

@Component({
  template: `
    <input type="text" appBlockCopyPaste />
  `,
})
class BlockCopyPasteComponent {}

describe('BlockCopyPasteDirective', () => {
  let component: BlockCopyPasteComponent;
  let fixture: ComponentFixture<BlockCopyPasteComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [BlockCopyPasteComponent, BlockCopyPasteDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(BlockCopyPasteComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new BlockCopyPasteDirective();
    expect(directive).toBeTruthy();
  });

  it('should be validate pasted data', () => {
    const input = fixture.debugElement.query(By.css('input'));

    input.nativeElement.dispatchEvent(
      new ClipboardEvent('paste', {
        clipboardData: null,
      }),
    );

    expect(input.nativeElement.value).toEqual('');
  });
});
