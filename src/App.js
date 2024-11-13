import React,{useState} from 'react';
import './App.css';

function App() {
  const [todoList,setTodoList] = useState([])
  const [addTodo,setAddTodo] = useState({
    status:'未着手',
    title: '',
    detail: ''
  })

  //追加処理
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(addTodo.title !== ''){
      setTodoList([...todoList,{...addTodo}])
    }
    setAddTodo({
      status:'未着手',
      title: '',
      detail: ''
    })
  }

  //ステータス変更
  const changeStatus = (newStatus,index) => {
    const copyTodoList = [...todoList]
    copyTodoList[index].status = newStatus
    setTodoList([...copyTodoList])
  }

  //削除
  const deleteTodo = (delIndex) => {
    setTodoList(
      todoList.filter((todo,index) => 
        index !== delIndex
      )
    )
  }

  return (
    <div className="App">
      <header className="App-header">TODO</header>
      <h1>TODO</h1>
      <div className='list'>
        <ul>
          {todoList.map((todo,index)=> {
            return(
              <li key={index}>
                <span>{index+1}</span>
                <select 
                  value={todo.status}
                  onChange={(event) => changeStatus(event.target.value,index)}
                >
                  <option value='未着手'>未着手</option>
                  <option value='着手'>着手</option>
                  <option value='完了'>完了</option>
                </select>
                <div className='list-text'> 
                  <p className='list-title' style={todo.status === '完了' ? {textDecoration: "line-through"}:{textDecoration:"none"}}>{todo.title}</p>
                  <p className='list-detail' style={todo.status === '完了' ? {textDecoration: "line-through"}:{textDecoration:"none"}}>{todo.detail}</p>
                </div>
                <button className='btn-delete' onClick={() => deleteTodo(index)}>削除</button>
              </li>
              )
            })}   
        </ul>
      </div>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-wrapper'>
            <label style={{ display: 'block' }} htmlFor="title">タイトル</label>
            <input 
              type="text" 
              id='title' 
              value={addTodo.title}
              autoComplete="off"
              style={{width: '25em'}}
              onChange={(event)=>setAddTodo({
                ...addTodo,
                title:event.target.value
              })}
            />
            <label style={{ display: 'block' }} htmlFor="detail">詳細</label>
            <textarea 
              style={{width: '25em'}} 
              id='detail' 
              value={addTodo.detail}
              key={`textarea-${Date.now()}`}
              autoComplete="off"
              onChange={(event)=> {
                setAddTodo({
                ...addTodo,
                detail:event.target.value
              })}}
            />
          </div>
          <button 
            style={{margin: '20px'}} 
            type='submit'
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
