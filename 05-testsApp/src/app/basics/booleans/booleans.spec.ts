import { userLoggedIn } from "./booleans"

describe('Booleans tests', () => {
  it('It should return true', () => {
    const res = userLoggedIn();
    expect(res).toBeTruthy();
    // expect(res).toBeFalsy();
    // expect(res).not.toBeTruthy();
  })
})