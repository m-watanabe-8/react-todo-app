import React,{useState,useEffect} from 'react';
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

  useEffect(() => {
      console.log(todoList);
  }, [todoList]);

  return (
    <div className="App">
      <header className="App-header">TODO</header>
      <h1>TODO</h1>
      <div className='list'>
        <ul>
          {todoList.map((todo,index)=> {
            return(
              <li>
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
                  <p className='list-title'>{todo.title}</p>
                  <p className='list-detail'>{todo.detail}</p>
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
              style={{width: '25em'}}
              onChange={(event)=>setAddTodo({
                ...addTodo,
                title:event.target.value
              })}
            />
            <label style={{ display: 'block' }} htmlFor="detail">詳細</label>
            <textarea 
              style={{width: '25em'}} 
              type="text" 
              id='detail' 
              onChange={(event)=>setAddTodo({
                ...addTodo,
                detail:event.target.value
              })}
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
