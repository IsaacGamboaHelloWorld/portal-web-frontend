import { TestBed } from '@angular/core/testing';
import { TestingModule } from './../../../../../test-helpers/testing.module';
import { ManipulateDomService } from './../../../core/services/manipulate-dom/manipulate-dom.service';

import { UtilsDocumentsService } from './utils-documents.service';

describe('UtilsDocumentsService', () => {
  let service: UtilsDocumentsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [UtilsDocumentsService, ManipulateDomService],
    });
    service = TestBed.get(UtilsDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setupDomStyles with arguments', () => {
    const classes = [
      'pb-width-full',
      'pb-col-sp-4',
      'changes-styles-in-documents-ds',
      'pb-col-ld-12',
    ];

    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'addClass');

    service.setupDomStyles(true, classes);

    expect(spy).toHaveBeenCalled();
  });
});
