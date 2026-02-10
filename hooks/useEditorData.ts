import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEditorStore } from '../store/editorStore';

// Types for API responses
export interface SlideTemplate {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  elements: any[];
}

export interface PresentationData {
  id: string;
  title: string;
  slides: any[];
  createdAt: string;
  updatedAt: string;
}

// Custom hook for fetching slide templates
export const useSlideTemplates = () => {
  return useQuery({
    queryKey: ['slide-templates'],
    queryFn: async (): Promise<SlideTemplate[]> => {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return [
        {
          id: '1',
          name: 'Business Presentation',
          thumbnail: '/templates/business.jpg',
          category: 'business',
          elements: []
        },
        {
          id: '2', 
          name: 'Education Template',
          thumbnail: '/templates/education.jpg',
          category: 'education',
          elements: []
        },
        {
          id: '3',
          name: 'Marketing Slide',
          thumbnail: '/templates/marketing.jpg', 
          category: 'marketing',
          elements: []
        }
      ];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Custom hook for fetching presentations
export const usePresentations = () => {
  return useQuery({
    queryKey: ['presentations'],
    queryFn: async (): Promise<PresentationData[]> => {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const savedPresentations = localStorage.getItem('presentations');
      return savedPresentations ? JSON.parse(savedPresentations) : [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Custom hook for saving presentations
export const useSavePresentation = () => {
  const queryClient = useQueryClient();
  const { elements, canvas } = useEditorStore();
  
  return useMutation({
    mutationFn: async (presentationData: Omit<PresentationData, 'id'>) => {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPresentation: PresentationData = {
        ...presentationData,
        id: `presentation_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Save to localStorage for demo
      const existingPresentations = localStorage.getItem('presentations');
      const presentations = existingPresentations ? JSON.parse(existingPresentations) : [];
      presentations.push(newPresentation);
      localStorage.setItem('presentations', JSON.stringify(presentations));
      
      return newPresentation;
    },
    onSuccess: (data) => {
      // Invalidate presentations query to refetch
      queryClient.invalidateQueries({ queryKey: ['presentations'] });
      
      // Clear editor state
      // useEditorStore.getState().clearSelection();
      
      console.log('Presentation saved successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to save presentation:', error);
    }
  });
};

// Custom hook for auto-saving
export const useAutoSave = () => {
  const { elements, canvas } = useEditorStore();
  
  return useMutation({
    mutationFn: async () => {
      // Simulate auto-save API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const autoSaveData = {
        elements,
        canvas,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('autosave', JSON.stringify(autoSaveData));
      return autoSaveData;
    },
    onSuccess: () => {
      console.log('Auto-saved successfully');
    }
  });
};

// Custom hook for exporting presentations
export const useExportPresentation = () => {
  return useMutation({
    mutationFn: async ({ format, data }: { format: 'pptx' | 'pdf' | 'html'; data: any }) => {
      // Simulate export API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (format) {
        case 'pptx':
          // Would integrate with pptxgenjs or similar
          console.log('Exporting as PowerPoint...');
          break;
        case 'pdf':
          // Would integrate with jsPDF or similar
          console.log('Exporting as PDF...');
          break;
        case 'html':
          // Would generate HTML presentation
          console.log('Exporting as HTML...');
          break;
      }
      
      return { success: true, format };
    },
    onSuccess: ({ format }) => {
      console.log(`Successfully exported as ${format.toUpperCase()}`);
    },
    onError: (error) => {
      console.error('Export failed:', error);
    }
  });
};

// Custom hook for real-time collaboration
export const useCollaboration = (presentationId: string) => {
  return useQuery({
    queryKey: ['collaboration', presentationId],
    queryFn: async (): Promise<any> => {
      // Simulate WebSocket connection - replace with actual Liveblocks/Socket.io
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        isConnected: true,
        users: [
          {
            id: 'user1',
            name: 'John Doe',
            color: '#3B82F6',
            cursor: { x: 100, y: 200 },
            isActive: true
          },
          {
            id: 'user2', 
            name: 'Jane Smith',
            color: '#EF4444',
            cursor: { x: 300, y: 400 },
            isActive: false
          }
        ]
      };
    },
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 1000, // 1 second
    gcTime: 0 // No caching for real-time data
  });
};
