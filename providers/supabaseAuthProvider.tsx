//This provider is litle bit complex because here we manage all logic for the authentication system.
//we have signout in context here so we do not have to create the same in every component. we can use this single signout, signin functions.
//also no need to fetch user data in every comoonent, we can simply use the user from here and same goes for loading state.
//In SupabaseAuthProvider we are passing the server session from root layout component (and in alyout we get this serverSession from createClient which we get from supabaseServer as layout is a server component).
//Since we wrap this provider inside the SupabaseProvider in layout.tsx, we can access the context of SupabaseProvider and hence useSupabase here.
//useSWR is a react hook for data fetching developed by NextJS => npm add swr then import useSWR from 'swr'. If there is no serverSession, we do not want to run this hook. but if there is serverSession, we want to fetch data from out users table in supabase.
//inside useEffect => here we create a subscription for our auth state changes because when the auth state changes we need to aync server and cleint session. To make this happen we simply useonAuthStateChange function from supabase and with this function we subscribe to the auth changes. If there is a change but the session token is not equal to serverSession token , we need to refresh the router so that the supabase auto detect the session and sync for us and we need to unsubscribe from this subscrition when the component is unmounted.
//finally we'll pass the values in proider and create the custom hook called useHook to reach the contextI values in our components.

//In client components, we need to have createClient from the supabaseBrowser.ts and in server components, we need to have createClient from supabaseServer.ts

//we need to have this package => "npm install server-only"
//server-only is a marker package to indicate that a module can only be used in Server Components.
//and when we have import "server only", the NextJS makes sure that that component can only be imported in server builds. Hence, we have "import "server-only";" in supabaseServer.ts
"use client";

import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSwr from "swr";
import { useSupabase } from "./supabaseProvider";
import type { Database } from "@/types/supabase";

interface ContextI {
  user: Database["public"]["Tables"]["profiles"]["Row"] | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
}

const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithGithub: async () => {},
  signInWithEmail: async (email: string, password: string) => null,
});

export const useAuth = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  //Get User
  const getUser = (async() = {});
}
