const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

const getData = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setData = (dataBase) =>
  localStorage.setItem("todoList", JSON.stringify(dataBase));

const newItem = (task, status, index) => {
  qS(".to-do--list").innerHTML += `
  <label class="to-do--item">
    <input type="checkbox" ${status} data-index="${index}"/>
    <div>${task}</div>
    <input type="button" value="X" data-index="${index}"/>
  </label>`;
};

const clearList = () => (qS(".to-do--list").innerHTML = "");

const updateList = () => {
  clearList();
  const dataBase = getData();
  dataBase.forEach((item, index) => {
    newItem(item.task, item.status, index);
  });
};

const newTask = (event) => {
  if (event.key === "Enter") {
    const newTask = event.target.value;
    const dataBase = getData();
    dataBase.push({ task: newTask, status: "" });
    setData(dataBase);
    updateList();
    event.target.value = "";
  }
};

const checkItem = (index) => {
  const dataBase = getData();
  dataBase[index].status = dataBase[index].status === "" ? "checked" : "";
  setData(dataBase);
  updateList();
};

const deleteItem = (index) => {
  const dataBase = getData();
  dataBase.splice(index, 1);
  setData(dataBase);
  updateList();
};

const clickItem = (event) => {
  const type = event.target.type;
  const index = event.target.getAttribute("data-index");
  if (type === "checkbox") {
    checkItem(index);
  } else if (type === "button") {
    deleteItem(index);
  }
};

qS(".to-do--new-item input").addEventListener("keyup", newTask);
qS(".to-do--list").addEventListener("click", clickItem);

updateList();
