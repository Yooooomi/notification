import fs from "fs";
import { NotificationReceiverDetails } from "./notification";

export class Database {
  static path = "./database.json";

  db: Record<string, NotificationReceiverDetails> = {};

  load() {
    try {
      const content = fs.readFileSync(Database.path);
      const newDbContent = JSON.parse(content.toString());
      this.db = newDbContent;
    } catch (e) {
      console.log("Database did not exist, initing from scratch");
    }
  }

  save() {
    fs.writeFileSync(Database.path, JSON.stringify(this.db, null, " "));
  }

  get(key: string) {
    return this.db[key];
  }

  register(key: string, data: NotificationReceiverDetails) {
    this.db[key] = data;
    this.save();
  }
}
