import axios from 'axios'

interface updateTodoVariables {
    id: string;
    title: string;
    status: string;
  }

export const updateTodo = async ({id, title, status}: updateTodoVariables): Promise<void> => {
    try{
            await axios ({
                method: 'PUT',
                url: `http://localhost:8080/api/update-todo/${id}`,
                data: {
                    title: title,
                    status: status
                }
            })

        

    }catch (error){
        throw new Error (error)
    }
}