# Reddit Comments dataset loader

Loaders for the reddit comments dataset. The dataset isn't included in this repo, you'll need to download it.

## Sources

https://www.reddit.com/r/datasets/comments/3bxlg7/i_have_every_publicly_available_reddit_comment/
http://academictorrents.com/details/7690f71ea949b868080401c749e878f98de34d3d

## Output Format

```js
// Topic
{
	"type": "topic",
	"node": "node-200",
	"name": "vi",
	"author": "bushwakko",
	"totalNumberEvents": 1
}

// User
{
  "type": "user",
  "name": "bostich",
  "node": "node-1",
  "events": [
    {
      "internalId": 0,
      "topic": "reddit.com",
      "body": "test",
      "ups": 1,
      "downs": 0,
      "controversiality": 0
    },
    {
      "internalId": 697,
      "topic": "reddit.com",
      "body": "oh i want to try",
      "ups": 1,
      "downs": 0,
      "controversiality": 0
    },
    {
      "internalId": 949,
      "topic": "reddit.com",
      "body": "I'll be honest, if I stay in this state after college (Pennsylvania), I'm sending my kid to a Catholic school.  It's not that the public schools here aren't that
 great (even tho around Philadelphia they really aren't that great), its just that I'd prefer my kid to be in a completely controlled environment, even if they teach something 
I don't fully agree with.  Plus even though it seems a lot of you hate religion, its actually a pretty cool thing to have.\n\nThat and they aren't my representatives =(",
      "ups": 0,
      "downs": 0,
      "controversiality": 0
    }
	],
  "subscriptions": {
  	"reddit.com": true,
  	"politics": true,
  	"business": true,
  	"programming": true,
  	"science": true,
  	"gaming": true,
  	"features": true,
  	"entertainment": true,
  	"ads": true,
  	"gadgets": true,
  	"sports": true,
  	"joel": true,
  	"nsfw": true
	}
}
```

## Thanks

A special thank you to the user [Stuck_In_the_Matrix](https://www.reddit.com/user/Stuck_In_the_Matrix/) for putting together the datasets used.
