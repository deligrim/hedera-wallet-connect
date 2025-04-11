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
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DEMOS = path.resolve(__dirname, '../../../demos/react-dapp');

async function main() {
  try {
    const config = {
      root: BASE_DEMOS,
      plugins: [react()],
      server: {
        port: 3000,
        host: 'localhost',
      },
    };

    const server = await createServer(config);
    await server.listen();

    console.log(
      `Dev server running at http://${server.config.server.host}:${server.config.server.port}`
    );
  } catch (error) {
    console.error('Dev server failed to start:', error);
    process.exit(1);
  }
}

main();
