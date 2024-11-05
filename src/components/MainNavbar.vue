<template>
  <nav class="navbar navbar-expand-sm navbar-light mainnavbar">
    <a class="navbar-brand">Notification App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link">Home<span class="sr-only"></span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link">Contact</a>
        </li>
        <li class="nav-item active">
          <div class="notification-icon" @click="handleClick">
            <div v-if="latestMessage" class="latest-message"><span style="color: red;">New &nbsp;</span>{{ latestMessage }}</div>
            <p class="notificationbar nav-link">Notification&nbsp;<i class="fas fa-bell" /></p>
            <span v-if="notificationCount > 0" class="badge">{{ notificationCount }}</span>
          </div>
        </li>
      </ul>
    </div>
  </nav>

  <div v-if="showDropdown && messages.length > 0" class="dropdown">
    <ul>
      <li>Click on Notification&nbsp;<p class="fas fa-bell" /> to close</li>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
  </div>

  <div class="maincontent">
    <h1 class="welcome">Welcome to Notification App</h1>
    <p class="content">This is an Vue js application Hosted in Google cloud!
      There is a <a class="api" href="https://notification-api-437177769978.asia-south1.run.app/api/notification">Web API</a>
      which is made of ASP.NET core web API using dot net core version 8 and also hosted on Google cloud using docker container.
      SignalR is used for realtime functionality.We can call the api by passing a string as message and at the time we will get a
      notification here in the application navbar.It shows the count of the messages received and also show the latest message as
      a popup.When click on the notification it shows all of the notifications and closes the latest notification popup.
      Once you had seen a notification, it will be removed at the time you closes the notification.</p>
  </div>

</template>

<script>
import signalRService from '../services/signalrService';

export default {
  data() {
    return {
      notificationCount: 0,
      latestMessage: '',
      messages: [],
      showDropdown: false,
      listenerInitialized: false,
    };
  },
  async mounted() {
    await this.initializeSignalR();
  },
  methods: {
    async initializeSignalR() {
      await signalRService.startConnection();

      if (!this.listenerInitialized) {
        signalRService.onNotificationReceived(this.handleNotification);
        this.listenerInitialized = true;
      }
    },
    handleNotification(message, count) {
      this.messages.push(message);
      if (!this.showDropdown) {
        this.notificationCount = count;
        this.latestMessage = message;
      }
    },
    handleClick() {
      if (!this.showDropdown) {
        this.notificationCount = 0;
        this.latestMessage = '';
      } else {
        this.messages = [];
        this.notificationCount = 0;
      }
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<style src="../css/styles.css"></style>
