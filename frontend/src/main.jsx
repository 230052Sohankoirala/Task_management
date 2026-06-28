import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import { TaskProvider } from "./contexts/TaskContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { TeamProvider } from "./contexts/TeamContext.jsx";
import { ActivityProvider } from "./contexts/ActivityContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <UserProvider>
              <TeamProvider>
                <ProjectProvider>
                  <TaskProvider>
                    <ActivityProvider>
                      <NotificationProvider>
                        <App />
                        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
                      </NotificationProvider>
                    </ActivityProvider>
                  </TaskProvider>
                </ProjectProvider>
              </TeamProvider>
            </UserProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
