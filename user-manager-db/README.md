# User Manager DB
User Manager DB supports Node.js v8


## Install
SSH
``` sh
git clone git@github.com:glopezep/user-manager-db.git

```
or HTTP
``` sh
git clone https://github.com/glopezep/user-manager-db.git

```

<!-- ```
npm install user-manager-db --save
```
Or
```
yarn add user-manager-db
``` -->

## Config
In the config.js file you can set the default configuration.

``` sh
export DB_NAME='database_name' # database name
export DB_USER='database_user' # database user
export DB_PASS='1234' # database user password
export DB_HOST='localhost' # database host
export DB_DIALECT='mysql' # (mysql, postgres)
export DB_PORT='5432' #Only for postgres

```


## Usage
All functions can be handled as promises or callbacks.

``` js
var UserManagerDB = require('user-manager-db');
var db = new UserManagerDB();

db.saveUser(userToSave).then(user => {
  // do something with user
}).catch(err => {
  // do something with err
})

db.saveUser(userToSave, (err, user) => {
  // do something with user or err
})
```

## API
  - db.saveUser
  - db.getUser
  - db.getUsers
  - db.getUsersByGroup
  - db.updateUser
  - db.deleteUser

#### db.saveUser(user)
Receives the user to save and returns it, can be handled as callback or promise.

  - `user` _(Object)_
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id

  - **Returns** `User`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details



```js
db.saveUser(userToSave).then(user => {
  // do something with user
}).catch(err => {
  // do something with err
})

db.saveUser(userToSave, (err, user) => {
  // do something with user or err
})
```

#### db.getUser(username)
Receives a username and return the user match, can be handled as callback or promise.

  - `username` _(String)_ user username

  - **Returns** `User`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details


```js
db.getUser(username).then(user => {
  // do something with user
}).catch(err => {
  // do something with err
})

db.getUser(username, (err, user) => {
  // do something with user or err
})
```

#### db.getUsers()
Return all users, can be handled as callback or promise.

  - **Returns** `[User] Array`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details


```js
db.getUsers().then(users => {
  // do something with users
}).catch(err => {
  // do something with err
})

db.getUsers((err, users) => {
  // do something with users or err
})
```

#### db.getUsersByGroup(groupdId)
Receive a groupdId and Return all users match, can be handled as callback or promise.

  - `groupdId` _(Number)_ group id

  - **Returns** `[User] Array`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details


```js
db.getUsersByGroup().then(users => {
  // do something with users
}).catch(err => {
  // do something with err
})

db.getUsersByGroup((err, users) => {
  // do something with users or err
})
```

#### db.updateUser(username, data)
Receives a username and new user data, update a user match. return the user updated, can be handled as callback or promise.

  - `username` _(String)_ user username
  - `data` _(Object)_ data
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details

  - **Returns** `User`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details


```js
db.updateUser(username, data).then(user => {
  // do something with user
}).catch(err => {
  // do something with err
})

db.updateUser(username, data, (err, user) => {
  // do something with user or err
})
```

#### db.deleteUser(username)
Receives a username, delete a user match and returns it, can be handled as callback or promise.

  - `username` _(String)_ user username

  - **Returns** `User`
    - `id` _(Number)_ user id
    - `name` _(String)_ user first name
    - `lastname` _(String)_ user last name
    - `username` _(String)_ user username
    - `password` _(String)_ user password
    - `email` _(String)_ user email
    - `avatar` _(String)_ user avatar
    - `groupId` _(Number)_ group id
    - `group` _(Object)_ group details


```js
db.deleteUser(username).then(user => {
  // do something with user
}).catch(err => {
  // do something with err
})

db.deleteUser(username, (err, user) => {
  // do something with user or err
})
```

## Testing
This run the ava tests
``` js
yarn test
```

## The MIT License (MIT)

Copyright (c) Guillermo Lopez 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
