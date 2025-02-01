import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SCHEMA_PATH,
  documents: ['src/{!(lib),}/**/*.tsx'],
  generates: {
    './src/lib/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  ignoreNoDocuments: true,
  config: {
    withHooks: true,
  },
};

export default config;
