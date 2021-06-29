export interface Todos {
    todos: Todo[];
}

interface Todo {
    _id: string;
    title: string;
    status: 'uncompleted' | 'completed';
    createdAt: string;
    updateAt: string;
    _v: number;
}

export interface GetTodoResult {
    result: Todo;
}

export interface TodoBody {
    title: string,
    status?: 'completed' | 'uncompleted'
}