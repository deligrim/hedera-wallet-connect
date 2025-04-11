#!/usr/bin/env node
/*
 *
 * Hedera Wallet Connect
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DEMOS = path.resolve(__dirname, '../../../demos/typescript');
const DIST = path.resolve(__dirname, '../../../dist/demos/typescript');
const DOCUSAURUS_STATIC = path.resolve(__dirname, '../../../docs/static/demos/typescript');

// Base configuration applied to both builds.
const baseConfig = {
  root: BASE_DEMOS,
  build: {
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(BASE_DEMOS, 'index.html'),
        dapp: path.resolve(BASE_DEMOS, 'dapp/index.html'),
        wallet: path.resolve(BASE_DEMOS, 'wallet/index.html'),
      },
    },
  },
};

async function buildDist() {
  console.log('Starting distribution build...');
  const config = {
    ...baseConfig,
    define: {
      'process.env.dappUrl': JSON.stringify('https://wc.hgraph.app/dapp/index.html'),
      'process.env.walletUrl': JSON.stringify('https://wallet.wc.hgraph.app/wallet/index.html'),
    },
    build: {
      ...baseConfig.build,
      outDir: DIST,
    },
  };
  await build(config);
  console.log('Distribution build completed.');
}

async function buildDocusaurus() {
  console.log('Starting Docusaurus build...');
  const config = {
    ...baseConfig,
    define: {
      'process.env.dappUrl': JSON.stringify('/demos/typescript/dapp/index.html'),
      'process.env.walletUrl': JSON.stringify('/demos/typescript/wallet/index.html'),
    },
    build: {
      ...baseConfig.build,
      outDir: DOCUSAURUS_STATIC,
    },
  };
  await build(config);
  console.log('Docusaurus build completed.');
}

async function main() {
  try {
    await buildDist();
    await buildDocusaurus();
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

main();
