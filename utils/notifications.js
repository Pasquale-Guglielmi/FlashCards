import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCADS_NOTIFICATIONS_KEY = 'FlashCards:notifications'

function createNotification() {
    return {
        title: 'Have your daily Quiz!',
        body: "Don't forget to study today! Let's have a quiz!!!",
        ios: {
            sound: true,
        },
        android: {
            sound: false,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
    }
}

export function clearNotifications() {
    return AsyncStorage.removeItem(FLASHCADS_NOTIFICATIONS_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setNotification() {
    AsyncStorage.getItem(FLASHCADS_NOTIFICATIONS_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if(status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(8)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'minute',
                                }
                            )

                            AsyncStorage.setItem(FLASHCADS_NOTIFICATIONS_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}