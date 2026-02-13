import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export interface WatermarkOptions {
  type: 'text' | 'image';
  text?: string;
  imagePath?: string;
  opacity?: number; // 0-1
  rotation?: number; // degrees
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'tile';
  scale?: number; // 0.1 to 1.0 (relative to image size)
  color?: string; // Hex for text
  fontSize?: number;
}

export class WatermarkService {

  async applyWatermark(
    inputPath: string,
    options: WatermarkOptions
  ): Promise<string> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Could not retrieve image metadata');
    }

    const width = metadata.width;
    const height = metadata.height;

    let overlay: Buffer;

    if (options.type === 'text' && options.text) {
      overlay = await this.createTextOverlay(options.text, width, height, options);
    } else if (options.type === 'image' && options.imagePath) {
      overlay = await this.createImageOverlay(options.imagePath, width, height, options);
    } else {
      throw new Error('Invalid watermark options: Missing text or imagePath');
    }

    const outputFilename = `${path.basename(inputPath, path.extname(inputPath))}_watermarked${path.extname(inputPath)}`;
    const outputPath = path.join(path.dirname(inputPath), outputFilename);

    await image
      .composite([{ input: overlay, blend: 'over' }])
      .toFile(outputPath);

    return outputPath;
  }

  async applyWatermarkBatch(
    inputs: { path: string; options?: WatermarkOptions }[],
    defaultOptions: WatermarkOptions
  ): Promise<{ path: string; error?: string }[]> {
    const results: { path: string; error?: string }[] = [];
    for (const input of inputs) {
      try {
        const opts = { ...defaultOptions, ...input.options };
        const result = await this.applyWatermark(input.path, opts);
        results.push({ path: result });
      } catch (error) {
        console.error(`Batch watermark failed for ${input.path}:`, error);
        results.push({ path: '', error: (error as Error).message });
      }
    }
    return results;
  }

  private async createTextOverlay(
    text: string,
    containerWidth: number,
    containerHeight: number,
    options: WatermarkOptions
  ): Promise<Buffer> {
    const fontSize = options.fontSize || Math.floor(containerWidth * 0.05); // Default 5% of width
    const color = options.color || '#000000';
    const opacity = options.opacity ?? 0.5;
    const rotation = options.rotation || 0;

    // Create SVG for text
    const svgText = `
      <svg width="${containerWidth}" height="${containerHeight}">
        <style>
          .heavy { font: bold ${fontSize}px sans-serif; fill: ${color}; fill-opacity: ${opacity}; }
        </style>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="heavy" transform="rotate(${rotation}, ${containerWidth / 2}, ${containerHeight / 2})">
          ${text}
        </text>
      </svg>
    `;

    if (options.position === 'tile') {
      return this.createTiledOverlay(Buffer.from(svgText), containerWidth, containerHeight, options);
    }

    return Buffer.from(svgText);
  }

  private async createImageOverlay(
    imagePath: string,
    containerWidth: number,
    containerHeight: number,
    options: WatermarkOptions
  ): Promise<Buffer> {
    const watermark = sharp(imagePath);
    const wmMetadata = await watermark.metadata();

    if (!wmMetadata.width || !wmMetadata.height) {
      throw new Error('Invalid watermark image');
    }

    const scale = options.scale || 0.2;
    // Calculate new width maintaining aspect ratio
    const newWidth = Math.floor(containerWidth * scale);
    const newHeight = Math.floor(wmMetadata.height * (newWidth / wmMetadata.width));

    let wPipeline = watermark
      .resize(newWidth, newHeight)
      .rotate(options.rotation || 0, { background: { r: 0, g: 0, b: 0, alpha: 0 } });

    if (options.opacity !== undefined) {
      // Use SVG wrapper for opacity
      const imageBuffer = await watermark.png().toBuffer();
      const b64 = imageBuffer.toString('base64');
      const svgImg = `
          <svg width="${containerWidth}" height="${containerHeight}">
            <image href="data:image/png;base64,${b64}" x="${(containerWidth - newWidth) / 2}" y="${(containerHeight - newHeight) / 2}" width="${newWidth}" height="${newHeight}" opacity="${options.opacity}" transform="rotate(${options.rotation || 0}, ${containerWidth / 2}, ${containerHeight / 2})" />
          </svg>
        `;

      if (options.position === 'tile') {
        return Buffer.from(svgImg); // Placeholder: Tiling standard logic below
      }

      // Position logic
      let x = (containerWidth - newWidth) / 2;
      let y = (containerHeight - newHeight) / 2;

      if (options.position === 'top-left') { x = 20; y = 20; }
      if (options.position === 'top-right') { x = containerWidth - newWidth - 20; y = 20; }
      if (options.position === 'bottom-left') { x = 20; y = containerHeight - newHeight - 20; }
      if (options.position === 'bottom-right') { x = containerWidth - newWidth - 20; y = containerHeight - newHeight - 20; }

      const svgImgPositioned = `
          <svg width="${containerWidth}" height="${containerHeight}">
            <image href="data:image/png;base64,${b64}" x="${x}" y="${y}" width="${newWidth}" height="${newHeight}" opacity="${options.opacity}" transform="rotate(${options.rotation || 0}, ${x + newWidth / 2}, ${y + newHeight / 2})" />
          </svg>
        `;

      return Buffer.from(svgImgPositioned);
    }

    const processedWatermark = await wPipeline.toBuffer();

    const compositeList: sharp.OverlayOptions[] = [{ input: processedWatermark, gravity: 'center' }];

    if (options.position === 'top-left') compositeList[0].gravity = 'northwest';
    if (options.position === 'top-right') compositeList[0].gravity = 'northeast';
    if (options.position === 'bottom-left') compositeList[0].gravity = 'southwest';
    if (options.position === 'bottom-right') compositeList[0].gravity = 'southeast';

    return sharp({
      create: {
        width: containerWidth,
        height: containerHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite(compositeList)
      .png()
      .toBuffer();
  }

  private async createTiledOverlay(
    watermarkElement: Buffer,
    width: number,
    height: number,
    options: WatermarkOptions
  ): Promise<Buffer> {
    if (options.type === 'text') {
      const fontSize = options.fontSize || 40;
      const color = options.color || '#000000';
      const opacity = options.opacity ?? 0.3;
      const rotation = options.rotation || -45;

      // Improve tiling using SVG pattern
      const svgPattern = `
          <svg width="${width}" height="${height}">
            <defs>
              <pattern id="wm-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                <text x="150" y="150" text-anchor="middle" dominant-baseline="middle" 
                  font-family="sans-serif" font-weight="bold" font-size="${fontSize}" 
                  fill="${color}" fill-opacity="${opacity}" 
                  transform="rotate(${rotation}, 150, 150)">
                  ${options.text}
                </text>
              </pattern>
            </defs>
            <rect x="0" y="0" width="${width}" height="${height}" fill="url(#wm-pattern)" />
          </svg>
        `;
      return Buffer.from(svgPattern);
    }

    return watermarkElement;
  }
}

export const watermarkService = new WatermarkService();
