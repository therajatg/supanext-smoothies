import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export const createClient = () => createClientComponentClient<Database>();

//This we'll use this only in client components as it does not know whether user is authenticated or not. for example in our login page we'll use this client and after we have logged in user we'll use the server clients with cookies that we passed.
