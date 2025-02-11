import { BrowserQRCodeSvgWriter } from '@zxing/library/esm/browser/BrowserQRCodeSvgWriter';
import ErrorCorrectionLevel from '@zxing/library/esm/core/qrcode/decoder/ErrorCorrectionLevel';
import Encoder from '@zxing/library/esm/core/qrcode/encoder/Encoder';

class QRCodeFancySvgWriter extends BrowserQRCodeSvgWriter {
  FILL_COLOR = '#311b58';

  POSITION_SIDE = 7;

  renderResult(code, width, height, quietZone) {
    const input = code.getMatrix();
    const inputWidth = input.getWidth();
    const inputHeight = input.getHeight();
    const qrWidth = inputWidth + quietZone * 2;
    const qrHeight = inputHeight + quietZone * 2;
    const outputWidth = Math.max(width, qrWidth);
    const outputHeight = Math.max(height, qrHeight);

    const multiple = Math.min(
      Math.floor(outputWidth / qrWidth),
      Math.floor(outputHeight / qrHeight),
    );

    const leftPadding = Math.floor((outputWidth - inputWidth * multiple) / 2);
    const topPadding = Math.floor((outputHeight - inputHeight * multiple) / 2);

    const svgElement = this.createSVGElement(outputWidth, outputHeight);

    for (
      let inputY = 0, outputY = topPadding;
      inputY < inputHeight;
      inputY += 1, outputY += multiple
    ) {
      for (
        let inputX = 0, outputX = leftPadding;
        inputX < inputWidth;
        inputX += 1, outputX += multiple
      ) {
        if (input.get(inputX, inputY) === 1) {
          const isPartOfPositionPattern =
            (inputX < this.POSITION_SIDE && inputY < this.POSITION_SIDE) ||
            (inputX > inputWidth - this.POSITION_SIDE - 1 && inputY < this.POSITION_SIDE) ||
            (inputY > inputHeight - this.POSITION_SIDE - 1 && inputX < this.POSITION_SIDE);
          const svgChildElement = this.createSvgChildElement(
            outputX,
            outputY,
            multiple,
            multiple,
            isPartOfPositionPattern,
          );
          svgElement.appendChild(svgChildElement);
        }
      }
    }

    return svgElement;
  }

  createSvgChildElement(x, y, w, h, isRect) {
    const el = document.createElementNS(BrowserQRCodeSvgWriter.SVG_NS, isRect ? 'rect' : 'circle');
    if (isRect) {
      el.setAttribute('x', x);
      el.setAttribute('y', y);
      el.setAttribute('height', w);
      el.setAttribute('width', h);
    } else {
      el.setAttribute('cx', x + w / 2);
      el.setAttribute('cy', y + h / 2);
      el.setAttribute('r', w * 0.4);
    }
    el.setAttribute('fill', this.FILL_COLOR);
    return el;
  }
}

export default (content, side) =>
  new QRCodeFancySvgWriter().renderResult(
    Encoder.encode(content, ErrorCorrectionLevel.L),
    side,
    side,
    0,
  );
