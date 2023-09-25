# CivitAI in React Native
A silly little app that uses the CivitAI API. You could literally just install the civitai site as an app 🤷‍♂️.

## To-do
- [ ] Name change and new icon
- [ ] Finish adding data
- [ ] Model filtering
- [ ] Image filtering
- [ ] Creator pages
- [x] NSFW and Theme settings (v0.0.2)
- [ ] Offline saves (images, models)
- [ ] Add authentication?

## Limitations
Currently, the CivitAI REST API is limited.
- Can't filter images with tags without knowing the tag ID. The tags endpoint doesn't return IDs so theres no way of knowing.
- Images endpoint doesnt return videos and cant be filtered by format.
- No authentication.

## Future Plans
Basically, just adding any future CivitAI endpoints.

I think it would be cool to remotely download models to your PC using this app. This could be done through an auto1111 webui extension or a seperate server. If anyone knows of something like this or have any ideas, please let me know. 