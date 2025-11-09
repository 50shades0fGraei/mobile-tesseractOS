import { stageSegment } from './VCS.js';

export function OCD(segment: string, state: boolean): void {
  stageSegment(segment, state);
}
