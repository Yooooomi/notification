import Express from "express";
import cors from "cors";
import { NotificationSender } from "./tools/notification";
import { Database } from "./tools/db";

const app = Express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(Express.json());

const notificationSender = new NotificationSender();
const db = new Database();
db.load();

app.post("/register", async (req, res) => {
  const { username, endpoint, keys } = req.body;

  db.register(username, {
    endpoint,
    keys,
  });
  console.log(db);

  return res.status(204).end();
});

app.post("/notify", async (req, res) => {
  const { username, title, content } = req.body;
  const user = db.get(username);
  if (!user) {
    return res.status(404).end();
  }

  await notificationSender.sendNotification(user, title, content);

  return res.status(204).end();
});

app.listen(8080, () => {
  console.log("Listening at 8080");
});
