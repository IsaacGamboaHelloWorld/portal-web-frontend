import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { NavigateDocuments } from '../documents/entities/routes';

import { DocumentsDsComponent } from './documents-ds.component';

describe('DocumentsDsComponent', () => {
  let component: DocumentsDsComponent;
  let fixture: ComponentFixture<DocumentsDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsDsComponent],
      imports: [TestingModule],
      providers: [ManipulateDomService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(NavigateDocuments);
  });
});
