// hooks/useIncomingNotifications.js (for incoming notifications)
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";

// Explicitly type the state as Notification | null
const useIncomingNotifications = () => {
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification); // Store incoming notification data
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle response (e.g., navigate to a specific chat when tapped)
        console.log(response);
      });

    // Cleanup the listeners when the component is unmounted
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return notification; // Returns the latest incoming notification or null if none
};

export default useIncomingNotifications;
