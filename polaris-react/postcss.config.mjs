import postcssPlugins from './config/postcss-plugins.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const config = {
  plugins: postcssPlugins,
};

// eslint-disable-next-line import/no-default-export
export default config;
