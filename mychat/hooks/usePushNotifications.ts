// import { useEffect, useState } from "react";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";

// const usePushNotifications = () => {
//   const [pushToken, setPushToken] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const getPushToken = async () => {
//       try {
//         // Request notification permissions
//         const { status } = await Notifications.requestPermissionsAsync();
//         console.log("Permission Status:", status); // Log permission status
//         const projectId = Constants?.expoConfig?.extra?.eas.id;

//         if (status === "granted") {
//           try {
//             // const token = await Notifications.getExpoPushTokenAsync();
//             const token = await Notifications.getExpoPushTokenAsync({
//               projectId: projectId,
//             });
//             console.log("Push token received:", token.data); // Log token if it's available
//             setPushToken(token.data); // Set token in state if it's valid
//           } catch (tokenError) {
//             console.error("Error while fetching push token:", tokenError);
//           }
//         } else {
//           console.log("Permission denied for push notifications.");
//         }
//       } catch (error) {
//         console.error("Error getting push token:", error);
//       }
//     };

//     getPushToken(); // Trigger the function to get push token when component mounts
//   }, []); // This runs once when the component mounts

//   return pushToken; // Return push token or undefined
// };

// export default usePushNotifications;
