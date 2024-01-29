# yvrdoor

Discord bot that listens to an emoji reaction on a specific (gated) channel and opens the door.

This service is running on the door raspberry pi.

```
pm2 start index.js --name discord-bot
```

## To restart the service
1. ssh into into the raspberry pi
2. find the yvrdoor process `ps aux` and look for `node /home/pi/yvrdoor/index.js`
3. kill the process `kill <PID>`
4. PM2 should relaunch the service

## To look at logs
`pm2 log`
