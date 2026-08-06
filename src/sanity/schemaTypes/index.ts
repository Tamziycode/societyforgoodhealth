import { type SchemaTypeDefinition } from "sanity";

import { category } from "./category";
import { post } from "./post";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, post, project, siteSettings],
};
