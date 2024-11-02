const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function syncRepos(directory, branch, ignoreError) {
    if (isGitRepo(directory)) {
        checkRemoteAndPull(directory, branch, ignoreError);
        return;
    }

    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}:`, err);
            return;
        }

        files.forEach((file) => {
            const fullPath = path.join(directory, file.name);
            if (file.isDirectory()) {
                if (isGitRepo(fullPath)) {
                    checkRemoteAndPull(fullPath, branch, ignoreError);
                } else {
                    syncRepos(fullPath, branch);
                }
            }
        });
    });
}

function isGitRepo(directory) {
    try {
        fs.statSync(path.join(directory, '.git'));
        return true;
    } catch (err) {
        return false;
    }
}

function checkRemoteAndPull(directory, branch, ignoreError) {
    exec('git remote -v', { cwd: directory }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Failed to check remote for repository ${directory}:`, err);
            console.error(stderr);
            return;
        }

        if (stdout.trim() === '') {
            console.warn(`Repository ${directory} has no remote configured.`);
            return;
        }

        console.log(`Syncing repository: ${directory}`);
        pullRepo(directory, branch);
    });
}

function pullRepo(directory, branch) {
    const command = branch ? `git pull origin ${branch}` : `git pull --all`;
    exec(command, { cwd: directory }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Failed to sync repository ${directory}:`, err);
            console.error(stderr);
            return;
        }
        console.log(stdout);
    });
}

function main() {
    const args = minimist(process.argv.slice(2));

    const directory = args._[0] || '.';
    const branch = args['branch'];
    const ignoreError = args['ignore-error'];

    // if (args.length < 1 || args.length > 2) {
    //     console.error('Usage: sync-repos <directory> [branch]');
    //     return;
    // }

    if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
        console.error(`Directory ${directory} does not exist.`);
        return;
    }

    syncRepos(directory, branch, ignoreError);
}

main();
