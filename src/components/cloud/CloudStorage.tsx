import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { CloudSidebar } from './CloudSidebar';
import { CloudHeader } from './CloudHeader';
import { FileGrid } from './FileGrid';
import { Toaster } from '@/components/ui/toaster';

const CloudStorage = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CloudSidebar currentPath={currentPath} setCurrentPath={setCurrentPath} />
        
        <div className="flex-1 flex flex-col">
          <CloudHeader 
            currentPath={currentPath}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <main className="flex-1 p-6">
            <FileGrid 
              currentPath={currentPath}
              viewMode={viewMode}
              searchQuery={searchQuery}
            />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default CloudStorage;