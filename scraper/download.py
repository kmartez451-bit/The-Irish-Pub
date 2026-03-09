"""
Instagram scraper for The Irish Pub RD (@theirishpubrd)
Uses Instaloader to download public posts, metadata, and profile info.

Usage:
    python scraper/download.py theirishpubrd
"""

import sys
import os
import json
import shutil
from pathlib import Path
from datetime import datetime

try:
    import instaloader
except ImportError:
    print("ERROR: instaloader not installed. Run: pip install instaloader")
    sys.exit(1)

def download_profile(username: str):
    output_dir = Path("output")
    media_dir = output_dir / "media"
    media_dir.mkdir(parents=True, exist_ok=True)

    L = instaloader.Instaloader(
        download_videos=True,
        download_video_thumbnails=True,
        download_geotags=False,
        download_comments=False,
        save_metadata=True,
        compress_json=False,
        post_metadata_txt_pattern="{caption}",
        filename_pattern="{date_utc:%Y%m%d}_{mediaid}",
        dirname_pattern=str(media_dir / "{target}"),
    )

    print(f"[+] Loading profile: @{username}")
    try:
        profile = instaloader.Profile.from_username(L.context, username)
    except instaloader.exceptions.ProfileNotExistsException:
        print(f"ERROR: Profile @{username} does not exist or is private.")
        sys.exit(1)

    print(f"[+] Found: {profile.full_name} | {profile.followers} followers | {profile.mediacount} posts")

    # Download avatar
    avatar_path = media_dir / "avatar.jpg"
    if not avatar_path.exists():
        L.download_profilepic(profile)
        # Move avatar to expected path
        for f in (media_dir / username).glob("*.jpg"):
            if "profile_pic" in f.name or f.name.startswith(username):
                shutil.copy(str(f), str(avatar_path))
                break

    # Download posts
    print(f"[+] Downloading posts from @{username}...")
    posts_data = []

    for post in profile.get_posts():
        post_id = str(post.mediaid)
        date_str = post.date_utc.strftime("%Y-%m-%d")
        caption = post.caption or ""
        hashtags = [t.strip() for t in caption.split() if t.startswith("#")]
        likes = post.likes
        is_video = post.is_video

        # Determine media filename
        media_filename = f"{post.date_utc.strftime('%Y%m%d')}_{post_id}"
        ext = ".mp4" if is_video else ".jpg"
        local_media = f"media/{username}/{media_filename}{ext}"

        posts_data.append({
            "id": post_id,
            "type": "video" if is_video else "image",
            "media": local_media,
            "caption": caption,
            "date": date_str,
            "likes": likes,
            "hashtags": hashtags,
            "category": ""  # Filled by processor
        })

        # Download the actual media
        try:
            L.download_post(post, target=str(media_dir / username))
        except Exception as e:
            print(f"  [!] Skipping post {post_id}: {e}")
            continue

    # Build profile summary
    profile_data = {
        "username": username,
        "full_name": profile.full_name,
        "bio": profile.biography or "",
        "followers": profile.followers,
        "post_count": profile.mediacount,
        "avatar": f"media/avatar.jpg",
        "external_url": profile.external_url or ""
    }

    # Write raw output for processor
    raw_output = {
        "profile": profile_data,
        "posts": posts_data
    }

    raw_path = output_dir / "raw.json"
    with open(str(raw_path), "w", encoding="utf-8") as f:
        json.dump(raw_output, f, ensure_ascii=False, indent=2)

    print(f"[+] Downloaded {len(posts_data)} posts")
    print(f"[+] Raw data saved to {raw_path}")
    print(f"[+] Run 'npx ts-node processor/process.ts' to generate content.json")

if __name__ == "__main__":
    username = sys.argv[1] if len(sys.argv) > 1 else "theirishpubrd"
    download_profile(username)
