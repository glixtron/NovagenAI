import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export type AllowedFormat =
  | 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif'
  | 'pdf' | 'docx' | 'doc' | 'txt' | 'rtf' | 'odt'
  | 'csv' | 'xls' | 'xlsx' | 'ods'
  | 'ppt' | 'pptx' | 'odp';

export interface ConversionOptions {
  quality?: number; // 1-100 for images
  width?: number; // Resize width
  height?: number; // Resize height
  density?: number; // API density for PDF conversion
}

export class FileConverterService {
  private tempDir: string = '/tmp/novagen-conversion';

  constructor() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Main entry point for file conversion
   */
  async convert(
    inputPath: string,
    outputFormat: AllowedFormat,
    options: ConversionOptions = {}
  ): Promise<string> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const inputExt = path.extname(inputPath).toLowerCase().replace('.', '');
    const outputFilename = `${path.basename(inputPath, path.extname(inputPath))}_converted.${outputFormat}`;
    const outputPath = path.join(path.dirname(inputPath), outputFilename);

    // Image Conversion
    if (this.isImage(inputExt) && this.isImage(outputFormat)) {
      return this.convertImage(inputPath, outputPath, outputFormat, options);
    }

    // Document/Presentation/Spreadsheet Conversion (LibreOffice)
    if (this.isOfficeFile(inputExt) || outputFormat === 'pdf' || (this.isOfficeFile(outputFormat) && inputExt === 'pdf')) {
      return this.convertDocument(inputPath, outputPath, outputFormat);
    }

    throw new Error(`Unsupported conversion: ${inputExt} to ${outputFormat}`);
  }

  /**
   * Batch Conversion
   */
  async convertBatch(
    inputs: { path: string; format?: AllowedFormat; options?: ConversionOptions }[],
    defaultFormat: AllowedFormat,
    defaultOptions: ConversionOptions = {}
  ): Promise<{ path: string; error?: string }[]> {
    const results: { path: string; error?: string }[] = [];

    for (const input of inputs) {
      try {
        const format = input.format || defaultFormat;
        const opts = { ...defaultOptions, ...input.options };
        const result = await this.convert(input.path, format, opts);
        results.push({ path: result });
      } catch (error) {
        console.error(`Batch conversion failed for ${input.path}:`, error);
        results.push({ path: '', error: (error as Error).message });
      }
    }
    return results;
  }

  private isImage(ext: string): boolean {
    return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'tiff'].includes(ext);
  }

  private isOfficeFile(ext: string): boolean {
    return ['doc', 'docx', 'txt', 'rtf', 'odt', 'csv', 'xls', 'xlsx', 'ods', 'ppt', 'pptx', 'odp', 'pdf'].includes(ext);
  }

  /**
   * Handle Image Conversion using Sharp
   */
  private async convertImage(
    inputPath: string,
    outputPath: string,
    format: string,
    options: ConversionOptions
  ): Promise<string> {
    let pipeline = sharp(inputPath);

    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height);
    }

    if (format === 'jpg' || format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: options.quality || 80 });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality: options.quality || 80 });
    } else if (format === 'webp') {
      pipeline = pipeline.webp({ quality: options.quality || 80 });
    } else if (format === 'gif') {
      pipeline = pipeline.gif();
    }

    await pipeline.toFile(outputPath);
    return outputPath;
  }

  /**
   * Handle Document Conversion using LibreOffice
   */
  private async convertDocument(
    inputPath: string,
    outputPath: string,
    format: string
  ): Promise<string> {
    const outDir = path.dirname(outputPath);
    const targetFormat = format;

    // Sanitize inputs to prevent command injection
    const safeInput = inputPath.replace(/["$`\\]/g, '');
    const safeOutDir = outDir.replace(/["$`\\]/g, '');
    const cmd = `soffice --headless --convert-to ${targetFormat} "${safeInput}" --outdir "${safeOutDir}"`;

    try {
      await execAsync(cmd);

      const loOutputName = `${path.basename(inputPath, path.extname(inputPath))}.${targetFormat}`;
      const loMakePath = path.join(outDir, loOutputName);

      if (loMakePath !== outputPath && fs.existsSync(loMakePath)) {
        fs.renameSync(loMakePath, outputPath);
      }

      if (fs.existsSync(outputPath)) {
        return outputPath;
      } else {
        throw new Error('Conversion failed: Output file not created');
      }
    } catch (error) {
      console.error('LibreOffice Conversion Error:', error);
      throw new Error(`Document conversion failed: ${error}`);
    }
  }

  /**
   * Extract text from a document using LibreOffice
   */
  async extractText(inputPath: string): Promise<string> {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const outputDir = path.dirname(inputPath);
    const fileName = path.basename(inputPath, path.extname(inputPath));
    const txtOutputPath = path.join(outputDir, `${fileName}.txt`);

    // Sanitize input
    const safeInput = inputPath.replace(/["$`\\]/g, '');
    const safeOutputDir = outputDir.replace(/["$`\\]/g, '');
    const cmd = `soffice --headless --convert-to txt "${safeInput}" --outdir "${safeOutputDir}"`;

    try {
      await execAsync(cmd);

      if (fs.existsSync(txtOutputPath)) {
        const content = fs.readFileSync(txtOutputPath, 'utf8');
        try { fs.unlinkSync(txtOutputPath); } catch { } // Clean up
        return content;
      } else {
        throw new Error('Text extraction failed: Output file not created');
      }
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error(`Failed to extract text: ${error}`);
    }
  }
}

export const fileConverterService = new FileConverterService();
