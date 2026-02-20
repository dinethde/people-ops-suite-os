// Copyright (c) 2025 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { StyledEngineProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";

import App from "./App";

// Start MSW worker in development
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start({
      // Ignore requests for static assets and source files
      onUnhandledRequest(request, print) {
        // Don't warn about requests for static assets, source files, or HMR
        if (
          request.url.includes("/@") || // Vite internals
          request.url.includes("/src/") || // Source files
          request.url.includes("/node_modules/") || // Dependencies
          request.url.includes("?t=") || // HMR timestamps
          /\.(tsx?|jsx?|css|json|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)(\?|$)/.test(
            request.url,
          ) // File extensions
        ) {
          return;
        }
        print.warning();
      },
    });
  }
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>,
  );
});
