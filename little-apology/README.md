# A little website, a big apology

A single-page website made for one person. It opens with a short intro, then an apology, your photos, things you love about her, your memories, a few questions, a letter in an envelope, and a closing message. Everything personal lives in one file, so you never need to touch the React code.

## What you need

- Node.js 20.19 or newer. Check with `node -v`. If it is older, install the LTS version from nodejs.org.
- A free GitHub account and a free Vercel account, to get a public link.
- Git installed on your computer (git-scm.com), for the GitHub step.

## Run it on your computer

Open a terminal inside the `little-apology` folder, the one that contains `package.json`, then run:

```
npm install
npm run dev
```

Open the address it prints, usually http://localhost:5173. Saving a file updates the page by itself.

## Make it yours

All text and settings are in `src/config/site.ts`. Anything in [square brackets] is a placeholder. When you think you are done, search that file for `[` to make sure none are left.

- **Names.** Fill in `names.her` and `names.me`. In any text, `{her}` and `{me}` turn into those names. The letter greeting and sign-off already use them.
- **Quotes.** Plain apostrophes and quotation marks turn into proper curly ones on screen, so type normally.
- **Other languages.** The fonts cover English and other Latin-script text. Gujarati, Hindi and other scripts display in the phone's default font, without the handwriting style in the letter.

### Photos

Put your photos in `public/images/`. The five `memory-0X.jpg` files that come with the project are gradient placeholders. Replace them with your own photos under the same names, or change the `file` names in `gallery.photos`.

Each photo has a `size`: `tall`, `square` or `wide`. The photo is cropped to that shape, so choose the one that suits the picture. Photos appear in the order of the list. Add or delete entries freely, 10 to 20 works well.

File names are case-sensitive on the web. `Memory-01.JPG` works on Windows but breaks once the site is online. Use lowercase names and make sure the config matches exactly.

For a photo on a timeline memory, put the file in `public/images/` and write its name in that memory's `photo` field. Leave it as `""` for none. The optional `intro.image` works the same way and shows faintly behind the intro text.

After adding photos, run this once:

```
npm run optimize-images
```

It shrinks them to a size that loads quickly on a phone and removes hidden data such as GPS location, which matters because the link will be public. Run it once only, since each run recompresses the files.

### Music

Put an mp3 at `public/audio/ambient.mp3`, or change `music.file` in the config. Use music you have the right to share. Music never starts by itself. She taps the button to play it. If the file is missing, the button hides itself.

### The questions

`questions` holds the four prompts and what each one reveals. The last prompt has two buttons that look and work the same. `talkReply` and `timeReply` are what she sees after each choice. Nothing she taps is saved or sent anywhere. To show a button that opens a chat after "Let's talk.", put a link in `contactLink`, for example `https://wa.me/91XXXXXXXXXX` for WhatsApp. Leave it empty for no button.

### Colors and fonts

Colors are at the top of `src/index.css`, in the `@theme` block.

## Check it before you send it

Run `npm run build`, then `npm run preview`, and open the address it prints. Then open the final link on your own phone and go through it once:

1. The intro opens and "I'm sorry." appears.
2. The apology text fills in as you scroll.
3. Every photo opens, the arrows and swipe work, and the close button works.
4. Each card opens and closes.
5. The memories show the right dates and photos.
6. Every question button works, including "I need some time."
7. The envelope opens and the letter reads well.
8. The music button plays and pauses. On an iPhone, check the silent switch.
9. Turn the phone sideways and back.

Do the same in Chrome on Android if she uses Android, and in Safari if she uses an iPhone.

## Put it online

### 1. Put the code on GitHub

1. Create a repository at github.com/new. Name it anything, choose **Private**, and leave "Add a README" and the other options unchecked.
2. In the terminal, inside the `little-apology` folder:

```
git init
git add .
git commit -m "First version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/little-apology.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub name. If Git says it does not know who you are, run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`, then repeat the `git commit` command.

### 2. Deploy on Vercel

1. Go to vercel.com and sign up with your GitHub account.
2. Choose **Add New**, then **Project**, and pick your repository. If it is not listed, allow Vercel to access it when asked.
3. Vercel detects Vite by itself. The build command is `npm run build` and the output folder is `dist`. Click **Deploy**.
4. After about a minute you get a link ending in `.vercel.app`. Open it on your phone and run through the checklist above. In the project settings you can change the name in the link to something simpler.

### Or deploy on Netlify

1. Go to app.netlify.com and sign up with GitHub.
2. Choose **Add new site**, then **Import an existing project**, then GitHub, and pick your repository.
3. The build command `npm run build` and the publish folder `dist` are already set in `netlify.toml`. Click **Deploy**.

### Changing things after it is live

Edit the files, then run:

```
git add .
git commit -m "Update"
git push
```

The site rebuilds and updates by itself in about a minute.

## Privacy

- There is no backend and no analytics. Nothing she taps is stored or sent.
- The pages ask search engines not to list the site, but anyone who has the link can open it. Send it only to her.
- Your photos are part of the public site, so anyone with the link can see them.

## If something goes wrong

- **npm says it cannot find package.json.** The terminal is in the wrong folder. Run `cd little-apology` first.
- **A photo shows as a soft gradient online.** The file name in the config does not match the file exactly. Check capital letters and the extension.
- **Music does nothing.** Check that the file is an mp3 named exactly as in the config, and that the phone is not on silent.
- **The build fails on Vercel.** Check that Node.js is version 20.19 or newer in the project settings.

## Folder guide

```
src/config/site.ts     all your text and settings
src/sections/          one file per part of the story
src/components/        shared pieces such as buttons and the photo viewer
public/images/         your photos
public/audio/          your music
```
