[![Build Status](https://travis-ci.org/EyalRonel/asana-webhooks-manager.svg?branch=master)](https://travis-ci.org/EyalRonel/asana-webhooks-manager)
[![Coverage Status](https://coveralls.io/repos/github/EyalRonel/asana-webhooks-manager/badge.svg?branch=master&cdt=31033017-2237)](https://coveralls.io/github/EyalRonel/asana-webhooks-manager?branch=master)

# Asana Webhooks Manager and Event Handler (AWM)
AWM is an open-source, webhooks management and event handling server for [Asana](http://www.asana.com)  
Consider AWM as your starting point (and time saver) for creating your own real-time applications on top of Asana's webhooks machanism.  

![View workspaces and projects](public/img/documentation/manage_webhooks/manage_step1.jpg "View workspaces and projects")  
![Subscribe for real-time event notifications](public/img/documentation/manage_webhooks/manage_step3.jpg "Subscribe for real-time event notifications")  
![Subscribe for real-time event notifications](public/img/documentation/events/live_view.jpg "View incoming events in real-time")  

# Out-of-the-box support for:  
  - Asana login (OAuth)  
  - View, add and remove webhooks subcriptions for Projects accross all workspaces  
  - Receive and view incoming events payloads from Asana in real-time  
  
## Installation  

AWM requires [Node.js](https://nodejs.org/) v6.9+ to run.  
Download, extract and run the server  
```sh
$ cd asana-webhooks-manager
$ node server.js
```
