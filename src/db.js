
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'

class DB {
    constructor(){
        const adapter = new LocalStorage('usersdb')
        this.db = new LowSync(adapter)
    }

    getAllUsers = () => {
        this.db.read()
        this.db.data ||= { users: [] }
        return this.db.data.users
    }
    addUser = (data) => {
        this.db.read()
        this.db.data ||= { users: [] }
        this.db.data.users.push(data)
        this.db.write()
    }
    findUserById = (id) => {
        this.db.read()
        this.db.data ||= { users: [] }
        return this.db.data.users.find((p) => p.id == id)
    }

    deleteUserById = (id) => {
        this.db.read()
        this.db.data ||= { users: [] }
        this.db.data.users = this.db.data.users.filter((p) => p.id !== id)
        this.db.write()
    }

    updateUserById = (id, newName) => {
        this.db.read()
        this.db.data ||= { users: [] }
        this.db.data.users = this.db.data.users.map((p) => {
            if(p.id == id) {
                p.name = newName
            }
            return p
        })
        this.db.write()
    }

}

export default DB;
