import { TestBed, inject } from '@angular/core/testing';

import { HttpRespPdfReqJsonService } from './http-resp-pdf-req-json.service';

describe('HttpRespPdfReqJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRespPdfReqJsonService]
    });
  });

  it('should be created', inject([HttpRespPdfReqJsonService], (service: HttpRespPdfReqJsonService) => {
    expect(service).toBeTruthy();
  }));
});
