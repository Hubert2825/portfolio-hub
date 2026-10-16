# Hubert Baidoo: portfolio

A multi-page [Jekyll](https://jekyllrb.com/) site that GitHub Pages builds for you. You don't need to install anything to publish it: push the files and GitHub does the rest.

## Structure

```
_config.yml           Site settings (name, email, links). Edit the line marked EDIT.
_layouts/default.html Page shell shared by every page
_includes/            Shared header, footer, and photo gallery
_data/
  navigation.yml      Menu links
  music.yml           Your recordings (Music page)
  hands_on.yml        Hands-on work sections and photos
  projects.yml        Software projects and screenshots
index.html            Home
music.html            Music
software.html         Software
hands-on.html         Hands-on work
about.html            About, education, certificates
skills.html           Skills
contact.html          Contact
404.html              Not-found page
css/style.css         All styling, including light and dark themes
js/main.js            Theme toggle, footer year, photo lightbox
assets/               Your images and audio files
```

## Before you publish

1. In `_config.yml`, replace `hello@example.com` with your real email address.
2. Read each page and fix anything that doesn't match your work.

## Add photos to the Hands-on page

1. Resize each photo to about 1600 px wide (under 500 KB is a good target) and save it in `assets/images/hands-on/`.
2. Open `_data/hands_on.yml`, find the section, and add entries under `photos:`:

   ```yaml
   photos:
     - file: cctv-roof-camera.jpg
       alt: A weatherproof camera mounted under a roof edge
       caption: Replacement camera with a sealed outdoor junction.
   ```

   Replace the empty `photos: []` line with the `photos:` list above.
3. Commit and push. The section's "Photos are being added" note disappears once it has photos.

Keep client names, street addresses, and live camera views out of photos and captions unless the client agrees.

## Add music

1. For a YouTube video, copy its ID (the part after `v=` in the address).
   For an audio file, save it in `assets/audio/`. For SoundCloud, Spotify, or another site, copy the link.
2. Open `_data/music.yml`, delete the `[]` line, and add a block. Examples are in the comments at the top of the file.

## Add screenshots to a software project

Save images in `assets/images/projects/` and list them under `screenshots:` in `_data/projects.yml`, using the same `file`, `alt`, and `caption` fields as the hands-on photos.

## Deploy to GitHub Pages

1. On GitHub, create a **public** repository named exactly `portfolio-hub`.
2. Push these files to the `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Hubert2825/portfolio-hub.git
   git push -u origin main
   ```

3. In the repository, open **Settings > Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then save.
4. Wait a minute or two, then visit https://portfolio-hub/.

If the site doesn't update after a push, open the repository's **Actions** tab and check the "pages build and deployment" run for errors.

## Preview on your computer (optional)

You need Ruby installed. Then:

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000.
