import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  Activity,
  Settings,
  Stethoscope,
  MessageSquare,
  FileText,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  userRole: "patient" | "doctor";
}

const BottomNavigation = ({ userRole }: BottomNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = () => {
    switch (userRole) {
      case "patient":
        return [
          { icon: Home, label: "Home", path: "/dashboard/patient", key: "home" },
          { icon: Calendar, label: "Appointments", path: "/dashboard/patient/appointments", key: "appointments" },
          { icon: Stethoscope, label: "Find Doctor", path: "/dashboard/patient/find-doctors", key: "find-doctors" },
          { icon: MessageSquare, label: "AI Chat", path: "/dashboard/patient/ai-chat", key: "ai-chat" },
          { icon: Settings, label: "Settings", path: "/dashboard/patient/settings", key: "settings" },
        ];
      case "doctor":
        return [
          { icon: Home, label: "Home", path: "/dashboard/doctor", key: "home" },
          { icon: Users, label: "Patients", path: "/dashboard/doctor/patients", key: "patients" },
          { icon: Calendar, label: "Schedule", path: "/dashboard/doctor/schedule", key: "schedule" },
          { icon: FileText, label: "Rx", path: "/dashboard/doctor/prescription", key: "prescription" },
          { icon: Activity, label: "AI Tools", path: "/dashboard/doctor/analytics", key: "analytics" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-2xl shadow-black/10">
      <div className="flex justify-around items-center py-1 px-2 max-w-md mx-auto safe-area-bottom">
        {navItems.map((item, index) => {
          // Home item (index 0) should only be active on exact path match
          // Other items can be active on exact match or sub-paths
          const isActive = index === 0
            ? currentPath === item.path
            : currentPath === item.path || currentPath.startsWith(item.path + "/");

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[44px] min-h-[60px] px-2 py-1 rounded-xl transition-all duration-300",
                "hover:scale-105 active:scale-95 touch-manipulation",
                isActive && "text-primary bg-primary/15 shadow-sm",
                !isActive && "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-all duration-300 flex items-center justify-center",
                isActive && "bg-primary/20 shadow-sm"
              )}>
                <item.icon className="h-5 w-5 transition-all duration-300" />
              </div>
              <span className="text-[10px] font-medium mt-1 leading-tight text-center max-w-[60px] truncate">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
