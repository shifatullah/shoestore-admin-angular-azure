import { AuthService } from './auth.service';

describe('Auth', () => {
  it('should create an instance', () => {
    expect(new AuthService(null, null)).toBeTruthy();
  });
});
