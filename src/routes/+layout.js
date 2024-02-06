// src/routes/+layout.js
import { appwrite } from "$lib/appwrite";

// Turn off SSR globally, turning the project into a static site
export const ssr = false;
export const load = async () => {
  try {
    return {
      account: await appwrite.account.get(),
    };
  } catch {
    return {
      account: null,
    };
  }
};
