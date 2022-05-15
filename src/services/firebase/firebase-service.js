import { database } from '../../firebase';
const db = database.ref('/traffic/events');
class FirebaseService {
  getAll() {
    return db;
  }
  create(data) {
    return db.push(data);
  }
  update(key, value) {
    return db.child(key).update(value);
  }
  delete(key) {
    return db.child(key).remove();
  }
  deleteAll() {
    return db.remove();
  }
}
export default new FirebaseService();
