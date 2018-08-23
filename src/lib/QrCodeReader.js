import { BrowserQRCodeReader } from '@zxing/library/esm5/browser/BrowserQRCodeReader';

export default class QRCodeReader extends BrowserQRCodeReader {
  async decodeFromInputVideoDevice(videoConstraints, videoElement) {
    this.reset();
    this.prepareVideoElement(videoElement);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
    });
    this.stream = stream;
    this.videoElement.srcObject = stream;

    const p = new Promise((resolve, reject) => {
      this.videoPlayingEventListener = () =>
        this.decodeOnceWithDelay(resolve, reject);
    });

    this.videoElement.addEventListener('playing', this.videoPlayingEventListener);
    this.videoElement.play();

    return p;
  }
}
