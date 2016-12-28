---
title: Dashboard and topbar functionality
commits:
  - 40314b3c0569d10cbd4bfedb6fda77cc9d6c9d7e
  - f203f6aacf6fc4a2b69a5d96caf09eb33e5841bd
  - 02a0717179ba3acefa8706799133e20011a932d8
  - 6ef8e221708e33294313781c283a6c833e19a982
---
Finally the dashboard shows all the new followers, latest follower, stream status and duration as well as follower counts.

All the stats are currently updated every second, possibly will be lowered to ever 3 secs to lower ratelimiting possibilities (prob should be moved to a properly cron-controlled task lists).

Current preview

![s](http://i.imgur.com/AnDkk7e.png)

Next up:

- Bot status (in channel/mod)
- Bot actions (join/leave/deafen/mute)
- Settings page