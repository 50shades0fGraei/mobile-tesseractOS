import { overrideSegment } from './VCS.js';

export function Warp(segment: string, override: string): void {
  overrideSegment(segment, override);
}
