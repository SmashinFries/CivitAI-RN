# CivitAI React Native
A silly little app that uses the CivitAI API. You could literally just install the civitai site as an app 🤷‍♂️. If you really really don't want the PWA app, then look no further.

## To-do
- [ ] Name change ~~and new icon~~
- [ ] Finish adding data
- [ ] View community images of a model
- [x] Model filtering (v0.0.5)
- [x] NSFW and Theme settings (v0.0.2)
- [x] Offline saves (images, models)

## Limitations
Compared to the official CivitAI site, their REST API is lacking. 
- Can't filter images with tags without knowing the tag ID. The tags endpoint doesn't return IDs so theres no way of knowing.
- Images endpoint doesnt return videos and can't be filtered by format.
- No authenticated actions (saving models/images).

## Future Plans
Basically, just adding any future CivitAI endpoints.
