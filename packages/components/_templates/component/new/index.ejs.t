---
to: src/<%= name %>/index.ts
---
import <%= name %> from "./<%= name %>.vue";
import type { App, Plugin } from "vue";

type SFCWithInstall<T> = T & Plugin;

const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component((comp as any).name, comp as any);
  };
  return comp as SFCWithInstall<T>;
};
const <%= h.capitalize(name) %> = withInstall(<%= name %>);
export default <%= h.capitalize(name) %>;



