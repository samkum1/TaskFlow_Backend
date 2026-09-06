export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserResponse = Omit<User, "password">;

export type WorkspaceRole = "owner" | "admin" | "member" | "viewer";

export interface WorkspaceMember {
  userId: string;
  role: WorkspaceRole;
  joinedAt: Date;
}

export interface Workspace {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  members: WorkspaceMember[];
  createdAt: Date;
  updateAt: Date;
}

export interface Board {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  createdAt: Date;
  updateAt: Date;
}

export type ColumnType = "todo" | "in_progress" | "review" | "done";

export interface Column {
  id: string;
  name: string;
  type: ColumnType;
  boardId: string;
  position: number;
  createdAt: Date;
  updateAt: Date;
}

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  columnId: string;
  boardId: string;
  assigneeId: string | null;
  priority: TaskPriority;
  position: number; // for ordering tasks top-to-bottom (drag-and-drop)
  labels: Label[];
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
