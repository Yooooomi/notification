import webpush from "web-push";

webpush.setVapidDetails(
  `mailto:${process.env.NOTIFICATION_MAIL}`,
  process.env.NOTIFICATION_PUBLIC_VAPID_KEY as string,
  process.env.NOTIFICATION_PRIVATE_VAPID_KEY as string
);

export interface NotificationReceiverDetails {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export class NotificationSender {
  async sendNotification(
    details: NotificationReceiverDetails,
    title: string,
    content: string,
    context: string
  ) {
    const contextIcon = `NOTIFICATION_ICON_${context}`;
    const icon = process.env[contextIcon] ?? process.env.NOTIFICATION_ICON;
    const result = await webpush.sendNotification(
      {
        endpoint: details.endpoint,
        keys: details.keys,
      },
      JSON.stringify({
        title,
        content,
        ...(icon ? { icon } : {}),
      })
    );
    console.log(result.statusCode, result.body);
  }
}
