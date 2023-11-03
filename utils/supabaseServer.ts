import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import "server-only";

import type { Database } from "@/types/supabase";

export const createClient = () => {
  createServerComponentClient<Database>({ cookies });
};

//client will use these cookies to recognize the user who is making the request and if user is authnticated, the access token will be provided with the request. so that if the data is protected by the row level security user can access that data with the access token.

//Remember that we can only use this client in server components because cookies and headers will only be present in server components.
