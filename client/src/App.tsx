import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import ListingDetail from "@/pages/ListingDetail";
import CreateListing from "@/pages/CreateListing";
import ListingPreview from "@/pages/ListingPreview";
import AdminDashboard from "@/pages/AdminDashboard";
import WatchList from "@/pages/WatchList";
import LoginPrompt from "@/components/LoginPrompt";


function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("Router state:", { isAuthenticated, isLoading });
  console.log("Current path:", window.location.pathname);



  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/create" component={() => <LoginPrompt message="出品を作成するにはログインが必要です" />} />
          <Route component={Landing} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/landing" component={Landing} />
          <Route path="/listing/:slug" component={ListingDetail} />
          <Route path="/listing/new" component={CreateListing} />
          <Route path="/create" component={CreateListing} />
          <Route path="/preview/:id" component={ListingPreview} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/watch" component={WatchList} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
