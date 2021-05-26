import { Command, flags } from '@oclif/command'

import * as fs from 'fs';
import * as sharp from 'sharp';

enum Encoders {
  JPEG = 'jpeg',
  WEBP = 'webp',
  AVIF = 'avif',
}

class Sharpie extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    quality: flags.integer({ char: 'q', default: 60 }),
    // flag with a value (-n, --name=VALUE)
    type: flags.string({ char: 't', description: 'encoder to use' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [
    {
      name: 'input',
      description: 'input image file path (source)'
    },
    {
      name: 'output',
      description: 'encoded output image file path (target)'
    },
  ]

  protected quality: number = 60;

  async run() {
    const { args, flags } = this.parse(Sharpie)

    const input = args.input;
    const output = args.output;
    const encType = flags.type ?? Encoders.JPEG;
    const encoders: String[] = Object.values(Encoders);

    if (!encoders.includes(encType)) {
      this.error('You entered an invalid encoder');
      this.exit(1);
    }

    if (!input || !output) {
      this.error('Arguments "input" and "output" MUST be specified');
      this.exit(1);
    }

    if (!fs.existsSync(input)) {
      this.error('Could not find input file path');
      this.exit(1);
    }

    this.quality = flags.quality;

    // show a warning
    this.warn(`Converting file ${input} using "${encType}" encoder with quality ${this.quality}`);

    if (encType === Encoders.AVIF) {
      this.avif(input, output);
    }

    if (encType === Encoders.WEBP) {
      this.webp(input, output);
    }

    if (encType === Encoders.JPEG) {
      this.jpeg(input, output);
    }
  }

  /**
   * 
   * @param filePath 
   * @param outputPath 
   */
  async avif(filePath: string, outputPath: string) {
    fs.readFile(filePath, (err, inputBuffer) => {

      if (err) {
        this.error(err);
        return;
      }

      sharp(inputBuffer)
        .avif({ quality: this.quality, speed: 5 })
        .toFile(outputPath, (err, info) => {
          this.log("avif", info);
          this.fileSaved(outputPath);
        });
    });
  }

  /**
   * 
   * @param filePath 
   * @param outputPath 
   */
  async webp(filePath: string, outputPath: string) {
    fs.readFile(filePath, (err, inputBuffer) => {

      if (err) {
        this.error(err);
        return;
      }

      sharp(inputBuffer)
        .webp({ quality: this.quality })
        .toFile(outputPath, (err, info) => {
          this.log("webp", info);
          this.fileSaved(outputPath);
        });
    });
  }

  /**
   * 
   * @param filePath 
   * @param outputPath 
   */
  async jpeg(filePath: string, outputPath: string) {
    fs.readFile(filePath, (err, inputBuffer) => {

      if (err) {
        this.error(err);
        return;
      }

      sharp(inputBuffer)
        .jpeg({ quality: this.quality, progressive: true })
        .toFile(outputPath, (err, info) => {
          this.log("jpeg", info);
          this.fileSaved(outputPath);
        });
    });
  }

  protected fileSaved(path: string) {
    this.log(`File successfully saved at "${path}"`);
  }
}

export = Sharpie
