"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserContext";

function Providers({ children }) {
  const [client] = React.useState(new QueryClient());

  return (
    <UserProvider>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </UserProvider>
  );
}

export default Providers;
