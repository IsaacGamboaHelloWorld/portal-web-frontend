import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ProfileModelMock } from '@app/modules/profile/store/model/mock/profile-model-mock';
import { ProfileModel } from '@app/modules/profile/store/model/profile.model';
import { TestingModule } from '../../../../../../../../../test-helpers/testing.module';
import { EditEmploymentDataComponent } from './edit-employment-data.component';

describe('EditEmploymentDataComponent', () => {
  let component: EditEmploymentDataComponent;
  let fixture: ComponentFixture<EditEmploymentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmploymentDataComponent],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ManipulateDomService,
        {
          provide: ProfileModel,
          useClass: ProfileModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmploymentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
