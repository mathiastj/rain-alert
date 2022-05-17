# rain-alert

Send a push notification if it's going to rain near Copenhagen.

Uses GitHub actions to run the check twice an hour, only in the afternoon and only on weekdays.
Only sends one notification per day.
The action is [here](./github/workflows/daily-rain-alert).

The action does the following:
- Switches branch to my 'state' branch
- Check if it has already notified on the current day. This is done by checking whether a file exists with today's name on the `did-run` branch in the `alerts` folder. The [following](./bin/check-file-exists) bash script is used for this. It returns a non-zero exit code if the file exists, such that the action does not proceed to the next step.
- Then the code for checking whether it's going to rain is run. This is a puppeteer script, so it first installs npm dependencies.
- The puppeteer script is run as a test which fails if it's not going to rain. This makes sure the action does not progress further. 
- The puppeteer script [itself](./src/rain-checker.test.ts) opens the DMI radar page: https://www.dmi.dk/radar/. Moves the progress bar as much as possible into the future, then checks a single pixel color around Copenhagen. If it's not completely white, there is going to come some kind of downpour. In that case the test succeeds and the action processes to the next step.
- A state file for the day is then created and added to the `did-run` branch, to make sure it's not run again for the day.
- Then [Techulus](https://push.techulus.com/) is used to send a push notification.
