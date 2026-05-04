import { IssueStatusPipe } from './issue-status.pipe';

describe('IssueStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new IssueStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
