import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Cloud,
  Home,
  FolderOpen,
  Users,
  Star,
  Clock,
  Trash2,
  Settings,
  HelpCircle,
  User,
  Plus,
  HardDrive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CloudSidebarProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const mainItems = [
  { title: "My Files", url: "/", icon: Home },
  { title: "Shared with me", url: "/shared", icon: Users },
  { title: "Recent", url: "/recent", icon: Clock },
  { title: "Starred", url: "/starred", icon: Star },
  { title: "Trash", url: "/trash", icon: Trash2 },
];

const folders = [
  { name: "Documents", path: "/documents", files: 24 },
  { name: "Images", path: "/images", files: 156 },
  { name: "Videos", path: "/videos", files: 8 },
  { name: "Projects", path: "/projects", files: 12 },
];

export function CloudSidebar({ currentPath, setCurrentPath }: CloudSidebarProps) {
  const { open } = useSidebar();
  const collapsed = !open;
  
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-foreground">Samos Cloud</h1>
              <p className="text-xs text-muted-foreground">Storage & Collaboration</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Quick Actions */}
        <div className="p-2 pt-4">
          <Button className="w-full justify-start gap-2 bg-gradient-primary hover:opacity-90" size="sm">
            <Plus className="h-4 w-4" />
            {!collapsed && "New"}
          </Button>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setCurrentPath(item.url)}
                    className={`${
                      isActive(item.url)
                        ? "bg-accent text-accent-foreground border-l-2 border-l-primary"
                        : "hover:bg-sidebar-accent"
                    } transition-smooth`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Folders */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
              Folders
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {folders.map((folder) => (
                  <SidebarMenuItem key={folder.name}>
                    <SidebarMenuButton
                      onClick={() => setCurrentPath(folder.path)}
                      className={`${
                        isActive(folder.path)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-sidebar-accent"
                      } transition-smooth`}
                    >
                      <FolderOpen className="h-4 w-4 text-samos-blue" />
                      <span className="flex-1">{folder.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {folder.files}
                      </Badge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <>
            {/* Storage Usage */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Storage</span>
                </div>
                <span className="text-xs text-muted-foreground">68%</span>
              </div>
              <Progress value={68} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">6.8 GB of 10 GB used</p>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-smooth cursor-pointer">
              <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Demo User</p>
                <p className="text-xs text-muted-foreground">user@samos.uz</p>
              </div>
            </div>
          </>
        )}

        {/* Quick Settings */}
        <div className="flex gap-1 pt-2">
          <Button variant="ghost" size="sm" className="flex-1">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}