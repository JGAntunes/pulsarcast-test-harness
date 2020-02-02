#!/bin/bash

TOPICS[0]="reddit.com"
TOPICS[1]="politics"
TOPICS[2]="programming"
TOPICS[3]="science"
TOPICS[4]="gaming"
TOPICS[5]="nsfw"
TOPICS[6]="entertainment"
TOPICS[7]="business"
TOPICS[8]="sports"
TOPICS[9]="gadgets"
TOPICS[10]="bugs"
TOPICS[11]="netsec"
TOPICS[12]="tr"
TOPICS[13]="ads"
TOPICS[14]="features"
TOPICS[15]="de"
TOPICS[16]="joel"
TOPICS[17]="ru"
TOPICS[18]="freeculture"
TOPICS[19]="it"
TOPICS[20]="ja"
TOPICS[21]="eo"
TOPICS[22]="es"

evaluate()
{
  RESULTS=$1
  
  for topic in "${TOPICS[@]}"
  do
    eventCount=$(grep -c "Sent event to topic $topic" < "$RESULTS")
    failedCount=$(grep -c "Failed to publish event $topic" < "$RESULTS")
    echo "$topic: events - $eventCount | failedCount - $failedCount"
  done
  retries=$(grep -c "Retry" < "$RESULTS")
  echo "Total retries: $retries"
  echo "=============="

  for i in {1..100}
  do
    results=$(sort -u  < "$RESULTS"| grep "subscribed to")
    subscriptionsCount=$(echo "$results" | grep -c "node-$i subscribed to")
    echo "node-$i, $subscriptionsCount"
  done
}

evaluate "$1"
