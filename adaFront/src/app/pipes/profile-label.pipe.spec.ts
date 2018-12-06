import { ProfileLabelPipe } from './profile-label.pipe';
import { ListsMockService } from '../services/lists-mock.service';

describe('ProfileLabelPipe', () => {

  let pipe: ProfileLabelPipe;

  beforeEach(() => {
    pipe = new ProfileLabelPipe(new ListsMockService());
  });

  it('transform ROLE_ADMIN to ADMIN', () => {

    expect(pipe.transform('ROLE_ADMIN')).toEqual('ADMIN');
  });

  it('transform ROLE_CUSTUMER to CUSTUMER', () => {

    expect(pipe.transform('ROLE_CUSTUMER')).toEqual('CUSTUMER');
  });

  it('transform ROLE_TECHNICIAN to TECHNICIAN', () => {

    expect(pipe.transform('ROLE_TECHNICIAN')).toEqual('TECHNICIAN');
  });

});
