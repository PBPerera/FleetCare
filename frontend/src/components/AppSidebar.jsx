import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Car,
  UserCircle,
  CalendarClock,
  MapPin,
  Wrench,
  BarChart3,
  Bell,
  FileText,
  LogOut,
  Truck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "User Management", url: "/user-management", icon: Users },
  { title: "Vehicle Management", url: "/vehicles", icon: Car },
  { title: "Driver Management", url: "/driver-management", icon: UserCircle },
  { title: "Trip Scheduling", url: "/trip-scheduling", icon: CalendarClock },
  { title: "Trip Allocation", url: "/trip-allocation", icon: MapPin },
  { title: "Maintenance Management", url: "/maintenance", icon: Wrench },
  { title: "Reporting & Analytics", url: "/reports", icon: BarChart3 },
  { title: "Notification Management", url: "/notifications", icon: Bell },
  { title: "Audit Log", url: "/audit-log", icon: FileText },
];

function AppSidebar() {
  return (
    <Sidebar
      className="w-64 flex-shrink-0"
      style={{
        background: `linear-gradient(to bottom, hsl(var(--sidebar-background)), hsl(var(--sidebar-accent)))`,
        borderRight: `1px solid hsl(var(--sidebar-border))`,
      }}
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Brand */}
        <div
          className="p-4 border-b"
          style={{ borderColor: `hsl(var(--sidebar-border))` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-lg bg-white/90 flex items-center justify-center shadow-sm"
              aria-hidden
            >
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: `hsl(var(--sidebar-foreground))` }}
            >
              FleetCare
            </span>
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="flex-1 py-2 overflow-auto">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 mx-2 transition-all",
                          isActive
                            ? "font-medium shadow-sm"
                            : "text-black hover:opacity-95",
                        ].join(" ")
                      }
                      style={({ isActive }) =>
                        isActive
                          ? {
                              background: `hsl(var(--sidebar-primary))`,
                              color: `hsl(var(--sidebar-primary-foreground))`,
                            }
                          : {
                              color: `hsl(var(--sidebar-foreground))`,
                            }
                      }
                    >
                      <item.icon
                        className="h-5 w-5"
                        style={{ color: `hsl(var(--sidebar-foreground))` }}
                      />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div
          className="mt-auto p-4 border-t"
          style={{ borderColor: `hsl(var(--sidebar-border))` }}
        >
          <button
            onClick={() => {
              // Replace with your real logout logic
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full rounded-lg hover:opacity-95 px-3 py-2.5"
            style={{ color: `hsl(var(--sidebar-foreground))` }}
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
            <span>Log out</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
export { AppSidebar };