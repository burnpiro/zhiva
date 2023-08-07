import { Types as CSTypes } from '@cornerstonejs/core';

export async function updateImages(
  viewport: CSTypes.IStackViewport,
  imageIds: string[]
) {
  await viewport.setStack(imageIds);
}
