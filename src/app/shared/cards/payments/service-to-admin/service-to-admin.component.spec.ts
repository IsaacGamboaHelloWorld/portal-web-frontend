import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceToAdminComponent } from './service-to-admin.component';

xdescribe('ServiceToAdminComponent', () => {
  let component: ServiceToAdminComponent;
  let fixture: ComponentFixture<ServiceToAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceToAdminComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
