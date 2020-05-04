import packageJson from '@/../package.json';
import { pick } from '@/library/ramda';

type Dependency = {
  name: string;
  version: string;
  url: string;
};

export const DEPENDENCIES: Dependency[] = Object.entries(pick(['dependencies', 'devDependencies'], packageJson))
  .reduce((acc, [_, value]) => [...acc, ...Object.entries(value)], [] as string[][])
  .map(([name, version]) => ({ name, version, url: `https://www.npmjs.com/package/${name}` }))
  .filter(({ name }) => !/^@types\//.test(name))
  .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
