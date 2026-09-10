/** Builds a thum.io live-capture URL: waits for the page to settle before shooting. */
export function screenshotUrl(url: string) {
  return `https://image.thum.io/get/noanimate/wait/8/width/1600/crop/1000/viewportWidth/1440/${url}`;
}
