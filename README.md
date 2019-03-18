# Nutshell: The Information Dashboard | REACT EDITION

Your clients were thrilled with the product of your first sprint on the Nutshell app. They've decided that this app could be the Next Big Thing, and they want you to rebuild the app using React for maximum scalability and performance. The features of the app will be exactly the same. This time, you'll start out with some boilerplate code. Once you've set up your team repo, everyone should clone down this repository. 

Before you begin, one person should make an `api` folder and a `database.json` file. *Make sure that your database file is in your .gitignore before you commit.*

Just to refresh your memory, here's an example of what your data structure might look like. 

### Users

```json
{ "id": 1, "username": "Steve", "email": "me@me.com" }
```

### Messages

```json
{ "id": 1, "userId": 1, "message": "What's up?" }
```

### News

```json
{
    "id": 1,
    "userId": 2,
    "url": "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/",
    "title": "Wormholes Allow Information to Escape Black Holes",
    "synopsis": "Check out this recent discovery about workholes"
}
```

### Friends

```json
{ "id": 1, "userId": 1, "otherFriendId": 3 }
```

### Tasks

```json
{ "id": 1, "userId": 3, "task": "Take out garbage" }
```

## Professional Requirements

1. Each teammate should build their own component structure for their feature. Once you hit MVP, you're welcome to refactor your app to use reusable components. 
1. The README for your project should include instructions on how another person can download and run the application

## How to Handle Authentication

You will be using session storage to keep track of which user has logged into Nutshell. When the user fills out the registration form, you will POST their username and password to the `users` collection in your API. You will then immediately take the `id` of the object in the response and save it to session storage.

```js
sessionStorage.setItem("activeUser", user.id)
```

If you want to add a Logout feature, all you need to do it remove the session storage item.

```js
sessionStorage.removeItem("activeUser")
```

## Stretch Goals
1. Private chat messages
1. Friend requests, and the ability to reject or accept them
1. Real time chat updates. If a user in one tab writes a chat message, a user logged in on another tab [will immediately see that chat message](https://www.w3schools.com/jsreF/event_storage_storagearea.asp)


