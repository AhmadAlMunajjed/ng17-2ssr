import { CanMatchFn } from '@angular/router';

export const prefixGuard: CanMatchFn = (route, segments) => {
  const prefix = segments[0].path;
  const canMatch = ['en', 'ar', 'de'].includes(prefix);
  return canMatch;
};
