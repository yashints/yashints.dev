#!/usr/bin/env node

/* eslint-disable no-console */
const { readFile, existsSync } = require('fs');
const { join, dirname } = require('path');
const glob = require('glob');
const YAML = require('yaml');
const puppeteer = require('puppeteer');
const Util = require('../src/util');

const baseUrl = process.argv[2] || 'http://localhost:8000';

const takeScreenshot = async (url, width, height, destination) => {
  const withMargin = width;
  const heightWithMargin = height;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: withMargin,
      height: heightWithMargin,
      deviceScaleFactor: 2,
    },
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  await page.screenshot({
    path: destination,
    clip: {
      x: 0,
      y: 0,
      width: withMargin,
      height: heightWithMargin,
    },
  });

  await browser.close();
};

const getArticleFiles = () => {
  return glob.sync(join(process.cwd(), 'content', 'posts', '**', '*.md'));
};

const parseFile = async (file) => {
  return new Promise((resolve, reject) => {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return reject(err);
      }

      const frontmatter = content.split('---')[1];
      const data = YAML.parse(frontmatter);

      return resolve({
        ...data,
        file,
        directory: dirname(file),
      });
    });
  });
};

const main = async () => {
  const files = await Promise.all(getArticleFiles().map(parseFile));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const destinationFile = join(file.directory, `socialpreview.png`);

    const { title, path, date } = file;
    const postPath = Util.getPostPath(!path ? title : path, date);

    if (file['generate-card'] !== false && !existsSync(destinationFile)) {
      await takeScreenshot(
        `${baseUrl}${postPath}/image_share`,
        400,
        200,
        destinationFile
      );
      console.log(`Created ${destinationFile}`);
    }
  }
};

main();
