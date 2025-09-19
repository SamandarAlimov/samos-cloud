import React from 'react';
import { 
  Search, 
  Upload, 
  FolderPlus, 
  Grid3X3, 
  List, 
  Filter,
  SortAsc,
  MoreHorizontal,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
// import { useTheme } from 'next-themes';

interface CloudHeaderProps {
  currentPath: string;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CloudHeader({ 
  currentPath, 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery 
}: CloudHeaderProps) {
  // const { theme, setTheme } = useTheme();
  const [theme, setTheme] = React.useState('light');

  const getPathName = (path: string) => {
    const pathMap: Record<string, string> = {
      '/': 'My Files',
      '/shared': 'Shared with me',
      '/recent': 'Recent',
      '/starred': 'Starred',
      '/trash': 'Trash',
      '/documents': 'Documents',
      '/images': 'Images',
      '/videos': 'Videos',
      '/projects': 'Projects',
    };
    return pathMap[path] || path;
  };

  return (
    <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-sidebar-accent" />
        
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            {getPathName(currentPath)}
          </h2>
          {currentPath !== '/' && (
            <Badge variant="secondary" className="text-xs">
              {Math.floor(Math.random() * 50) + 1} items
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files, folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-input focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Upload Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus className="h-4 w-4 mr-2" />
              Upload Folder
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Options */}
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('grid')}
            className={`rounded-r-none ${
              viewMode === 'grid' ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode('list')}
            className={`rounded-l-none border-l border-border ${
              viewMode === 'list' ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark mode
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}