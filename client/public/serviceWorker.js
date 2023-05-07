self.addEventListener("push", (event) => {
  let notification = event.data.json();
  console.log('Incoming notification', notification);
  self.registration.showNotification(notification.title, {
    body: notification.content,
    icon: notification.icon,
  });
});
