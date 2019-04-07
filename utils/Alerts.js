import { Permissions, Notifications } from 'expo'

export default class Alerts {

  async scheduleAlert(alertTime) {
    await this._requestPermissionToNotifyUser()
    await this._scheduleLocalNotification(alertTime)
  }

  async cancelScheduledAlerts() {
    console.log("Cancelling scheduled notifications")
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  async _requestPermissionToNotifyUser() {
    this._notification = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }

  async _scheduleLocalNotification(alertTime) {
    if(this._notification.status === 'granted'){
      console.log("Scheduling notifications")
      this._notificationId = await Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Parking Ticket Imminent',
          body:  'You have 15 minutes to move your car before you may be ticketed',
          ios:   {
            sound: true
          }
        }, // LocalNotification
        {
          time: new Date().getTime() + 10000 // SHOULD BE "alertTime"
        } // schedulingOptions
      )
    } else {
      alert('You will need to allow notifications for this app')
    }
  }
}
