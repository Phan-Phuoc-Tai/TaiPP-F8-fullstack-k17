//React
const TodoWrapper = () => {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [tasksCompleted, setTasksCompleted] = React.useState([]);
  const [tasksEdit, setTaskEdit] = React.useState([]);
  const handleAddTask = (taskName) => {
    if (!taskName) {
      setError("Please give the task a name!");
      return;
    }
    if (tasks.includes(taskName)) {
      setError("This task already exists!");
      return;
    }
    setError("");
    setTasks([...tasks, taskName]);
  };
  const handleDeleteTask = (_index) => {
    setTasks(tasks.filter((_, index) => index !== _index));
    setTaskEdit(
      tasksEdit.map((task) => {
        if (task > _index) {
          return task - 1;
        }
        return task;
      })
    );
  };
  const handleTaskCompleted = (index) => {
    if (tasksCompleted.includes(index)) {
      return setTasksCompleted(
        tasksCompleted.filter((task) => +task !== index)
      );
    }
    setTasksCompleted([...tasksCompleted, index]);
  };
  const handleEditTask = (_index) => {
    setTaskEdit([...tasksEdit, _index]);
  };
  const handleUpdateTask = (taskName, position) => {
    if (!taskName) {
      return;
    }
    tasks[position] = taskName;
    setTaskEdit(
      tasksEdit.filter((_, index) => index !== tasksEdit.indexOf(position))
    );
  };
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      {error ? <h4 className="error">{error}</h4> : ""}
      <TodoForm onClick={handleAddTask} isAddTask={true} value="" />
      {tasks.map((task, index) => {
        if (tasksEdit.includes(index)) {
          return (
            <TodoForm
              isAddTask={false}
              key={index}
              value={task}
              position={index}
              onClick={handleUpdateTask}
            />
          );
        }
        return (
          <div className="Todo" key={index}>
            <p
              className={tasksCompleted.includes(index) ? "completed" : ""}
              onClick={() => handleTaskCompleted(index)}
            >
              {task}
            </p>
            <div className="Todo-options">
              <button onClick={() => handleEditTask(index)}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={() => handleDeleteTask(index)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TodoForm = (props) => {
  const [value, setValue] = React.useState(props.value);
  const handlePreventSubmit = (e) => {
    e.preventDefault();
  };
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="TodoForm" onSubmit={handlePreventSubmit}>
      <input
        type="text"
        placeholder={
          props.isAddTask ? "What is the task today?" : "Update task"
        }
        className="todo-input"
        autoFocus
        onChange={handleChangeValue}
        value={value}
      />
      <button
        type={props.isAddTask ? "submit" : "button"}
        className="todo-btn"
        onClick={() => {
          props.onClick(value, props.position);
          setValue("");
        }}
      >
        {props.isAddTask ? "Add Task" : "Edit Task"}
      </button>
    </form>
  );
};

const element = (
  <div className="App">
    <TodoWrapper />
  </div>
);
//ReactDOM
const root = document.querySelector("#root");
const container = ReactDOM.createRoot(root);
container.render(element);

/*Note
- Tạo giao diện
- Chặn hành vi mặc định của form
- Thêm task.
  + Báo lỗi nếu user chưa đặt tên task
  + Báo lỗi nếu user thêm task đã tồn tại
- Đánh dấu task completed khi click vào tên task
- Xoá task
- Chỉnh sửa task
  + Có thể chỉnh sửa tên ở nhiều task, đồng thời thêm task mới trong khi sửa
  + Cập nhật tên mới
- Cải thiện:
  + Chưa sử dụng useEffect. Sử dụng 100% useState
  + Lưu ý khi sử dụng phương thức SPLICE trong array
  + Cập nhật task, lỗi cảnh báo khi bấm submit trong lúc form bị xoá khỏi DOM. Tạm thời sửa type='button'.
  */
