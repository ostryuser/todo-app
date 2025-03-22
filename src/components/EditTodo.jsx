/* eslint-disable react/prop-types */
import { useState } from "react";

const EditTodo = ({ editTask, task }) => {
  const [einput, setEinput] = useState(task.text);
  console.log(task.text);
  console.log(einput);
  return (
    <div className=" flex">
      <input
        value={einput}
        onChange={(e) => setEinput(e.target.value)}
        className="flex-grow px-3 py-2 border rounded-l-lg "
        type="text"
        placeholder={task.text}
      />
      <button
        onClick={() => {
          editTask(einput, task.id);
          setEinput("");
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditTodo;
