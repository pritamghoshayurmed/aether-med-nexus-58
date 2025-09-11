import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  Users, 
  Activity, 
  Settings,
  Stethoscope,
  Building2,
  Shield,
  MessageSquare,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  userRole: "patient" | "doctor" | "hospital" | "admin";
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
          { icon: Activity, label: "Vitals", path: "/dashboard/patient/vitals", key: "vitals" },
          { icon: MessageSquare, label: "AI Chat", path: "/dashboard/patient/ai-chat", key: "ai-chat" },
          { icon: Settings, label: "Settings", path: "/dashboard/patient/settings", key: "settings" },
        ];
      case "doctor":
        return [
          { icon: Home, label: "Home", path: "/dashboard/doctor", key: "home" },
          { icon: Users, label: "Patients", path: "/dashboard/doctor/patients", key: "patients" },
          { icon: Calendar, label: "Schedule", path: "/dashboard/doctor/schedule", key: "schedule" },
          { icon: MessageSquare, label: "Chat", path: "/dashboard/doctor/chat", key: "chat" },
          { icon: Activity, label: "AI Tools", path: "/dashboard/doctor/analytics", key: "analytics" },
        ];
      case "hospital":
        return [
          { icon: Home, label: "Dashboard", path: "/dashboard/hospital", key: "home" },
          { icon: Building2, label: "Resources", path: "/dashboard/hospital/resources", key: "resources" },
          { icon: Package, label: "Supply", path: "/dashboard/hospital/supply-chain", key: "supply" },
          { icon: Users, label: "Staff", path: "/dashboard/hospital/staff", key: "staff" },
          { icon: Activity, label: "Reports", path: "/dashboard/hospital/reports", key: "reports" },
        ];
      case "admin":
        return [
          { icon: Home, label: "Overview", path: "/dashboard/admin", key: "home" },
          { icon: Activity, label: "Analytics", path: "/dashboard/admin/analytics", key: "analytics" },
          { icon: Shield, label: "Compliance", path: "/dashboard/admin/compliance", key: "compliance" },
          { icon: Users, label: "Users", path: "/dashboard/admin/users", key: "users" },
          { icon: Settings, label: "Settings", path: "/dashboard/admin/settings", key: "settings" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-t border-border/50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.path || currentPath.startsWith(item.path + "/");
          const isCenterItem = index === 2; // Middle item gets special treatment
          
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300",
                "hover:scale-110 active:scale-95",
                isCenterItem && "relative -top-4 p-3 bg-gradient-primary shadow-lg shadow-primary/30",
                isActive && !isCenterItem && "text-primary bg-primary/10",
                !isActive && !isCenterItem && "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                isCenterItem && "bg-white/10 backdrop-blur-sm",
                isCenterItem && isActive && "bg-white/20",
                !isCenterItem && isActive && "bg-primary/20"
              )}>
                <item.icon className={cn(
                  "transition-all duration-300",
                  isCenterItem ? "h-6 w-6 text-white" : "h-5 w-5"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium mt-1 transition-all duration-300",
                isCenterItem ? "text-white text-[10px]" : "text-[10px]"
              )}>
                {item.label}
              </span>
              {isActive && !isCenterItem && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;