## PerryTS/perry Native Messaging host
> [Perry](https://github.com/PerryTS/perry)
>
> Write TypeScript. Ship native. Everywhere.
>
> Perry compiles the TypeScript you already write into real machine-code executables — for macOS, Windows, Linux, iOS, Android, watchOS, and TV. No Node.js to install. No Electron to bundle. No runtime at all. Just a binary. (The same codebase can also target the web, emitted as JavaScript or WebAssembly.)

### Install

Download from [PerryTS/perry releases](https://github.com/PerryTS/perry/releases/latest).

Alternatively, using JavaScript to fetch and extract the latest release .`tar.gz` from the GitHub repository

```shell
node fetch-perry.js
```

### Compile to native executable
```shell
perry compile --function-source=header --opt-report=text -o ./output/nm_perry ./nm_perry.ts
```

### Compile to WASM WASI P1 target
```shell
WASI_SDK_PATH=$HOME/ABSOLUTE/PATH/TO/wasi-sdk perry compile --function-source=header --opt-report=text --target wasm32-wasip1 -o ./nm_perry_wasip1.wasm nm_perry.ts
```

### Compile to WASM WASI P2 target
```shell
WASI_SDK_PATH=$HOME/ABSOLUTE/PATH/TO/wasi-sdk perry compile --function-source=header --opt-report=text --target wasm32-wasip2 -o ./nm_perry_wasip2.wasm nm_perry.ts
```

### Installation and usage on Chrome and Chromium

1. Navigate to `chrome://extensions`.
2. Toggle `Developer mode`.
3. Click `Load unpacked`.
4. Select `native-messaging-perry` folder.
5. Note the generated extension ID.
6. Open `nm_perry.json` in a text editor, set `"path"` to absolute path of `nm_perry` (native executable), or `nm_perry.sh` (shellscript to execute `nm_perry_wasip1.wasm.wasm` or `nm_perry_wasip2.wasm` with a WASM runtime) and `chrome-extension://<ID>/` using ID from 5 in `"allowed_origins"` array; and make sure `wasmtime` is in `PATH` and `nm_perry.sh` is executable (when executing WASM targets with a WASM runtime).
7. Copy the `nm_perry.json` file to Chrome or Chromium configuration folder, e.g., Chromium on Linux `~/.config/chromium/NativeMessagingHosts`; Chrome dev channel on Linux `~/.config/google-chrome-unstable/NativeMessagingHosts`.
8. To test click `service worker` link in panel of unpacked extension which is DevTools for `background.js` in MV3 `ServiceWorker`, observe echo'ed message from PerryTS/perry Native Messaging host. To disconnect run `port.disconnect()`.

The Native Messaging host echoes back the message passed. 

For differences between OS and browser implementations see [Chrome incompatibilities](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities#native_messaging).

## License
Do What the Fuck You Want to Public License [WTFPLv2](http://www.wtfpl.net/about/)
