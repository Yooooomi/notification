self.addEventListener("push", (event) => {
  let notification = event.data.json();
  console.log(notification);
  self.registration.showNotification(notification.title, notification.options);
});
