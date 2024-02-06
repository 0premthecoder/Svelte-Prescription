// @ts-nocheck
// src/routes/login/+page.js
import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
  // Gets the data returned from the root layout
  const { account } = await parent();
  if (account) {
    throw redirect(303, "/");
  }
};
