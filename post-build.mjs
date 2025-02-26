import { execSync } from 'child_process';

function run(cmd) {
    console.log(`run: ${cmd}`);
    execSync(cmd);
}

export default async function (config, output) {
    console.log(`post-build: cwd = ${process.cwd()}, output = ${output}`);
    run(`cp -r static ${output}/`);
    run(`npm install -D tailwindcss@3`);
    run(`npx tailwindcss -c tailwind.config.js -i default-tailwind.tcss -o ${output}/static/default-tailwind.css`);
};
