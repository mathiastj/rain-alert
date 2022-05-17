# Check if a file with todays date as filename exists in ./alerts, i.e. './alerts/2022-05-17'
# 'Fail' with a non-zero exit code if it exists
# Exit normally if it does not exist
PATH="./alerts/"
TODAY=$(/bin/date +"%Y-%m-%d")
TODAY_FILE="$PATH$TODAY"
if [ -f "$TODAY_FILE" ]; then
    echo "$TODAY_FILE exists."
    exit 1
else 
    echo "$TODAY_FILE does not exist."
    exit 0
fi
