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

import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DEMOS = path.resolve(__dirname, '../../../demos/typescript');

async function startServer(config) {
  const server = await createServer(config);
  await server.listen();
  return server;
}


async function main() {
  try {
    const dappConfig = {
      root: BASE_DEMOS,
      server: {
        port: 8080,
        host: 'localhost',
      },
      define: {
        'process.env.dappUrl': JSON.stringify('http://localhost:8080/dapp/index.html'),
      },
    };

    const walletConfig = {
      root: BASE_DEMOS,
      server: {
        port: 8081,
        host: 'localhost',
      },
      define: {
        'process.env.walletUrl': JSON.stringify('http://localhost:8081/wallet/index.html'),
      },
    };

    console.log('Starting dev servers...');
    const [dappServer, walletServer] = await Promise.all([
      startServer(dappConfig),
      startServer(walletConfig),
    ]);

    console.log(
      `DApp server running at http://${dappServer.config.server.host}:${dappServer.config.server.port}/dapp/index.html`
    );
    console.log(
      `Wallet server running at http://${walletServer.config.server.host}:${walletServer.config.server.port}/wallet/index.html`
    );
  } catch (error) {
    console.error('Dev server failed to start:', error);
    process.exit(1);
  }
}

main();
