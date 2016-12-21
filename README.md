# Sono-Bot

## Dev deployment

Since people were starting to ask - here's how you can start the current version of the bot (until I create the dashboard there is really not much to do, but if you ask anyways...)

## THIS WILL ALL BE SIMPLIFIED INTO ONE OPERATION IN PRODUCTION

Now that we have this out of the way

### Node + packages

First, you'll need to install nodejs (the LTS version)

Go [here](https://nodejs.org/en/download/) to do that

NodeJS comes with it's own package manager (called NPM), everything else now will be done with that.

Clone the repo into any folder, open the terminal (console) inside

Now we will install all the dependencies we need

```
npm install
```

### Gulp

After it was all installed, you'll need to install gulp, to build everything we need

```
npm install -g gulp-cli
```

### MongoDB

Afterwards we'll need MongoDB, you can grab the installer [here](https://www.mongodb.com/download-center?jmp=nav#community)

When that's done, you'll want to launch mongo in a separate terminal (console)

```
mongod --dbapth <any path>
```

Replace the `<any path>` with a path you want your DB to be stored in

### Twitch auth

And last, but not least - you'll need the required credentials for twitch client to connect.

[Go here](https://www.twitch.tv/kraken/oauth2/clients/new) (on your main account)

Give your app any name you want, in the `Redirect URI` put `localhost`

And choose `Chat Bot` for category

Twitch will give you the `Client ID` which you'll have to put into the respective field inside `credentials.json` (in the project's root)

At last - create a new user for your bot to use, log in, and go [here](http://twitchapps.com/tmi/) to get the oatuh token.
When you've done that, paste it into the fields of `identity` section inside `credentials.json` (don't worry, we're not tracking changes there and I'll soon move all this stuff to the DB), **NEVER COMMIT credentials.json with your data to PUBLIC REPOS**

Finally, put your channel's name (starting with #) into the `channels` array inside `credentials.json`, you can use any channel for debigging, though.

### Launching the bot

Now that you have all of that running, build your UI

```
gulp build
```

And then start the server

```
npm run watch
```

If you're planning to tinker with ui, enable rebuilding by launching

```
gulp default
```

Instead of 

```
gulp build
```

## UI prototypes

### Design

#### Splash

![splash](http://i.imgur.com/FWhlo1X.png)

#### Dashboard

![dashboard](http://i.imgur.com/RONuN0L.png)

#### Settings

![settings](http://i.imgur.com/IbjRCMu.png)

#### Notification example

![notifications](http://i.imgur.com/eoxLblo.png)

### Animations

### Topbar signature-block prototypes (codepen)

[Loading animation](http://codepen.io/orels/pen/ZBwpaW)

![Notification animation](http://i.imgur.com/CF9UP58.gif)

Source: http://codepen.io/orels/pen/BQMLgB
