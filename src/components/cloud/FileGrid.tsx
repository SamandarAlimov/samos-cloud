import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  File,
  FolderOpen,
  MoreVertical,
  Download,
  Share2,
  Star,
  Copy,
  Trash2,
  Eye
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface FileGridProps {
  currentPath: string;
  viewMode: 'grid' | 'list';
  searchQuery: string;
}

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: string;
  size?: string;
  modified: string;
  isStarred?: boolean;
  isShared?: boolean;
  owner?: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: 'Project Documents', type: 'folder', modified: '2 days ago' },
  { id: '2', name: 'Marketing Assets', type: 'folder', modified: '1 week ago', isShared: true },
  { id: '3', name: 'Annual Report 2024.pdf', type: 'file', fileType: 'pdf', size: '2.4 MB', modified: '3 hours ago', isStarred: true },
  { id: '4', name: 'Team Photo.jpg', type: 'file', fileType: 'image', size: '1.8 MB', modified: '1 day ago' },
  { id: '5', name: 'Presentation.pptx', type: 'file', fileType: 'presentation', size: '5.2 MB', modified: '2 days ago', isShared: true },
  { id: '6', name: 'Demo Video.mp4', type: 'file', fileType: 'video', size: '24.1 MB', modified: '1 week ago' },
  { id: '7', name: 'Spreadsheet.xlsx', type: 'file', fileType: 'spreadsheet', size: '892 KB', modified: '3 days ago' },
  { id: '8', name: 'Archive.zip', type: 'file', fileType: 'archive', size: '12.5 MB', modified: '1 week ago' },
];

const getFileIcon = (type: string, fileType?: string) => {
  if (type === 'folder') return FolderOpen;
  
  switch (fileType) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return FileText;
    case 'image':
    case 'jpg':
    case 'png':
    case 'gif':
      return Image;
    case 'video':
    case 'mp4':
    case 'avi':
      return Video;
    case 'audio':
    case 'mp3':
    case 'wav':
      return Music;
    case 'archive':
    case 'zip':
    case 'rar':
      return Archive;
    default:
      return File;
  }
};

const getFileColor = (type: string, fileType?: string) => {
  if (type === 'folder') return 'text-samos-blue';
  
  switch (fileType) {
    case 'pdf':
      return 'text-red-500';
    case 'image':
      return 'text-green-500';
    case 'video':
      return 'text-purple-500';
    case 'audio':
      return 'text-orange-500';
    case 'archive':
      return 'text-yellow-500';
    default:
      return 'text-muted-foreground';
  }
};

export function FileGrid({ currentPath, viewMode, searchQuery }: FileGridProps) {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileAction = (action: string, fileName: string) => {
    toast({
      title: `${action} action`,
      description: `${action} performed on "${fileName}"`,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) uploaded successfully`,
    });
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`space-y-2 ${dragOver ? 'file-drag-over' : ''} rounded-lg p-4`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dragOver && (
          <div className="text-center text-primary font-medium mb-4">
            Drop files here to upload
          </div>
        )}
        
        {filteredFiles.map((file) => {
          const IconComponent = getFileIcon(file.type, file.fileType);
          const iconColor = getFileColor(file.type, file.fileType);
          
          return (
            <Card key={file.id} className="p-4 hover-lift cursor-pointer">
              <div className="flex items-center gap-4">
                <IconComponent className={`h-8 w-8 ${iconColor}`} />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{file.name}</h3>
                    {file.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    {file.isShared && <Badge variant="outline" className="text-xs">Shared</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    {file.size && <span>{file.size}</span>}
                    <span>Modified {file.modified}</span>
                    {file.owner && <span>By {file.owner}</span>}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleFileAction('Preview', file.name)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('Download', file.name)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('Share', file.name)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileAction('Copy', file.name)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Make a copy
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFileAction('Star', file.name)}>
                      <Star className="h-4 w-4 mr-2" />
                      {file.isStarred ? 'Remove star' : 'Add star'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleFileAction('Delete', file.name)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Move to trash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div 
      className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 ${
        dragOver ? 'file-drag-over' : ''
      } rounded-lg p-4`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragOver && (
        <div className="col-span-full text-center text-primary font-medium mb-4">
          Drop files here to upload
        </div>
      )}
      
      {filteredFiles.map((file) => {
        const IconComponent = getFileIcon(file.type, file.fileType);
        const iconColor = getFileColor(file.type, file.fileType);
        
        return (
          <Card key={file.id} className="p-4 hover-lift cursor-pointer group relative">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFileAction('Preview', file.name)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFileAction('Download', file.name)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFileAction('Share', file.name)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleFileAction('Delete', file.name)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative">
                <IconComponent className={`h-12 w-12 ${iconColor}`} />
                {file.isStarred && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current absolute -top-1 -right-1" />
                )}
              </div>
              
              <div className="w-full">
                <h3 className="font-medium text-sm text-foreground truncate" title={file.name}>
                  {file.name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {file.size && (
                    <span className="text-xs text-muted-foreground">{file.size}</span>
                  )}
                  {file.isShared && (
                    <Badge variant="outline" className="text-xs px-1 py-0">Shared</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{file.modified}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}