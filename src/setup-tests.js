import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Automatically unmount and cleanup DOM after each test
afterEach(() => {
  cleanup();
});