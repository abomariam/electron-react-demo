import './App.css';
import DB from './db';
import {useState} from "react";

function App() {
  const db = new DB();
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [foundUser, setFoundUser] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editUserName, setEditUserName] = useState('');

  // This is used to force re-render
  const [tmp, setTmp] = useState(0);

  const users = db.getAllUsers()


  const nextId = Math.max.apply(Math, users.map(u => u.id || 0)) + 1;

  return (
    <div className="App">
        <span style={{display: "none"}}>{tmp}</span>
        <div className="section">
            <h1>Add New User</h1>
            <input value={userName} onChange={evt => setUserName(evt.target.value)}/>
            <button onClick={() => {db.addUser({id: nextId, name: userName}); setUserName('')}}>Add</button>
        </div>

      <div className="section">
        <h1>List</h1>
        <ul>
          {users.map((user) => <li key={user.id}>
              {user.id } - { user.name }
              <button onClick={() => {db.deleteUserById(user.id); setTmp(tmp + 1)}}>delete</button>
          </li>)}
        </ul>
      </div>

        <div className="section">
            <h1>Find A user</h1>
            <label>ID </label>
            <input value={userId} onChange={evt => setUserId(evt.target.value)}/>
            <button onClick={() => {setFoundUser(db.findUserById(userId))}}>Find</button>
            {foundUser ? <p>User found: {foundUser.id} - {foundUser.name}</p>: <p>User Was not found</p>}
        </div>

        <div className="section">
            <h1>Edit User By Id</h1>
            <label>ID</label>
            <input value={editUserId} onChange={evt => setEditUserId(evt.target.value)}/>
            <label>Name</label>
            <input value={editUserName} onChange={evt => setEditUserName(evt.target.value)}/>
            <button onClick={() => {db.updateUserById(editUserId, editUserName); setTmp(tmp+1)}}>Edit</button>
        </div>

    </div>
  );
}

export default App;
