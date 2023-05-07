self.addEventListener("push", (event) => {
  let notification = event.data.json();
  console.log("Incoming notification", notification);
  const iconName = notification.context ? notification.context : "default";
  self.registration.showNotification(notification.title, {
    body: notification.content,
    icon: `/icons/${iconName}.png`,
  });
});
