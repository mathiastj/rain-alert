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
