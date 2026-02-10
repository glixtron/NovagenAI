import { create } from 'zustand';

// Define types for our editor state
export interface EditorElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'drawing';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: any;
  locked?: boolean;
  visible?: boolean;
}

export interface EditorState {
  elements: EditorElement[];
  selectedElementIds: string[];
  canvas: {
    width: number;
    height: number;
    zoom: number;
    backgroundColor: string;
  };
  tool: {
    active: 'select' | 'text' | 'shape' | 'image' | 'drawing';
    selectedShape?: 'rectangle' | 'circle' | 'triangle';
    color: string;
    strokeWidth: number;
    fontSize: number;
    fontFamily: string;
  };
  history: {
    past: any[];
    present: any;
    future: any[];
  };
  collaboration: {
    users: Array<{
      id: string;
      name: string;
      color: string;
      cursor?: { x: number; y: number };
      isActive: boolean;
    }>;
    isConnected: boolean;
  };
  ui: {
    showGrid: boolean;
    showRulers: boolean;
    snapToGrid: boolean;
    showProperties: boolean;
  };
}

// Create Zustand store
export const useEditorStore = create<EditorState>((set, get) => ({
  elements: [],
  selectedElementIds: [],
  canvas: {
    width: 800,
    height: 600,
    zoom: 1,
    backgroundColor: '#ffffff'
  },
  tool: {
    active: 'select',
    color: '#000000',
    strokeWidth: 2,
    fontSize: 16,
    fontFamily: 'Arial'
  },
  history: {
    past: [],
    present: {},
    future: []
  },
  collaboration: {
    users: [],
    isConnected: false
  },
  ui: {
    showGrid: false,
    showRulers: false,
    snapToGrid: false,
    showProperties: true
  },

  // Actions
  addElement: (element: Omit<EditorElement, 'id'>) => {
    const id = `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newElement = { ...element, id };
    
    set((state) => ({
      ...state,
      elements: [...state.elements, newElement],
      selectedElementIds: [id]
    }));
  },

  updateElement: (id: string, updates: Partial<EditorElement>) => {
    set((state) => ({
      ...state,
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  },

  deleteElement: (id: string) => {
    set((state) => ({
      ...state,
      elements: state.elements.filter(el => el.id !== id),
      selectedElementIds: state.selectedElementIds.filter(selectedId => selectedId !== id)
    }));
  },

  selectElements: (ids: string[]) => {
    set({ selectedElementIds: ids });
  },

  clearSelection: () => {
    set({ selectedElementIds: [] });
  },

  updateCanvas: (updates: Partial<EditorState['canvas']>) => {
    set((state) => ({
      ...state,
      canvas: { ...state.canvas, ...updates }
    }));
  },

  updateTool: (updates: Partial<EditorState['tool']>) => {
    set((state) => ({
      ...state,
      tool: { ...state.tool, ...updates }
    }));
  },

  undo: () => {
    const { history } = get();
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    
    set((state) => ({
      ...state,
      history: {
        past: history.past.slice(0, -1),
        present: previous,
        future: [state.history.present, ...history.future]
      }
    }));
  },

  redo: () => {
    const { history } = get();
    if (history.future.length === 0) return;

    const next = history.future[0];
    
    set((state) => ({
      ...state,
      history: {
        past: [...history.past, state.history.present],
        present: next,
        future: history.future.slice(1)
      }
    }));
  },

  saveToHistory: () => {
    const state = get();
    set((currentState) => ({
      ...currentState,
      history: {
        past: [...currentState.history.past, currentState.history.present],
        present: {
          elements: currentState.elements,
          selectedElementIds: currentState.selectedElementIds,
          canvas: currentState.canvas
        },
        future: []
      }
    }));
  },

  updateUI: (updates: Partial<EditorState['ui']>) => {
    set((state) => ({
      ...state,
      ui: { ...state.ui, ...updates }
    }));
  },

  updateCollaboration: (updates: Partial<EditorState['collaboration']>) => {
    set((state) => ({
      ...state,
      collaboration: { ...state.collaboration, ...updates }
    }));
  }
}));
