import { utilities } from '@cornerstonejs/tools';

export function setCineState(
  isPlaying: boolean,
  frameRate: number,
  element: HTMLDivElement
) {
  if (isPlaying) {
    utilities.cine.playClip(element, {
      framesPerSecond: frameRate,
    });
  } else {
    utilities.cine.stopClip(element);
  }
}
