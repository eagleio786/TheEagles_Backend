// import { useState, useEffect } from "react";
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../Config/firebaseConfig";
// import { useDispatch } from "react-redux";
// import { MdNotifications } from "react-icons/md";
// import { FiExternalLink } from "react-icons/fi";
// import {
//   updateNotifications,
//   resetNewNotifications,
// } from "../redux/notificationSlice";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "";

//     try {
//       const date = timestamp.toDate();
//       return date.toLocaleString();
//     } catch (error) {
//       console.error("Error formatting timestamp:", error);
//       return "";
//     }
//   };

//   const parseAction = (action) => {
//     if (!action) return "";

//     try {
//       if (
//         typeof action === "string" &&
//         action.startsWith('"') &&
//         action.endsWith('"')
//       ) {
//         return JSON.parse(action);
//       }

//       return action;
//     } catch (error) {
//       console.error("Error parsing action:", error);
//       return action;
//     }
//   };

//   useEffect(() => {
//     // Dispatch resetNewNotifications when the component mounts
//     dispatch(resetNewNotifications());

//     const q = query(collection(db, "alerts"), orderBy("time", "desc"));

//     const unsubscribe = onSnapshot(
//       q,
//       (querySnapshot) => {
//         try {
//           const fetchedNotifications = querySnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               title: data.heading || "Notification",
//               description: data.message || "",
//               time: formatTimestamp(data.time),
//               hasAction: !!data.action,
//               action: parseAction(data.action),
//             };
//           });

//           dispatch(
//             updateNotifications({
//               totalNotifications: fetchedNotifications.length,
//             })
//           );
//           setNotifications(fetchedNotifications);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error processing notifications:", error);
//           setError(error);
//           setLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Error fetching notifications:", error);
//         setError(error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [dispatch]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//               {item.hasAction && (
//                 <div className="absolute right-0 top-0">
//                   <a
//                     href={item.action}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <FiExternalLink className="text-gray-400 w-4 h-4" />
//                   </a>
//                 </div>
//               )}
//             </div>
//             <p className="text-gray-400 text-sm">{item.description}</p>
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-800 min-h-screen p-4 flex justify-center items-center">
//         <div className="text-white text-xl">Loading notifications...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-800 min-h-screen p-4 flex justify-center items-center">
//         <div className="text-red-500 text-xl">
//           Error loading notifications: {error.message}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         <div className="text-white">
//           {notifications.length > 0 ? (
//             notifications.map(renderNotificationItem)
//           ) : (
//             <div className="text-center text-gray-400">
//               No push notifications available.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;

// --------------SIMPLE FETCHING FROM FIREBASE-------------------

// import { useState, useEffect, useCallback } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";
// import { useConfig, usePublicClient } from "wagmi";
// import { decodeEventLog, parseAbiItem } from "viem";
// import { db } from "../Config/firebaseConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { MdNotifications } from "react-icons/md";
// import {
//   updateNotifications,
//   resetNewNotifications,
// } from "../redux/notificationSlice";
// import { formatUnits } from "viem";
// const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const MAX_NOTIFICATIONS = 100;

// // Helper function to validate Firestore data
// const validateFirestoreData = (data) => {
//   const validData = {};
//   for (const [key, value] of Object.entries(data)) {
//     if (value === undefined || value === null) {
//       validData[key] = "";
//     } else if (typeof value === "object" && !(value instanceof Date)) {
//       validData[key] = JSON.stringify(value);
//     } else {
//       validData[key] = value;
//     }
//   }
//   return validData;
// };

// function Notifications() {
//   // const [notifications, setNotifications] = useState([]);
//   const { notifications } = useSelector((state) => state.notifications);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
//   const [processedTransactions, setProcessedTransactions] = useState(new Set());
//   const dispatch = useDispatch();

//   const config = useConfig();
//   const publicClient = usePublicClient();

//   const logError = (context, error) => {
//     console.error(`[Notifications Error - ${context}]`, {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       details: error.details || "No additional details",
//     });
//   };
//   const formatAmount = (amount, decimals = 18) => {
//     try {
//       return formatUnits(amount, decimals);
//     } catch (error) {
//       console.error("Error formatting amount:", error);
//       return amount.toString();
//     }
//   };

//   const checkTransactionExists = async (transactionHash) => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         where("transactionHash", "==", transactionHash)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       logError("Check Transaction Exists", error);
//       return false;
//     }
//   };

//   const fetchLastProcessedBlock = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("blockNumber", "desc"),
//         limit(1)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const lastDoc = querySnapshot.docs[0];
//         return lastDoc.data().blockNumber;
//       }
//       return null;
//     } catch (error) {
//       logError("Fetch Last Processed Block", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(resetNewNotifications());

//     const fetchContractEvents = async () => {
//       try {
//         const fundsDistributedEvent = parseAbiItem(
//           "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
//         );

//         const latestBlock = await publicClient.getBlockNumber();
//         const startBlock = lastProcessedBlock
//           ? BigInt(lastProcessedBlock) + 1n
//           : latestBlock - 1000n;
//         const safeStartBlock =
//           startBlock > latestBlock ? latestBlock : startBlock;
//         // Get logs
//         const logs = await publicClient.getLogs({
//           address: CONTRACT_ADDRESS,
//           event: fundsDistributedEvent,
//           // fromBlock: startBlock,
//           fromBlock: safeStartBlock,
//           toBlock: latestBlock,
//         });

//         // Process logs in chronological order
//         const newNotifications = [];
//         const newProcessedTransactions = new Set(processedTransactions);

//         for (const log of logs) {
//           try {
//             // Skip if already processed
//             if (newProcessedTransactions.has(log.transactionHash)) {
//               continue;
//             }

//             const decodedLog = decodeEventLog({
//               abi: [fundsDistributedEvent],
//               ...log,
//             });
//             console.log("this is decodedLog ", decodedLog);
//             if (!decodedLog?.args) {
//               console.error("Invalid decoded log:", log);
//               continue;
//             }

//             // Validate required fields
//             if (
//               !log.transactionHash ||
//               !decodedLog.args.from ||
//               !decodedLog.args.to
//             ) {
//               console.error("Missing required fields in log:", log);
//               continue;
//             }
//             const transactionAlreadyExists = await checkTransactionExists(
//               log.transactionHash
//             );
//             if (transactionAlreadyExists) {
//               console.log(
//                 `Transaction ${log.transactionHash} already exists in Firestore`
//               );
//               newProcessedTransactions.add(log.transactionHash);
//               continue;
//             }

//             // Destructure with proper checks
//             const { from, to, matrix, level, amount } = decodedLog.args;
//             const amountStr = formatAmount(amount);
//             console.log("this is the converted ammount: ", amountStr);

//             const levelStr = level?.toString() || "0";
//             const matrixStr = matrix?.toString() || "0";

//             // Format addresses for display
//             const formatAddress = (addr) => {
//               if (!addr || typeof addr !== "string") return "Unknown";
//               return `${addr.substring(0, 6)}...${addr.substring(
//                 addr.length - 4
//               )}`;
//             };

//             // Prepare Firestore data
//             const firestoreData = validateFirestoreData({
//               heading: "Funds Distributed",
//               message: `Funds distributed: ${amountStr} from ${formatAddress(
//                 from
//               )} to ${formatAddress(to)}`,
//               time: new Date(),
//               action: null,
//               blockNumber: Number(log.blockNumber),
//               transactionHash: log.transactionHash,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               matrix: matrixStr,
//               level: levelStr,
//             });

//             // Save to Firestore
//             try {
//               await addDoc(collection(db, "alerts"), firestoreData);
//             } catch (firestoreError) {
//               logError("Firestore Save Operation", firestoreError);
//               continue;
//             }

//             // Add to local state
//             newNotifications.push({
//               id: `${log.transactionHash}-${log.logIndex}`,
//               // title: "Funds Distributed",
//               title: `+ ${amountStr} USDT received`,
//               description: `<strong>Program</strong> x${matrix}, <strong>level ${level}</strong> from ${formatAddress(
//                 from
//               )} to ${formatAddress(to)} (Level ${levelStr})`,
//               // description: `${amountStr} from ${formatAddress(
//               //   from
//               // )} to ${formatAddress(to)} (Level ${levelStr})`,
//               time: new Date().toLocaleString(),
//               hasAction: false,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               level: levelStr,
//             });

//             newProcessedTransactions.add(log.transactionHash);
//           } catch (error) {
//             logError("Log processing error", error);
//           }
//         }

//         // Update states
//         if (newNotifications.length > 0) {
//           setNotifications((prev) => {
//             const combined = [...newNotifications, ...prev];
//             return combined.slice(0, MAX_NOTIFICATIONS);
//           });
//           dispatch(
//             updateNotifications({ totalNotifications: newNotifications.length })
//           );
//           setLastProcessedBlock(Number(latestBlock));
//           setProcessedTransactions(newProcessedTransactions);
//         }

//         setLoading(false);
//       } catch (error) {
//         logError("Fetch Contract Events", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Initialize and set interval
//     let isMounted = true;
//     let intervalId;

//     const initialize = async () => {
//       try {
//         const lastBlock = await fetchLastProcessedBlock();
//         if (isMounted && lastBlock) {
//           setLastProcessedBlock(lastBlock);
//         }
//         await fetchContractEvents();

//         // Only set interval after initial fetch
//         intervalId = setInterval(async () => {
//           if (isMounted) {
//             try {
//               await fetchContractEvents();
//             } catch (error) {
//               logError("Interval Fetch Error", error);
//             }
//           }
//         }, 30000);
//       } catch (error) {
//         logError("Initialization Error", error);
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, [
//     dispatch,
//     publicClient,
//     fetchLastProcessedBlock,
//     lastProcessedBlock,
//     processedTransactions,
//   ]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p
//               className="text-gray-400 text-sm"
//               dangerouslySetInnerHTML={{ __html: item.description }}
//             />
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div>
//         {/* <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p className="text-gray-400 text-sm">{item.description}</p>
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div> */}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">
//             Loading notifications...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             Error loading notifications
//           </div>
//         ) : notifications.length > 0 ? (
//           notifications.map(renderNotificationItem)
//         ) : (
//           <div className="text-center text-gray-400">
//             No notifications available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

// import { useState, useEffect, useCallback } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";
// import { useConfig, usePublicClient } from "wagmi";
// import { decodeEventLog, parseAbiItem } from "viem";
// import { db } from "../Config/firebaseConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { MdNotifications } from "react-icons/md";
// import {
//   updateNotifications,
//   resetNewNotifications,
//   setNotifications,
// } from "../redux/notificationSlice";
// import { formatUnits } from "viem";
// import { users } from "../Config/Contract-Methods";

// const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const MAX_NOTIFICATIONS = 100;

// // Helper function to validate Firestore data
// const validateFirestoreData = (data) => {
//   const validData = {};
//   for (const [key, value] of Object.entries(data)) {
//     if (value === undefined || value === null) {
//       validData[key] = "";
//     } else if (typeof value === "object" && !(value instanceof Date)) {
//       validData[key] = JSON.stringify(value);
//     } else {
//       validData[key] = value;
//     }
//   }
//   return validData;
// };

// function Notifications() {
//   const { notifications } = useSelector((state) => state.notifications);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
//   const [processedTransactions, setProcessedTransactions] = useState(new Set());
//   const dispatch = useDispatch();

//   const config = useConfig();
//   const publicClient = usePublicClient();

//   const logError = (context, error) => {
//     console.error(`[Notifications Error - ${context}]`, {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       details: error.details || "No additional details",
//     });
//   };

//   const formatAmount = (amount, decimals = 18) => {
//     try {
//       return formatUnits(amount, decimals);
//     } catch (error) {
//       console.error("Error formatting amount:", error);
//       return amount.toString();
//     }
//   };

//   const fetchUserIds = async (notifications) => {
//     try {
//       const userIdPromises = notifications.map(async (notification) => {
//         try {
//           console.log(
//             `Fetching user ID for address: ${notification.fromAddress}`
//           );
//           const userDetails = await users(notification.fromAddress);
//           const userId = userDetails[1]?.toString() || "Unknown User";

//           // Log the entire user details and extracted user ID
//           console.log(
//             `User details for ${notification.fromAddress}:`,
//             userDetails
//           );
//           console.log(`Extracted User ID: ${userDetails[1]}`);

//           return {
//             ...notification,
//             userId: userId,
//           };
//         } catch (error) {
//           console.error(
//             `Error fetching user ID for ${notification.fromAddress}:`,
//             error
//           );
//           return {
//             ...notification,
//             userId: "Unknown User",
//           };
//         }
//       });

//       const notificationsWithUserIds = await Promise.all(userIdPromises);

//       return notificationsWithUserIds;
//     } catch (error) {
//       console.error("Error in fetchUserIds:", error);
//       return notifications;
//     }
//   };

//   const checkTransactionExists = async (transactionHash) => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         where("transactionHash", "==", transactionHash)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       logError("Check Transaction Exists", error);
//       return false;
//     }
//   };

//   const fetchLastProcessedBlock = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("blockNumber", "desc"),
//         limit(1)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const lastDoc = querySnapshot.docs[0];
//         return lastDoc.data().blockNumber;
//       }
//       return null;
//     } catch (error) {
//       logError("Fetch Last Processed Block", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(resetNewNotifications());

//     const fetchContractEvents = async () => {
//       try {
//         const fundsDistributedEvent = parseAbiItem(
//           "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
//         );

//         const latestBlock = await publicClient.getBlockNumber();
//         const startBlock = lastProcessedBlock
//           ? BigInt(lastProcessedBlock) + 1n
//           : latestBlock - 1000n;
//         const safeStartBlock =
//           startBlock > latestBlock ? latestBlock : startBlock;

//         // Get logs
//         const logs = await publicClient.getLogs({
//           address: CONTRACT_ADDRESS,
//           event: fundsDistributedEvent,
//           fromBlock: safeStartBlock,
//           toBlock: latestBlock,
//         });

//         // Process logs in chronological order
//         const newNotifications = [];
//         const newProcessedTransactions = new Set(processedTransactions);

//         for (const log of logs) {
//           try {
//             // Skip if already processed
//             if (newProcessedTransactions.has(log.transactionHash)) {
//               continue;
//             }

//             const decodedLog = decodeEventLog({
//               abi: [fundsDistributedEvent],
//               ...log,
//             });

//             if (!decodedLog?.args) {
//               console.error("Invalid decoded log:", log);
//               continue;
//             }

//             // Validate required fields
//             if (
//               !log.transactionHash ||
//               !decodedLog.args.from ||
//               !decodedLog.args.to
//             ) {
//               console.error("Missing required fields in log:", log);
//               continue;
//             }

//             const transactionAlreadyExists = await checkTransactionExists(
//               log.transactionHash
//             );
//             if (transactionAlreadyExists) {
//               console.log(
//                 `Transaction ${log.transactionHash} already exists in Firestore`
//               );
//               newProcessedTransactions.add(log.transactionHash);
//               continue;
//             }

//             // Destructure with proper checks
//             const { from, to, matrix, level, amount } = decodedLog.args;
//             const amountStr = formatAmount(amount);

//             const levelStr = level?.toString() || "0";
//             const matrixStr = matrix?.toString() || "0";

//             // Format addresses for display
//             const formatAddress = (addr) => {
//               if (!addr || typeof addr !== "string") return "Unknown";
//               return `${addr.substring(0, 6)}...${addr.substring(
//                 addr.length - 4
//               )}`;
//             };

//             // Prepare Firestore data
//             const firestoreData = validateFirestoreData({
//               heading: "Funds Distributed",
//               message: `Funds distributed: ${amountStr} from ${formatAddress(
//                 from
//               )} to ${formatAddress(to)}`,

//               time: new Date(),
//               action: null,
//               blockNumber: Number(log.blockNumber),
//               transactionHash: log.transactionHash,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               matrix: matrixStr,
//               level: levelStr,
//               // userId: "pending",
//             });

//             // Save to Firestore
//             try {
//               await addDoc(collection(db, "alerts"), firestoreData);
//             } catch (firestoreError) {
//               logError("Firestore Save Operation", firestoreError);
//               continue;
//             }

//             // Add to local state
//             newNotifications.push({
//               id: `${log.transactionHash}-${log.logIndex}`,
//               title: `+ ${amountStr} USDT received`,
//               // description: `<strong>Program</strong> x${matrix}, <strong>level ${level}</strong> from ${formatAddress(
//               //   from
//               // )} to ${formatAddress(to)} (Level ${levelStr})`,
//               // description: `<strong>Program</strong> x${matrix}, <strong>level ${level}</strong> (Level ${levelStr})`,
//               description: `Loading user details...`,
//               time: new Date().toLocaleString(),
//               hasAction: false,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               level: levelStr,
//               matrix: matrixStr,
//             });

//             newProcessedTransactions.add(log.transactionHash);
//           } catch (error) {
//             logError("Log processing error", error);
//           }
//         }

//         // Update states
//         if (newNotifications.length > 0) {
//           // Fetch user IDs for the new notifications
//           const notificationsWithUserIds = await fetchUserIds(newNotifications);

//           // Combine with existing notifications and limit
//           const updatedNotifications = notificationsWithUserIds.map(
//             (notification) => ({
//               ...notification,
//               description: `From user ${notification.userId}: <strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong>`,
//             })
//           );
//           const combinedNotifications = [
//             // ...notificationsWithUserIds,
//             ...updatedNotifications,
//             ...notifications,
//           ].slice(0, MAX_NOTIFICATIONS);

//           // Dispatch to update notifications in Redux store
//           dispatch(setNotifications({ notifications: combinedNotifications }));
//           dispatch(
//             updateNotifications({
//               totalNotifications: combinedNotifications.length,
//               notifications: combinedNotifications,
//             })
//           );

//           setLastProcessedBlock(Number(latestBlock));
//           setProcessedTransactions(newProcessedTransactions);
//         }

//         setLoading(false);
//       } catch (error) {
//         logError("Fetch Contract Events", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Initialize and set interval
//     let isMounted = true;
//     let intervalId;

//     const initialize = async () => {
//       try {
//         const lastBlock = await fetchLastProcessedBlock();
//         if (isMounted && lastBlock) {
//           setLastProcessedBlock(lastBlock);
//         }
//         await fetchContractEvents();

//         // Only set interval after initial fetch
//         intervalId = setInterval(async () => {
//           if (isMounted) {
//             try {
//               await fetchContractEvents();
//             } catch (error) {
//               logError("Interval Fetch Error", error);
//             }
//           }
//         }, 30000);
//       } catch (error) {
//         logError("Initialization Error", error);
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, [
//     dispatch,
//     publicClient,
//     fetchLastProcessedBlock,
//     lastProcessedBlock,
//     processedTransactions,
//     notifications,
//   ]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p
//               className="text-gray-400 text-sm"
//               dangerouslySetInnerHTML={{ __html: item.description }}
//             />
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//             {/* {item.userId && (
//               <p className="text-gray-500 text-xs">
//                 User ID: {item.userId.toString()}
//               </p>
//             )} */}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">
//             Loading notifications...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             Error loading notifications
//           </div>
//         ) : notifications.length > 0 ? (
//           notifications.map(renderNotificationItem)
//         ) : (
//           <div className="text-center text-gray-400">
//             No notifications available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

// ----------------- with same format between firestore and notification
// import { useState, useEffect, useCallback } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";
// import { useConfig, usePublicClient } from "wagmi";
// import { decodeEventLog, parseAbiItem } from "viem";
// import { db } from "../Config/firebaseConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { MdNotifications } from "react-icons/md";
// import {
//   updateNotifications,
//   resetNewNotifications,
//   setNotifications,
// } from "../redux/notificationSlice";
// import { formatUnits } from "viem";
// import { users } from "../Config/Contract-Methods";

// const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const MAX_NOTIFICATIONS = 100;

// // Helper function to validate Firestore data
// const validateFirestoreData = (data) => {
//   const validData = {};
//   for (const [key, value] of Object.entries(data)) {
//     if (value === undefined || value === null) {
//       validData[key] = "";
//     } else if (typeof value === "object" && !(value instanceof Date)) {
//       validData[key] = JSON.stringify(value);
//     } else {
//       validData[key] = value;
//     }
//   }
//   return validData;
// };

// function Notifications() {
//   const { notifications } = useSelector((state) => state.notifications);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
//   const [processedTransactions, setProcessedTransactions] = useState(new Set());
//   const dispatch = useDispatch();

//   const config = useConfig();
//   const publicClient = usePublicClient();

//   const logError = (context, error) => {
//     console.error(`[Notifications Error - ${context}]`, {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       details: error.details || "No additional details",
//     });
//   };

//   const formatAmount = (amount, decimals = 18) => {
//     try {
//       return formatUnits(amount, decimals);
//     } catch (error) {
//       console.error("Error formatting amount:", error);
//       return amount.toString();
//     }
//   };

//   const fetchUserIds = async (notifications) => {
//     try {
//       const userIdPromises = notifications.map(async (notification) => {
//         try {
//           console.log(
//             `Fetching user ID for address: ${notification.fromAddress}`
//           );
//           const userDetails = await users(notification.fromAddress);
//           const userId = userDetails[1]?.toString() || "Unknown User";

//           console.log(
//             `User details for ${notification.fromAddress}:`,
//             userDetails
//           );
//           console.log(`Extracted User ID: ${userDetails[1]}`);

//           return {
//             ...notification,
//             userId: userId,
//           };
//         } catch (error) {
//           console.error(
//             `Error fetching user ID for ${notification.fromAddress}:`,
//             error
//           );
//           return {
//             ...notification,
//             userId: "Unknown User",
//           };
//         }
//       });

//       const notificationsWithUserIds = await Promise.all(userIdPromises);

//       return notificationsWithUserIds;
//     } catch (error) {
//       console.error("Error in fetchUserIds:", error);
//       return notifications;
//     }
//   };

//   const checkTransactionExists = async (transactionHash) => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         where("transactionHash", "==", transactionHash)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       logError("Check Transaction Exists", error);
//       return false;
//     }
//   };

//   const fetchLastProcessedBlock = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("blockNumber", "desc"),
//         limit(1)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const lastDoc = querySnapshot.docs[0];
//         return lastDoc.data().blockNumber;
//       }
//       return null;
//     } catch (error) {
//       logError("Fetch Last Processed Block", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(resetNewNotifications());

//     const fetchContractEvents = async () => {
//       try {
//         const fundsDistributedEvent = parseAbiItem(
//           "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
//         );

//         const latestBlock = await publicClient.getBlockNumber();
//         const startBlock = lastProcessedBlock
//           ? BigInt(lastProcessedBlock) + 1n
//           : latestBlock - 1000n;
//         const safeStartBlock =
//           startBlock > latestBlock ? latestBlock : startBlock;

//         // Get logs
//         const logs = await publicClient.getLogs({
//           address: CONTRACT_ADDRESS,
//           event: fundsDistributedEvent,
//           fromBlock: safeStartBlock,
//           toBlock: latestBlock,
//         });

//         // Process logs in chronological order
//         const newNotifications = [];
//         const newProcessedTransactions = new Set(processedTransactions);

//         for (const log of logs) {
//           try {
//             // Skip if already processed
//             if (newProcessedTransactions.has(log.transactionHash)) {
//               continue;
//             }

//             const decodedLog = decodeEventLog({
//               abi: [fundsDistributedEvent],
//               ...log,
//             });

//             if (!decodedLog?.args) {
//               console.error("Invalid decoded log:", log);
//               continue;
//             }

//             // Validate required fields
//             if (
//               !log.transactionHash ||
//               !decodedLog.args.from ||
//               !decodedLog.args.to
//             ) {
//               console.error("Missing required fields in log:", log);
//               continue;
//             }

//             const transactionAlreadyExists = await checkTransactionExists(
//               log.transactionHash
//             );
//             if (transactionAlreadyExists) {
//               console.log(
//                 `Transaction ${log.transactionHash} already exists in Firestore`
//               );
//               newProcessedTransactions.add(log.transactionHash);
//               continue;
//             }

//             // Destructure with proper checks
//             const { from, to, matrix, level, amount } = decodedLog.args;
//             const amountStr = formatAmount(amount);

//             const levelStr = level?.toString() || "0";
//             const matrixStr = matrix?.toString() || "0";

//             // Format addresses for display
//             const formatAddress = (addr) => {
//               if (!addr || typeof addr !== "string") return "Unknown";
//               return `${addr.substring(0, 6)}...${addr.substring(
//                 addr.length - 4
//               )}`;
//             };

//             // Prepare Firestore data with consistent heading and description
//             const firestoreData = validateFirestoreData({
//               heading: `+ ${amountStr} USDT received`, // Changed to match initial display
//               message: `Funds distributed: ${amountStr} from ${formatAddress(
//                 from
//               )} to ${formatAddress(to)}`,

//               time: new Date(),
//               action: null,
//               blockNumber: Number(log.blockNumber),
//               transactionHash: log.transactionHash,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               matrix: matrixStr,
//               level: levelStr,
//             });

//             // Save to Firestore
//             try {
//               await addDoc(collection(db, "alerts"), firestoreData);
//             } catch (firestoreError) {
//               logError("Firestore Save Operation", firestoreError);
//               continue;
//             }

//             // Add to local state
//             newNotifications.push({
//               id: `${log.transactionHash}-${log.logIndex}`,
//               title: `+ ${amountStr} USDT received`,
//               description: `Loading user details...`,
//               time: new Date().toLocaleString(),
//               hasAction: false,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               level: levelStr,
//               matrix: matrixStr,
//             });

//             newProcessedTransactions.add(log.transactionHash);
//           } catch (error) {
//             logError("Log processing error", error);
//           }
//         }

//         // Update states
//         if (newNotifications.length > 0) {
//           // Fetch user IDs for the new notifications
//           const notificationsWithUserIds = await fetchUserIds(newNotifications);

//           // Combine with existing notifications and limit
//           const updatedNotifications = notificationsWithUserIds.map(
//             (notification) => ({
//               ...notification,
//               description: `From user ${notification.userId}: <strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong>`,
//             })
//           );
//           const combinedNotifications = [
//             ...updatedNotifications,
//             ...notifications,
//           ].slice(0, MAX_NOTIFICATIONS);

//           // Dispatch to update notifications in Redux store
//           dispatch(setNotifications({ notifications: combinedNotifications }));
//           dispatch(
//             updateNotifications({
//               totalNotifications: combinedNotifications.length,
//               notifications: combinedNotifications,
//             })
//           );

//           setLastProcessedBlock(Number(latestBlock));
//           setProcessedTransactions(newProcessedTransactions);
//         }

//         setLoading(false);
//       } catch (error) {
//         logError("Fetch Contract Events", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Initialize and set interval
//     let isMounted = true;
//     let intervalId;

//     const initialize = async () => {
//       try {
//         const lastBlock = await fetchLastProcessedBlock();
//         if (isMounted && lastBlock) {
//           setLastProcessedBlock(lastBlock);
//         }
//         await fetchContractEvents();

//         // Only set interval after initial fetch
//         intervalId = setInterval(async () => {
//           if (isMounted) {
//             try {
//               await fetchContractEvents();
//             } catch (error) {
//               logError("Interval Fetch Error", error);
//             }
//           }
//         }, 30000);
//       } catch (error) {
//         logError("Initialization Error", error);
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, [
//     dispatch,
//     publicClient,
//     fetchLastProcessedBlock,
//     lastProcessedBlock,
//     processedTransactions,
//     notifications,
//   ]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p
//               className="text-gray-400 text-sm"
//               dangerouslySetInnerHTML={{ __html: item.description }}
//             />
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">
//             Loading notifications...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             Error loading notifications
//           </div>
//         ) : notifications.length > 0 ? (
//           notifications.map(renderNotificationItem)
//         ) : (
//           <div className="text-center text-gray-400">
//             No notifications available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

// ---------------------------------TILL HERE SAME FORMAT OF DESCRIPTION... (TESTING PENDING)--------------------------
// import { useState, useEffect, useCallback } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";
// import { useConfig, usePublicClient } from "wagmi";
// import { decodeEventLog, parseAbiItem } from "viem";
// import { db } from "../Config/firebaseConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { MdNotifications } from "react-icons/md";
// import {
//   updateNotifications,
//   resetNewNotifications,
//   setNotifications,
// } from "../redux/notificationSlice";
// import { formatUnits } from "viem";
// import { users } from "../Config/Contract-Methods";

// const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const MAX_NOTIFICATIONS = 100;

// // Helper function to validate Firestore data
// const validateFirestoreData = (data) => {
//   const validData = {};
//   for (const [key, value] of Object.entries(data)) {
//     if (value === undefined || value === null) {
//       validData[key] = "";
//     } else if (typeof value === "object" && !(value instanceof Date)) {
//       validData[key] = JSON.stringify(value);
//     } else {
//       validData[key] = value;
//     }
//   }
//   return validData;
// };

// function Notifications() {
//   const { notifications } = useSelector((state) => state.notifications);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
//   const [processedTransactions, setProcessedTransactions] = useState(new Set());
//   const dispatch = useDispatch();

//   const config = useConfig();
//   const publicClient = usePublicClient();

//   const logError = (context, error) => {
//     console.error(`[Notifications Error - ${context}]`, {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       details: error.details || "No additional details",
//     });
//   };

//   const formatAmount = (amount, decimals = 18) => {
//     try {
//       return formatUnits(amount, decimals);
//     } catch (error) {
//       console.error("Error formatting amount:", error);
//       return amount.toString();
//     }
//   };

//   const fetchUserIds = async (notifications) => {
//     try {
//       const userIdPromises = notifications.map(async (notification) => {
//         try {
//           const userDetails = await users(notification.fromAddress);
//           const userId = userDetails[1]?.toString() || "Unknown User";

//           return {
//             ...notification,
//             userId: userId,
//           };
//         } catch (error) {
//           console.error(
//             `Error fetching user ID for ${notification.fromAddress}:`,
//             error
//           );
//           return {
//             ...notification,
//             userId: "Unknown User",
//           };
//         }
//       });

//       return await Promise.all(userIdPromises);
//     } catch (error) {
//       console.error("Error in fetchUserIds:", error);
//       return notifications;
//     }
//   };

//   const checkTransactionExists = async (transactionHash) => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         where("transactionHash", "==", transactionHash)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       logError("Check Transaction Exists", error);
//       return false;
//     }
//   };

//   const fetchLastProcessedBlock = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("blockNumber", "desc"),
//         limit(1)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const lastDoc = querySnapshot.docs[0];
//         return lastDoc.data().blockNumber;
//       }
//       return null;
//     } catch (error) {
//       logError("Fetch Last Processed Block", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(resetNewNotifications());

//     const fetchContractEvents = async () => {
//       try {
//         const fundsDistributedEvent = parseAbiItem(
//           "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
//         );

//         const latestBlock = await publicClient.getBlockNumber();
//         const startBlock = lastProcessedBlock
//           ? BigInt(lastProcessedBlock) + 1n
//           : latestBlock - 1000n;
//         const safeStartBlock =
//           startBlock > latestBlock ? latestBlock : startBlock;

//         // Get logs
//         const logs = await publicClient.getLogs({
//           address: CONTRACT_ADDRESS,
//           event: fundsDistributedEvent,
//           fromBlock: safeStartBlock,
//           toBlock: latestBlock,
//         });

//         // Process logs in chronological order
//         const newNotifications = [];
//         const newProcessedTransactions = new Set(processedTransactions);

//         for (const log of logs) {
//           try {
//             // Skip if already processed
//             if (newProcessedTransactions.has(log.transactionHash)) {
//               continue;
//             }

//             const decodedLog = decodeEventLog({
//               abi: [fundsDistributedEvent],
//               ...log,
//             });

//             if (!decodedLog?.args) {
//               console.error("Invalid decoded log:", log);
//               continue;
//             }

//             // Validate required fields
//             if (
//               !log.transactionHash ||
//               !decodedLog.args.from ||
//               !decodedLog.args.to
//             ) {
//               console.error("Missing required fields in log:", log);
//               continue;
//             }

//             const transactionAlreadyExists = await checkTransactionExists(
//               log.transactionHash
//             );
//             if (transactionAlreadyExists) {
//               console.log(
//                 `Transaction ${log.transactionHash} already exists in Firestore`
//               );
//               newProcessedTransactions.add(log.transactionHash);
//               continue;
//             }

//             // Destructure with proper checks
//             const { from, to, matrix, level, amount } = decodedLog.args;
//             const amountStr = formatAmount(amount);

//             const levelStr = level?.toString() || "0";
//             const matrixStr = matrix?.toString() || "0";

//             // Format addresses for display
//             const formatAddress = (addr) => {
//               if (!addr || typeof addr !== "string") return "Unknown";
//               return `${addr.substring(0, 6)}...${addr.substring(
//                 addr.length - 4
//               )}`;
//             };

//             // Prepare new notification
//             newNotifications.push({
//               id: `${log.transactionHash}-${log.logIndex}`,
//               title: `+ ${amountStr} USDT received`,
//               description: `Loading user details...`,
//               time: new Date().toLocaleString(),
//               hasAction: false,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               level: levelStr,
//               matrix: matrixStr,
//             });

//             newProcessedTransactions.add(log.transactionHash);
//           } catch (error) {
//             logError("Log processing error", error);
//           }
//         }

//         // Update states
//         if (newNotifications.length > 0) {
//           // Fetch user IDs for the new notifications
//           const notificationsWithUserIds = await fetchUserIds(newNotifications);

//           // Save notifications to Firestore with user details
//           for (const notification of notificationsWithUserIds) {
//             const firestoreData = validateFirestoreData({
//               heading: `+ ${notification.amount} USDT received`,
//               message: `<strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong> From user ${notification.userId} Congratulations!`,
//               time: new Date(),
//               action: null,
//               blockNumber: Number(log.blockNumber),
//               transactionHash: log.transactionHash,
//               fromAddress: notification.fromAddress,
//               toAddress: notification.toAddress,
//               amount: notification.amount,
//               matrix: notification.matrix,
//               level: notification.level,
//             });

//             // Save to Firestore
//             try {
//               await addDoc(collection(db, "alerts"), firestoreData);
//             } catch (firestoreError) {
//               logError("Firestore Save Operation", firestoreError);
//               continue;
//             }
//           }

//           // Update notifications with user details
//           const updatedNotifications = notificationsWithUserIds.map(
//             (notification) => ({
//               ...notification,
//               // description: `From user ${notification.userId}: <strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong>`,
//               description: `<strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong> From user ${notification.userId} Congratulations!`,
//             })
//           );
//           const combinedNotifications = [
//             ...updatedNotifications,
//             ...notifications,
//           ].slice(0, MAX_NOTIFICATIONS);

//           // Dispatch to update notifications in Redux store
//           dispatch(setNotifications({ notifications: combinedNotifications }));
//           dispatch(
//             updateNotifications({
//               totalNotifications: combinedNotifications.length,
//               notifications: combinedNotifications,
//             })
//           );

//           setLastProcessedBlock(Number(latestBlock));
//           setProcessedTransactions(newProcessedTransactions);
//         }

//         setLoading(false);
//       } catch (error) {
//         logError("Fetch Contract Events", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Initialize and set interval
//     let isMounted = true;
//     let intervalId;

//     const initialize = async () => {
//       try {
//         const lastBlock = await fetchLastProcessedBlock();
//         if (isMounted && lastBlock) {
//           setLastProcessedBlock(lastBlock);
//         }
//         await fetchContractEvents();

//         // Only set interval after initial fetch
//         intervalId = setInterval(async () => {
//           if (isMounted) {
//             try {
//               await fetchContractEvents();
//             } catch (error) {
//               logError("Interval Fetch Error", error);
//             }
//           }
//         }, 30000);
//       } catch (error) {
//         logError("Initialization Error", error);
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, [
//     dispatch,
//     publicClient,
//     fetchLastProcessedBlock,
//     lastProcessedBlock,
//     processedTransactions,
//     notifications,
//   ]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p
//               className="text-gray-400 text-sm"
//               dangerouslySetInnerHTML={{ __html: item.description }}
//             />
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">
//             Loading notifications...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             Error loading notifications
//           </div>
//         ) : notifications.length > 0 ? (
//           notifications.map(renderNotificationItem)
//         ) : (
//           <div className="text-center text-gray-400">
//             No notifications available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

// -------------------- this is testing without redux
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   limit,
//   getDocs,
//   where,
// } from "firebase/firestore";
// import { useConfig, usePublicClient } from "wagmi";
// import { decodeEventLog, parseAbiItem } from "viem";
// import { db } from "../Config/firebaseConfig";
// import { MdNotifications } from "react-icons/md";
// import { formatUnits } from "viem";
// import { users } from "../Config/Contract-Methods";

// const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const MAX_NOTIFICATIONS = 100;

// // Helper function to validate Firestore data
// const validateFirestoreData = (data) => {
//   const validData = {};
//   for (const [key, value] of Object.entries(data)) {
//     if (value === undefined || value === null) {
//       validData[key] = "";
//     } else if (typeof value === "object" && !(value instanceof Date)) {
//       validData[key] = JSON.stringify(value);
//     } else {
//       validData[key] = value;
//     }
//   }
//   return validData;
// };

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
//   const [processedTransactions, setProcessedTransactions] = useState(new Set());

//   const config = useConfig();
//   const publicClient = usePublicClient();

//   const logError = (context, error) => {
//     console.error(`[Notifications Error - ${context}]`, {
//       message: error.message,
//       name: error.name,
//       stack: error.stack,
//       details: error.details || "No additional details",
//     });
//   };

//   const formatAmount = (amount, decimals = 18) => {
//     try {
//       return formatUnits(amount, decimals);
//     } catch (error) {
//       console.error("Error formatting amount:", error);
//       return amount.toString();
//     }
//   };

//   const fetchUserIds = async (notifications) => {
//     try {
//       const userIdPromises = notifications.map(async (notification) => {
//         try {
//           const userDetails = await users(notification.fromAddress);
//           const userId = userDetails[1]?.toString() || "Unknown User";

//           return {
//             ...notification,
//             userId: userId,
//           };
//         } catch (error) {
//           console.error(
//             `Error fetching user ID for ${notification.fromAddress}:`,
//             error
//           );
//           return {
//             ...notification,
//             userId: "Unknown User",
//           };
//         }
//       });

//       return await Promise.all(userIdPromises);
//     } catch (error) {
//       console.error("Error in fetchUserIds:", error);
//       return notifications;
//     }
//   };

//   const checkTransactionExists = async (transactionHash) => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         where("transactionHash", "==", transactionHash)
//       );
//       const querySnapshot = await getDocs(q);
//       return !querySnapshot.empty;
//     } catch (error) {
//       logError("Check Transaction Exists", error);
//       return false;
//     }
//   };

//   const fetchLastProcessedBlock = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("blockNumber", "desc"),
//         limit(1)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const lastDoc = querySnapshot.docs[0];
//         return lastDoc.data().blockNumber;
//       }
//       return null;
//     } catch (error) {
//       logError("Fetch Last Processed Block", error);
//       return null;
//     }
//   }, []);

//   // Fetch existing notifications from Firestore
//   const fetchExistingNotifications = useCallback(async () => {
//     try {
//       const q = query(
//         collection(db, "alerts"),
//         orderBy("time", "desc"),
//         limit(MAX_NOTIFICATIONS)
//       );
//       const querySnapshot = await getDocs(q);

//       const existingNotifications = querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//           id: doc.id,
//           title: data.heading || "Notification",
//           description: data.message || "",
//           time:
//             data.time?.toDate()?.toLocaleString() ||
//             new Date().toLocaleString(),
//           fromAddress: data.fromAddress,
//           toAddress: data.toAddress,
//           amount: data.amount,
//           level: data.level,
//           matrix: data.matrix,
//         };
//       });

//       setNotifications(existingNotifications);
//       return existingNotifications;
//     } catch (error) {
//       logError("Fetch Existing Notifications", error);
//       return [];
//     }
//   }, []);

//   useEffect(() => {
//     const fetchContractEvents = async () => {
//       try {
//         const fundsDistributedEvent = parseAbiItem(
//           "event FundsDistributed(address indexed from, address indexed to, uint8 matrix, uint256 level, uint256 amount)"
//         );

//         const latestBlock = await publicClient.getBlockNumber();
//         const startBlock = lastProcessedBlock
//           ? BigInt(lastProcessedBlock) + 1n
//           : latestBlock - 1000n;
//         const safeStartBlock =
//           startBlock > latestBlock ? latestBlock : startBlock;

//         // Get logs
//         const logs = await publicClient.getLogs({
//           address: CONTRACT_ADDRESS,
//           event: fundsDistributedEvent,
//           fromBlock: safeStartBlock,
//           toBlock: latestBlock,
//         });

//         // Process logs in chronological order
//         const newNotifications = [];
//         const newProcessedTransactions = new Set(processedTransactions);

//         for (const log of logs) {
//           try {
//             // Skip if already processed
//             if (newProcessedTransactions.has(log.transactionHash)) {
//               continue;
//             }

//             const decodedLog = decodeEventLog({
//               abi: [fundsDistributedEvent],
//               ...log,
//             });

//             if (!decodedLog?.args) {
//               console.error("Invalid decoded log:", log);
//               continue;
//             }

//             // Validate required fields
//             if (
//               !log.transactionHash ||
//               !decodedLog.args.from ||
//               !decodedLog.args.to
//             ) {
//               console.error("Missing required fields in log:", log);
//               continue;
//             }

//             const transactionAlreadyExists = await checkTransactionExists(
//               log.transactionHash
//             );
//             if (transactionAlreadyExists) {
//               console.log(
//                 `Transaction ${log.transactionHash} already exists in Firestore`
//               );
//               newProcessedTransactions.add(log.transactionHash);
//               continue;
//             }

//             // Destructure with proper checks
//             const { from, to, matrix, level, amount } = decodedLog.args;
//             const amountStr = formatAmount(amount);

//             const levelStr = level?.toString() || "0";
//             const matrixStr = matrix?.toString() || "0";

//             // Prepare new notification
//             newNotifications.push({
//               id: `${log.transactionHash}-${log.logIndex}`,
//               title: `+ ${amountStr} USDT received`,
//               description: `Loading user details...`,
//               time: new Date().toLocaleString(),
//               hasAction: false,
//               fromAddress: from,
//               toAddress: to,
//               amount: amountStr,
//               level: levelStr,
//               matrix: matrixStr,
//             });

//             newProcessedTransactions.add(log.transactionHash);
//           } catch (error) {
//             logError("Log processing error", error);
//           }
//         }

//         // Update states
//         if (newNotifications.length > 0) {
//           // Fetch user IDs for the new notifications
//           const notificationsWithUserIds = await fetchUserIds(newNotifications);

//           // Save notifications to Firestore with user details
//           for (const notification of notificationsWithUserIds) {
//             const firestoreData = validateFirestoreData({
//               heading: `+ ${notification.amount} USDT received`,
//               message: `<strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong> From user ${notification.userId} Congratulations!`,
//               time: new Date(),
//               action: null,
//               blockNumber: Number(log.blockNumber),
//               transactionHash: log.transactionHash,
//               fromAddress: notification.fromAddress,
//               toAddress: notification.toAddress,
//               amount: notification.amount,
//               matrix: notification.matrix,
//               level: notification.level,
//             });

//             // Save to Firestore
//             try {
//               await addDoc(collection(db, "alerts"), firestoreData);
//             } catch (firestoreError) {
//               logError("Firestore Save Operation", firestoreError);
//               continue;
//             }
//           }

//           // Update notifications with user details
//           const updatedNotifications = notificationsWithUserIds.map(
//             (notification) => ({
//               ...notification,
//               description: `<strong>Program</strong> x${notification.matrix}, <strong>level ${notification.level}</strong> From user ${notification.userId} Congratulations!`,
//             })
//           );

//           // Combine and limit notifications
//           const combinedNotifications = [
//             ...updatedNotifications,
//             ...notifications,
//           ].slice(0, MAX_NOTIFICATIONS);

//           // Update state
//           setNotifications(combinedNotifications);
//           setLastProcessedBlock(Number(latestBlock));
//           setProcessedTransactions(newProcessedTransactions);
//         }

//         setLoading(false);
//       } catch (error) {
//         logError("Fetch Contract Events", error);
//         setError(error);
//         setLoading(false);
//       }
//     };

//     // Initialize and set interval
//     let isMounted = true;
//     let intervalId;

//     const initialize = async () => {
//       try {
//         // First, fetch existing notifications from Firestore
//         await fetchExistingNotifications();

//         const lastBlock = await fetchLastProcessedBlock();
//         if (isMounted && lastBlock) {
//           setLastProcessedBlock(lastBlock);
//         }
//         await fetchContractEvents();

//         // Only set interval after initial fetch
//         intervalId = setInterval(async () => {
//           if (isMounted) {
//             try {
//               await fetchContractEvents();
//             } catch (error) {
//               logError("Interval Fetch Error", error);
//             }
//           }
//         }, 30000);
//       } catch (error) {
//         logError("Initialization Error", error);
//       }
//     };

//     initialize();

//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, [
//     publicClient,
//     fetchLastProcessedBlock,
//     fetchExistingNotifications,
//     lastProcessedBlock,
//     processedTransactions,
//     notifications,
//   ]);

//   const renderNotificationItem = (item) => {
//     return (
//       <div
//         key={item.id}
//         className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
//       >
//         <div className="flex items-center space-x-3 w-full">
//           <div className="bg-green-600 p-2 rounded-full">
//             <MdNotifications className="w-5 h-5 text-white" />
//           </div>
//           <div className="flex-grow relative">
//             <div className="flex items-center">
//               <p className="text-white font-medium flex-grow">{item.title}</p>
//             </div>
//             <p
//               className="text-gray-400 text-sm"
//               dangerouslySetInnerHTML={{ __html: item.description }}
//             />
//             {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
//       <div className="w-full max-w-3xl">
//         <h1 className="text-white text-xl mb-6">Notifications</h1>

//         {loading ? (
//           <div className="text-center text-gray-400">
//             Loading notifications...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             Error loading notifications
//           </div>
//         ) : notifications.length > 0 ? (
//           notifications.map(renderNotificationItem)
//         ) : (
//           <div className="text-center text-gray-400">
//             No notifications available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

import React, { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { useAccount, useConfig, usePublicClient } from "wagmi";
import { decodeEventLog, parseAbiItem } from "viem";
import { db } from "../Config/firebaseConfig";
import { MdNotifications } from "react-icons/md";
import { formatUnits } from "viem";
import { users } from "../Config/Contract-Methods";

const CONTRACT_ADDRESS = "0xa0F4B186B5363e91A2ef9e58bF930b845Ad00BDe";
// const TARGET_ADDRESS = "0xB853412126499360Cb12b3118AefEee135D27227";
const MAX_NOTIFICATIONS = 100;

const validateFirestoreData = (data) => {
  const validData = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      validData[key] = "";
    } else if (typeof value === "object" && !(value instanceof Date)) {
      validData[key] = JSON.stringify(value);
    } else {
      validData[key] = value;
    }
  }
  return validData;
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastProcessedBlock, setLastProcessedBlock] = useState(null);
  const [processedTransactions, setProcessedTransactions] = useState(new Set());
  const { address } = useAccount()
  const TARGET_ADDRESS = address

  const renderNotificationItem = (item) => {
    return (
      <div
        key={item.id}
        className="bg-[#2C2C2C] rounded-lg p-4 flex items-center justify-between mb-3"
      >
        <div className="flex items-center space-x-3 w-full">
          <div className="bg-green-600 p-2 rounded-full">
            <MdNotifications className="w-5 h-5 text-white" />
          </div>
          <div className="flex-grow relative">
            <div className="flex items-center">
              <p className="text-white font-medium flex-grow">{item.title}</p>
            </div>
            <p
              className="text-gray-400 text-sm"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
            {item.time && <p className="text-gray-500 text-xs">{item.time}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 min-h-screen p-4 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-white text-xl mb-6">Notifications</h1>

        {loading ? (
          <div className="text-center text-gray-400">
            Loading notifications...
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            Error loading notifications
          </div>
        ) : notifications.length > 0 ? (
          notifications.map(renderNotificationItem)
        ) : (
          <div className="text-center text-gray-400">
            No notifications available
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
