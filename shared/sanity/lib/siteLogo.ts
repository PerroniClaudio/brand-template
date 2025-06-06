import { client } from "../lib/client";
import { siteLogoQuery } from "../queries/siteLogo";

export async function fetchSiteLogo() {
  return await client.fetch(siteLogoQuery);
}
