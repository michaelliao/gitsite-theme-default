import os from 'node:os';
import { execSync } from 'child_process';

function run(cmd) {
    console.log(`run: ${cmd}`);
    execSync(cmd);
}

export default async function (config, output) {
    console.log(`post-build: cwd = ${process.cwd()}, output = ${output}`);
    let cp = `cp -r static ${output}/`;
    if (os.platform() === 'win32') {
        cp = `xcopy "static" "${output}\\static" /E /I /Y`;
    }
    run(cp);
    run(`npm install -D tailwindcss@3`);
    run(`npx tailwindcss@3 -c tailwind.config.js -i default-tailwind.tcss -o ${output}/static/default-tailwind.css`);
};
