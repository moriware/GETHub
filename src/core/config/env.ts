import { buildAppEnv, resolveExpoExtraConfig } from '@/core/config/env.functions';

export const env = buildAppEnv(resolveExpoExtraConfig());
