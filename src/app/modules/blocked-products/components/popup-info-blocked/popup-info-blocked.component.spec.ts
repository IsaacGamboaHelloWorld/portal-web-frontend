import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from '@app/shared/modal/services/modal.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PopupInfoBlockedComponent } from './popup-info-blocked.component';

describe('PopupInfoBlockedComponent', () => {
  let component: PopupInfoBlockedComponent;
  let fixture: ComponentFixture<PopupInfoBlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PopupInfoBlockedComponent],
      providers: [ManipulateDomService, ModalService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInfoBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    component.close();
    expect(spyClose).toHaveBeenCalled();
  });
});
