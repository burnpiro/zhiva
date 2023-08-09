import { Types as CSTypes } from '@cornerstonejs/core';

export async function updateVolumes(
  viewport: CSTypes.IVolumeViewport,
  volumes: CSTypes.IVolumeInput[]
) {
  await viewport.setVolumes(volumes, false, false)
}
