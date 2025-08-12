import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "./Config/firebaseConfig";
import { updateNotifications } from "./redux/notificationSlice";

export const useNotificationListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(
      collection(db, "alerts"),
      orderBy("time", "desc"),
      limit(10) // v1
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        try {
          const fetchedNotifications = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.heading || "Notification",
              description: data.message || "",
              time: data.time ? data.time.toDate().toLocaleString() : "",
              hasAction: !!data.action,
              action: data.action,
            };
          });

          dispatch(
            updateNotifications({
              totalNotifications: fetchedNotifications.length,
              notifications: fetchedNotifications, // v1
            })
          );
        } catch (error) {
          console.error("Error processing notifications:", error);
        }
      },
      (error) => {
        console.error("Error fetching notifications:", error);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);
};
