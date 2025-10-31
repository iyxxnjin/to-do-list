export interface Todo {
  id: number
  name: string
  done: boolean
  memo?: string
  imageUrl?: string
  isCompleted: boolean
}

export interface ItemEditorProps {
  todo: Todo | null
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  onToggle: () => void
  onSave: () => void
  onDelete: () => void
  onUpload: (file: File) => void
}