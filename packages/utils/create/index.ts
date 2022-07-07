import { createBEM } from './bem';

export function createNamespace(name: string) {
  name = `hxm-${name}`;
  return [
    createBEM(name),
  ] as const;
}
