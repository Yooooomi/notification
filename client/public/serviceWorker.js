self.addEventListener("push", (event) => {
  let notification = event.data.json();
  self.registration.showNotification(notification.title, {
    body: notification.content,
    icon: notification.icon,
  });
});
