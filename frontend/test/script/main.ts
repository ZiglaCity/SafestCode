import { runTest } from './runTest';

(async () => {
  await runTest('typescript');
  await runTest('javascript');
  await runTest('python');
})();
