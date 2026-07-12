import { useState, useEffect } from "react";

function App() {

  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);


  const fetchTasks = () => {

    fetch("https://fullstack-production-c8ba.up.railway.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setAllTasks(data);
      })
      .catch((err) => console.log("Error fetching tasks:", err));

  };


  useEffect(() => {
    fetchTasks();
  }, []);



  const addTask = () => {

    if(task.trim() === ""){
      alert("Please enter a task");
      return;
    }

    fetch("https://fullstack-production-c8ba.up.railway.app/addTask", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        task: task,
      }),

    })

    .then((res) => res.text())

    .then((data) => {

      console.log(data);

      setTask("");

      fetchTasks();

    })

    .catch((err)=>console.log(err));

  };



  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h1 className="text-center text-dark mb-4">
          Todo App
        </h1>


        <div className="input-group mb-4">

          <input

            type="text"

            className="form-control"

            placeholder="Enter your task"

            value={task}

            onChange={(e)=>setTask(e.target.value)}

          />


          <button

            className="btn btn-success"

            onClick={addTask}

          >
            Add Task
          </button>


        </div>



        <h4 className="mb-3">
          My Tasks
        </h4>



        <ul className="list-group">


          {allTasks.map((item,index)=>(


            <li

              key={item.id || index}

              className="list-group-item d-flex justify-content-between align-items-center"

            >

              <span>
                {item.task}
              </span>


              <button className="btn btn-danger btn-sm">
                Delete
              </button>


            </li>


          ))}


        </ul>


      </div>


    </div>

  );

}

export default App;