import * as tar from "tar";
import { mkdir, rm } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { arch, type } from "node:os";

try {
  const writeStdout = (text) => process.stdout.write(`\r${text}`);
  const platform = type().toLowerCase();
  let architecture = arch();
  if (architecture === "x64") {
    architecture = "x86_64";
  }
  const library_machine_type = `perry-${platform}-${architecture}`;
  async function extractArchive(file, cwd) {
    try {
      await tar.x({
        file,
        cwd,
      });
      writeStdout("\rExtraction complete!\n");
    } catch (err) {
      throw err;
    }
  }
  const asset_url = (await (await fetch(
    "https://api.github.com/repos/PerryTs/perry/releases/latest",
  )).json()).assets.find(({ name }) =>
    name === `${library_machine_type}.tar.gz`
  )
    .browser_download_url;
  writeStdout(`Asset URL to fetch: ${asset_url}\n`);
  const response = await fetch(asset_url);
  const content_length = response.headers.get("content-length");
  writeStdout(
    `Asset ${library_machine_type}.tar.gz content-length: ${content_length}\n`,
  );
  const file_stream = createWriteStream(`${library_machine_type}.tar.gz`, {
    flags: "a",
  });
  let bytes_read = 0;
  for await (const value of response.body) {
    file_stream.write(value);
    writeStdout(`${bytes_read += value.length} of ${content_length} read.`);
  }
  await mkdir(library_machine_type, { recursive: true });
  await extractArchive(
    `${library_machine_type}.tar.gz`,
    `${library_machine_type}`,
  );
  await rm(`${library_machine_type}.tar.gz`, {
    force: true,
    recursive: true,
  });
} catch (e) {
  process.stderr.write(e.message);
}
