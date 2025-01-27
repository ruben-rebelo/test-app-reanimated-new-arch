import { describe, expect, it, jest } from '@jest/globals';

import { SharedValueWeb } from './SharedValueWeb';

describe('Shared Value Web', () => {
  it('should keep the current and the previous values', () => {
    const sharedValue = new SharedValueWeb(0);
    sharedValue.value = 1;

    expect(sharedValue.value).toBe(1);
    expect(sharedValue.previousValue).toBe(0);
  });

  it('should notify listeners when the value changes', () => {
    const sharedValue = new SharedValueWeb(0);
    const listener = jest.fn();

    sharedValue.subscribe(listener);
    sharedValue.value = 1;

    // Initial value + new value
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenCalledWith(0, 1);
  });

  it('should not notify listeners if they unsubscribe', () => {
    const sharedValue = new SharedValueWeb(0);
    const listener = jest.fn();

    const unsubscribe = sharedValue.subscribe(listener);
    unsubscribe();
    sharedValue.value = 1;

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(0, 0);
  });
});
