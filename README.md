<h1 align="center">Welcome to contact-management 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D%2014.17.6-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D%206.14.15-blue.svg" />
  <a href="https://github.com/sarweshmaharjan/lf-contact-manager#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/sarweshmaharjan/lf-contact-manager/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/sarweshmaharjan/lf-contact-manager/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/sarweshmaharjan/contact-management" />
  </a>
</p>

> Simple CRUD application with Node js as backend and React js as frontend. Developed for further improving and solidifying knowledge learned during the session conducted by LeapFrog Technology.

## Table of Content
- [Table of Content](#table-of-content)
  - [🏠 Homepage](#-homepage)
- [Prerequisites](#prerequisites)
  - [MongoDB setup](#mongodb-setup)
  - [Firebase setup : Image Upload](#firebase-setup--image-upload)
- [Install](#install)
  - [Setting up database](#setting-up-database)
  - [Setting up private JWT string](#setting-up-private-jwt-string)
  - [Setting up Firebase Storage](#setting-up-firebase-storage)
  - [Initial setup after pull](#initial-setup-after-pull)
- [Usage](#usage)
- [Run tests](#run-tests)
- [Author](#author)
- [🤝 Contributing](#-contributing)
- [Show your support](#show-your-support)
- [📝 License](#-license)

### 🏠 [Homepage](https://github.com/sarweshmaharjan/lf-contact-manager#readme)

## Prerequisites

- node >= 14.17.6
- npm >= 6.14.15

### MongoDB setup

- [Go to MongoDB official website and Sign-in](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624584&adgroup=115749713703)
- Go to Network Access Page.
  - Click "Add IP Address"
  - [Get your IPv4 Public IP Address](https://whatismyipaddress.com/)
  - Copy and click "Confirm" to add it to mongodb network access.
- Go to Database Access Page.
  - Add new database user.
  - For simplicity you can choose username and password as "admin".
- Go to Database Page.
  - Click on "Build a Database"
  - Select "Shared" and click "Create"
  - Change Cluster name at the bottom if you want to and click "Create Cluster"
- Click on Browse Collections.
  - Click on "Add My Own Data".
  - Database name : contact-management and Collection name: contacts.
  - If you hover over your database name on the left-hand side. Beside it you will see "Add" sign. Click on it.
  - Add another collection with name: users.

### Firebase setup : Image Upload

- [Go to Firebase account and sign-in](https://firebase.google.com/)
- Go to Console Page.
- Click on "Create Project"
  - Write your project name: Contact Management and click "Continue"
  - Disable firebase analytics.
  - Once creation is done, click "Done"
  - Under "Get started by adding firebase to your app", click on "</>" icon.
  - Type your web app name: contact-management-storage
  - Copy that is similar to below.

      ```javascript
      const firebaseConfig = {
      apiKey: ".....",
      authDomain: "....",
      projectId: "....",
      storageBucket: "....",
      messagingSenderId: "....",
      appId: "...."

      };
      ```

  - Click on "Continue to console"
- Go to Storage Page.
  - Click on "Get Started"
  - Click "next", select storage location: if want to and click "done"
  - Go to "Rules" tab
  - Edit rule to following:
  
  ```javascript
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write;
      }
    }
  }
  ```

  - Remove ": if false" part from write.
  - NOTE: this is only for development environment and not to be done for production setup.
  
---

## Install

### Setting up database

- Copy the **.env.example** and paste it in backend with name: **.env**
- Go to Database Page and Click on connect.
  - Click "Connect your application".
  - Copy the string after (@) till .net example: **"\<name\>.\<uniqueid\>.mongodb.net"**
  - Set value of DB_API as the above string.
  - Set remaining DB information.

### Setting up private JWT string

- Go to **.env**
- Set JWT_Private_Key to anything string you like. Eg: "contact-management-202223021103"  

### Setting up Firebase Storage

- Go to **.env**
- Set F* key with the corresponding value of firebaseConfig.

### Initial setup after pull

```sh
# To install node_modules for backend, frontend, and root. 
npm run module:all 
```

---

## Usage

```sh
# To concurrently run: nodemon and react-script
npm run dev
```

---

## Run tests

```sh
# Not present
```

---

## Author

👤 **Sarwesh Maharjan**

- Website: <https://www.linkedin.com/in/sarweshmaharjan/>
- Github: [@sarweshmaharjan](https://github.com/sarweshmaharjan)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/sarweshmaharjan\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/in\/sarweshmaharjan\/)

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/sarweshmaharjan/lf-contact-manager/issues). You can also take a look at the [contributing guide](https://github.com/sarweshmaharjan/lf-contact-manager/blob/master/CONTRIBUTING.md).

---

## Show your support

Give a ⭐️ if this project helped you!

---

## 📝 License

Copyright © 2022 [Sarwesh Maharjan](https://github.com/sarweshmaharjan).
This project is [ISC](https://github.com/sarweshmaharjan/lf-contact-manager/blob/master/LICENSE) licensed.

---
