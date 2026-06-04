const URL = 'http://localhost:3001/tasks'
const URL_ITEMS = 'http://localhost:3001/items'

const headers = {
    'Content-Type': 'application/json',
}

const serverAPI = {
    getAll: () => {
        return fetch(URL).then((response) => response.json())
    },
    
    getAllItems: () => {
        return fetch(URL_ITEMS).then((response) => response.json())
    },

    getById: (id) => {
        return fetch(`${URL}/${id}`)
            .then((response) => response.json())
    },

    add: (task) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        })
            .then((response) => response.json())
    },

    delete: (id) => {
        return fetch(`${URL}/${id}`, { method: 'DELETE' })
    },

    deleteAll: (tasks) => {
        return Promise.all(
            tasks.map(({ id }) => serverAPI.delete(id))
        )
    },

    toggleComplete: (id, isDone) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone })
        })
    },

    updateTitle: (id, title) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ title }),
        })
    },
}

export default serverAPI
