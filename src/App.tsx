import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AppLayout } from "./ui/AppLayout";
import { Spinner } from "./ui/Spinner";
import { ProtectedRoute } from "./ui/ProtectedRoute";

// Lazy loaded pages
const Home = lazy(() => import("./pages/clientSide/Home"));
const Sessions = lazy(() => import("./pages/clientSide/Sessions"));
const Tasks = lazy(() => import("./pages/clientSide/Tasks"));
const Portfolio = lazy(() => import("./pages/clientSide/Portfolio"));
const Feedbacks = lazy(() => import("./pages/clientSide/Feedbacks"));

const Login = lazy(() => import("./pages/auth/Login"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageCategories = lazy(() => import("./pages/admin/ManageCategories"));
const ManageSessions = lazy(() => import("./pages/admin/ManageSessions"));
const SessionDetails = lazy(() => import("./pages/admin/SessionDetails"));
const ManageTasks = lazy(() => import("./pages/admin/ManageTasks"));
const TaskDetails = lazy(() => import("./pages/admin/TaskDetails"));
const ManagePortfolio = lazy(() => import("./pages/admin/ManagePortfolio"));
const ManageFeedbacks = lazy(() => import("./pages/admin/ManageFeedbacks"));
const WebsiteSettings = lazy(() => import("./pages/admin/WebsiteSettings"));
const Account = lazy(() => import("./pages/admin/Account"));

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/feedbacks" element={<Feedbacks />} />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="sessions" element={<ManageSessions />} />
              <Route path="sessions/:sessionId" element={<SessionDetails />} />
              <Route path="tasks" element={<ManageTasks />} />
              <Route path="tasks/:taskId" element={<TaskDetails />} />
              <Route path="portfolio" element={<ManagePortfolio />} />
              <Route path="feedbacks" element={<ManageFeedbacks />} />
              <Route path="settings" element={<WebsiteSettings />} />
              <Route path="account" element={<Account />} />
            </Route>

            {/* Catch All */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "14px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #334155",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
