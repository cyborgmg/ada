import { StatusLabelPipe } from './status-label.pipe';
import { TestBed, async } from '@angular/core/testing';
import { ListsService } from '../services/lists.service';
import { AppModule } from '../app.module';

describe('StatusLabelPipe', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatusLabelPipe
      ],
      providers: [
        ListsService
      ]
    }).compileComponents();
  }));

  it('should create the ProfileLabelPipe', async(() => {
    const fixture = TestBed.createComponent(StatusLabelPipe);
    const statusLabelPipe: StatusLabelPipe = fixture.debugElement.componentInstance;
    expect(statusLabelPipe).toBeTruthy();
  }));

});
