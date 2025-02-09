# readwise-to-raindrop
Dedicated to users who use Readwise Reader and find it expensive.

## Usage
I may not upload it to JSR since I was able to get it working in my local environment.

``` sh
gh clone windchime-yk/readwise-to-raindrop
deno task dev --csv="assets/readwise/export.csv" --ignoreFeed
```

## CSV specifications of each service
### Readwise export CSV
``` csv
Title,URL,ID,Document tags,Saved date,Reading progress,Location,Seen
Article Title,https://example.com,['example'],2022-11-06 04:33:50+00:00,0,new,True
```

### Raindrop import CSV
``` csv
title,url,tags,highlights,created,cover
"article title","https://example.com","tag1,tag2","highlight\nhighlight","2025-02-09","https://example.com/cover.png"
```
