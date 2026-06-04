import {TasksProvider} from '@/entities/todo'
import Todo from '@/widgets/Todo'
import Weather from '../../widgets/weather/Weather'
import Spinner from '../../widgets/Spinner'

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
      <div className="weather_spinner_container">
      <Spinner />
      <Weather />
      </div>
    </TasksProvider>
  )
}

export default TasksPage
