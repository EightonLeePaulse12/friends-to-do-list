export type Todo = {
    id: number;
    userId: string | undefined;
    name: string;
    priority: "Null" | "Low" | "Neutral" | "High" | "Critical";
    dueDate: Date | null;
    createdAt: Date;
    subnotes: {
      id: number;
      name: string;
      todoId: number;
    }[];
  };