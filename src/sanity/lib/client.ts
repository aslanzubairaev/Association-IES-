import { createClient, type QueryParams } from "next-sanity";
import { sanityApiVersion, sanityDataset, sanityProjectId, isSanityConfigured } from "@/sanity/env";

const client = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>(query: string, params: QueryParams = {}) {
  if (!client) {
    return null;
  }

  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ["sanity", "activities"] },
  });
}

