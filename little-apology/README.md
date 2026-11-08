# A little website, a big apology

## Run it

```
npm install
npm run dev
```

Open the address it prints. `npm run build` makes a production build in `dist/`.

## Where things go

- All text and settings: `src/config/site.ts`
- Photos: `public/images/` (names must match the `file` fields in the config)
- Music: `public/audio/ambient.mp3`, or change `music.file` in the config. Leave the file out and the music button hides itself.
- Optional intro background photo: put it in `public/images/` and set `intro.image` in the config.

Anything in [square brackets] in the config is a placeholder for you to replace.

## Photos

The five `memory-0X.jpg` files are plain gradient placeholders. Replace them with your own photos using the same names, or change the `file` names in the config.

Each photo has a `size` in the config: `tall`, `square` or `wide`. The photo is cropped to that shape, so pick the size that suits the picture. The order in the config is the order on the page, left to right, then down. You can add or remove entries freely.

Run `npm run optimize-images` once after adding photos. It shrinks them to a web-friendly size and removes hidden data such as GPS location, which matters because the site will be public. Run it once only, since each run recompresses the files.

## Cards and timeline

`reasons.items` are the cards: each has a `title` shown on the front and a `message` revealed when it is tapped. Add or remove entries freely.

`timeline.items` are the memories, shown top to bottom in the order you write them. Each has a `date`, `title` and `description`. To add a photo, put it in `public/images/` and write its file name in `photo`, or leave `photo` empty.

## Questions, letter and ending

`questions` holds the four prompts and everything revealed by them. The last one has two equal buttons. `talkReply` and `timeReply` are what she sees after each choice, and nothing is saved or sent anywhere. Add a WhatsApp, SMS or phone link in `contactLink` (for example `https://wa.me/91XXXXXXXXXX`) to show a button after "Let's talk". Leave it empty for no button.

`letter` holds the greeting, the paragraphs and the sign-off. Each string in `body` is one paragraph. `ending` is the final screen.

## Status

Step 4 of 5: every section of the story is in. The last step is a mobile and accessibility pass, plus the GitHub and Vercel or Netlify deployment guide.
