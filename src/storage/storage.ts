import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../interfaces/interfaces'

const storage: IUser[] = [
  {
    id: 1, db_userID: uuidv4(), name: 'Maksim Znak', age: 30, hobbies: ['BOXING', 'Myau Thai', 'Rugby']
  }
]
export default storage
