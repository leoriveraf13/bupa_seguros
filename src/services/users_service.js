import { usersClient } from "../http_common";

class UsersDataService {
  getAll() {
    return usersClient.get("/users");
  }

  get(id) {
    return usersClient.get(`/users/${id}`);
  }

  create(data) {
    return usersClient.post("/users", data);
  }

  update(id, data) {
    return usersClient.put(`/users/${id}`, data);
  }

  delete(id) {
    return usersClient.delete(`/users/${id}`);
  }

  findByName(name) {
    return usersClient.get(`/users?first_name=${name}`);
  }
}

export default new UsersDataService();