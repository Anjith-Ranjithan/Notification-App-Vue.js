import * as signalR from '@microsoft/signalr';
import { reactive } from 'vue';

const eventBus = reactive({});

class SignalRService {
  constructor() {
    this.connection = null;
    this.notificationCount = 0;
  }

  async startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl('https://notification-api-437177769978.asia-south1.run.app/hub')
    .build();

    this.connection.on('ReceiveNotification', (message) => {
      this.notificationCount += 1;
      if (eventBus.notificationReceived) {
        eventBus.notificationReceived(message, this.notificationCount);
      }
    });

    try {
      await this.connection.start();
      console.log('SignalR Connected.');
    } catch (err) {
      console.error('Error while starting connection: ', err);
    }
  }

  onNotificationReceived(callback) {
    eventBus.notificationReceived = callback;
  }

  getNotificationCount() {
    return this.notificationCount;
  }

  resetNotificationCount() {
    this.notificationCount = 0;
  }
}

export default new SignalRService();
