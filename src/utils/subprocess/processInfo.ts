import os from 'os';

export const getProcessInfo = () => {
  const argvs = process.argv.slice(2);
  const platform = os.platform();
  const nodeVer = process.versions.node;
  const projectFolder = process.cwd();
  const execPath = process.argv[1];
  // (resident set size) memory occupied in RAM by the process
  const rss = `${process.memoryUsage().rss / 1024 ** 2} MB`;
  const pid = process.pid;

  return {
    argvs,
    osPlatform: platform,
    nodeVer,
    projectFolder,
    execPath,
    rss,
    pid,
  };
};

process.on('message', () => {
  const info = getProcessInfo();
  process.send && process.send(info);
});
