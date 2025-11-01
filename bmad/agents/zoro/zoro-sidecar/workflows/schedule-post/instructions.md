# Schedule Post Workflow Instructions

**PRIMARY Publishing Workflow** - Use this for all scheduled multi-platform posting

<workflow>
<critical>Load {project-root}/bmad/core/tasks/workflow.xml engine first</critical>

<step n="1" goal="Gather posting requirements">
  <action>Display:
    📅 Schedule Post - Postiz Multi-Platform Scheduling

    This is the PRIMARY publishing workflow.
    - Schedules to multiple platforms simultaneously
    - Handles media upload to Cloudinary (public URLs)
    - Validates content per platform
    - Updates Notion status automatically

    For immediate posting (urgent/breaking), use: publish-*-now workflows
  </action>

  <ask>Platforms to schedule? (select multiple, space-separated numbers)
  1. Twitter
  2. LinkedIn
  3. Instagram
  4. Facebook
  5. TikTok
  6. YouTube
  7. All above
  </ask>

  <action>Store as {{selected_platforms}}</action>

  <ask>Post content (text):
  (Note: Will be validated against each platform's character limits)
  </ask>

  <action>Store as {{post_content}}</action>

  <ask>Media files? (optional for most platforms, REQUIRED for YouTube)
  - Images: 04-media/images/thumbnail-main.png
  - Videos: 04-media/videos/my-video.mp4
  Multiple files: separate with commas
  Or: none
  </ask>

  <action>Store as {{media_paths}}</action>

  <check if="'YouTube' in selected_platforms">
    <action>**YouTube requires additional metadata:**</action>

    <ask>YouTube Video Title (required, 2-100 chars):</ask>
    <action>Store as {{youtube_title}}</action>

    <ask>YouTube Privacy (required):
    1. public
    2. private
    3. unlisted
    </ask>
    <action>Store as {{youtube_type}}</action>

    <ask>YouTube Tags (optional, comma-separated):</ask>
    <action>Store as {{youtube_tags}}</action>

    <ask>Made for kids? (yes/no, required by YouTube):</ask>
    <action>Store as {{youtube_kids}}</action>

    <action>**Validation:**
      - YouTube REQUIRES video attachment (check media_paths has .mp4/.mov)
      - Title: 2-100 chars required
      - If no video: Display error, remove YouTube from platforms
    </action>
  </check>

  <ask>Schedule date/time:
  - Future timestamp (ISO format: 2025-11-06T09:00:00Z)
  - Or: "next-free-slot" (Postiz auto-determines optimal time)
  - Or: "now" (immediate posting)
  </ask>

  <action>Store as {{schedule_date}}</action>
</step>

<step n="1.5" goal="Format content as Postiz HTML">
  <action>**Convert plain text to Postiz-compliant HTML:**

    Postiz requires: Each paragraph in <p> tags, bold as <strong>, bullets as individual <p> tags

    Execute formatter:
    - Load: {project-root}/bmad/modules/postiz-formatter/format-html.mjs
    - Call: formatForPostiz({{post_content}})
    - Store result as: {{formatted_content}}

    **Formatting rules applied:**
    - Paragraph breaks (\n\n) → Separate <p> tags
    - Bold (**text**) → <strong>text</strong>
    - Bullet points (•/-/*) → Individual <p>• text</p>
    - Empty lines between sections → <p> </p> for breathing room
    - Headers (##) → <h2>, (###) → <h3>

    Display: "✅ Content formatted for Postiz (HTML compliant)"
  </action>
</step>

<step n="2" goal="Upload media to Cloudinary for public URLs">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>

  <check if="media_paths != 'none'">
    <action>Display: "📤 Uploading media to Cloudinary for public URLs..."</action>

    <action>**Upload each media file:**
      cloudinary_urls = []

      for media_path in {{media_paths}}:
        # Determine resource type
        if media_path.endswith(('.png', '.jpg', '.jpeg', '.webp')):
          resource_type = "image"
        elif media_path.endswith(('.mp4', '.mov', '.avi')):
          resource_type = "video"

        # Upload to Cloudinary
        result = mcp__cloudinary-asset-mgmt__upload-asset(
          resourceType: resource_type,
          uploadRequest: {
            file: media_path,
            public_id: f"social-media/{extract_filename(media_path)}",
            folder: "social-media-postiz"
          }
        )

        if result.success:
          cloudinary_urls.append(result.secure_url)
          display(f"✅ Uploaded: {extract_filename(media_path)} → {result.secure_url}")
        else:
          display(f"⚠️ Upload failed for {media_path}: {result.error}")
          display("ℹ️ Continuing without this media file")

      **Save Cloudinary URLs for Postiz**
      - Store: {{cloudinary_media_urls}} = cloudinary_urls
      - Display: f"✅ {len(cloudinary_urls)} media files uploaded to Cloudinary"
    </action>
  </check>

  <check if="media_paths == 'none'">
    <action>{{cloudinary_media_urls}} = []</action>
    <action>Display: "ℹ️ Text-only post (no media)"</action>
  </check>
</step>

<step n="3" goal="Get Postiz connected platforms">
  <action>Display: "🔍 Checking connected Postiz accounts..."</action>

  <action>**Query Postiz for connected platforms:**
    integrations = mcp__postiz__integrationList()

    display("📱 Connected accounts:")
    for integration in integrations:
      display(f"  • {integration.platform}: {integration.name}")

    **Validate selected platforms are connected**
    for platform in {{selected_platforms}}:
      if platform not in integrations:
        display(f"⚠️ {platform} not connected to Postiz!")
        display(f"ℹ️ Visit Postiz dashboard to connect {platform}")

        <ask>Remove {platform} from list or cancel? [remove/cancel]</ask>
        if cancel:
          <exit>Workflow cancelled</exit>
        else:
          # Remove platform from selected_platforms
    </action>
</step>

<step n="4" goal="Validate content per platform">
  <action>Display: "✅ Validating content for each platform..."</action>

  <action>**Get platform schemas and validate:**
    validation_results = []

    for platform in {{selected_platforms}}:
      # Get platform requirements
      schema = mcp__postiz__integrationSchema(
        isPremium: false,  # Or detect from integration
        platform: platform.lower()
      )

      # Validate character limit
      max_chars = schema.max_chars or 10000
      if len({{post_content}}) > max_chars:
        validation_results.append({
          platform: platform,
          error: f"Text too long ({len(post_content)} chars, max {max_chars})"
        })

      # Validate media support
      if {{cloudinary_media_urls}} and not schema.supports_media:
        validation_results.append({
          platform: platform,
          error: "Platform doesn't support media"
        })

      # Validate media count
      if len({{cloudinary_media_urls}}) > schema.max_media_count:
        validation_results.append({
          platform: platform,
          error: f"Too many media files ({len(cloudinary_urls)}, max {schema.max_media_count})"
        })

    **Display validation results:**
    if validation_results:
      display("⚠️ Validation issues found:")
      for issue in validation_results:
        display(f"  • {issue.platform}: {issue.error}")

      <ask>
      Options:
      1. Edit content to fix issues
      2. Remove problematic platforms
      3. Cancel workflow
      </ask>

      # Handle user choice (edit text, deselect platforms, or cancel)
    else:
      display("✅ All platforms validated successfully!")
  </action>
</step>

<step n="5" goal="Post/Schedule via Postiz and Extract Platform URLs">
  <action>Display: "📅 Posting via Postiz..."</action>

  <action>**Determine post type:**
    <ask>Post immediately or schedule for later?
    1. Now (immediate posting)
    2. Schedule (future date/time)
    </ask>

    if option == "1":
      post_type = "now"
      post_date = current_time_utc()
    else:
      post_type = "schedule"
      post_date = {{schedule_date}}  # From step 1
  </action>

  <action>**Post/Schedule to all platforms:**
    platform_results = []

    for platform in {{selected_platforms}}:
      integration_id = get_integration_id(platform)

      # Build platform-specific settings
      platform_settings = []

      if platform.lower() == "youtube":
        # YouTube requires specific settings (from integrationSchema)
        platform_settings = [
          {"key": "title", "value": {{youtube_title}}},
          {"key": "type", "value": {{youtube_type}}},  # public/private/unlisted
          {"key": "selfDeclaredMadeForKids", "value": {{youtube_kids}}}  # yes/no
        ]
        if {{youtube_tags}}:
          platform_settings.append({"key": "tags", "value": {{youtube_tags}}})

      # Call Postiz
      result = mcp__postiz__integrationSchedulePostTool(
        socialPost: [{
          integrationId: integration_id,
          isPremium: detect_premium(platform),  # True for Twitter if Premium
          date: post_date,  # UTC ISO format
          shortLink: false,
          type: post_type,  # "now" or "schedule"
          postsAndComments: [{
            content: {{formatted_content}},  # Postiz-compliant HTML (formatted in step 1.5)
            attachments: {{cloudinary_media_urls}}  # Cloudinary HTTPS URLs (works for images AND videos!)
          }],
          settings: platform_settings  # YouTube-specific or empty for other platforms
        }]
      )

      if result.success:
        # **CRITICAL: Extract platform URL from Postiz response**
        # Postiz returns: {output: [{platform, post_id, status, platform_url, ...}]}

        post_id = result.output[0].post_id if result.output else null
        platform_url = result.output[0].platform_url if result.output else null
        postiz_url = result.output[0].postiz_url if result.output else null
        status = result.output[0].status if result.output else "unknown"

        platform_results.append({
          platform: platform,
          post_id: post_id,
          platform_url: platform_url,  # LinkedIn/Twitter/etc URL
          postiz_url: postiz_url,  # Postiz dashboard URL
          status: status,
          posted_at: post_date
        })

        if post_type == "now":
          display(f"✅ {platform}: Posted! {platform_url or 'URL pending...'}")
        else:
          display(f"✅ {platform}: Scheduled for {schedule_date}")

        # **Auto-save platform URL if available**
        if platform_url:
          mkdir -p "05-published/{platform.lower()}/"
          write("05-published/{platform.lower()}/url.md",
            f"# {platform} Post URL\n\n{platform_url}\n\nPostiz Dashboard: {postiz_url or 'https://app.postiz.com/posts'}"
          )
          display(f"   💾 URL saved to 05-published/{platform.lower()}/url.md")
      else:
        display(f"⚠️ {platform}: Failed - {result.error}")

    **Summary:**
    - Display: f"📊 Posted to {len(platform_results)} of {len(selected_platforms)} platforms"
    - if post_type == "schedule":
        display(f"📱 View queue: https://app.postiz.com/posts")
    - else:
        display(f"🎉 Posts are LIVE!")
        for pr in platform_results:
          if pr.platform_url:
            display(f"   {pr.platform}: {pr.platform_url}")
  </action>
</step>

<step n="6" goal="Save to 05-published/ folders">
  <action>**Copy final content to platform folders:**

    for platform in {{selected_platforms}}:
      # Determine content filename
      if platform in ["Twitter", "X"]:
        content_filename = "thread.md" if is_thread else "tweet.md"
        source_path = "03-drafts/twitter/thread-v*.md" (latest version)
      elif platform == "LinkedIn":
        content_filename = "post.md"
        source_path = "03-drafts/linkedin/post-v*.md" (latest)
      elif platform == "YouTube":
        content_filename = "script.md"
        source_path = "03-drafts/youtube/script-v*.md" (latest)
      # etc.

      # Create platform folder
      mkdir -p "05-published/{platform.lower()}/"

      # Copy content from drafts
      cp "{source_path}" "05-published/{platform.lower()}/{content_filename}"

      # Save Cloudinary URLs reference
      if {{cloudinary_media_urls}}:
        write("05-published/{platform.lower()}/media-urls.md",
          "# Media URLs\n\n" + "\n".join(cloudinary_urls)
        )

      # Create publish confirmation (will have URLs after Postiz publishes)
      write("05-published/{platform.lower()}/publish-confirmation.json", {
        "scheduled_via": "Postiz",
        "schedule_date": {{schedule_date}},
        "status": "scheduled",
        "will_update_urls_after_publish": true
      })

      display(f"✅ Saved to 05-published/{platform.lower()}/")
  </action>
</step>

<step n="7" goal="Update Notion Status and Metadata (Epic 2 Story 5.2)">
  <action>Load {project-root}/.bmad-core/modules/notion-updates.md</action>
  <action>Load {project-root}/.bmad-core/modules/notion-relational-helpers.md</action>

  <action>**Update Notion Content Tracker:**

    metadata = read_json("00-session/metadata.json")

    if metadata.notion.page_url exists:
      **Step 1: Set Publish Date**
      - update_content_property(
          metadata.notion.page_url,
          {"Publish Date": {{schedule_date}}},
          "Zoro"
        )

      **Step 2: Keep Status as Editing (not Posted yet)**
      - display("ℹ️ Notion Status stays 'Editing' until Postiz publishes at scheduled time")
      - display("ℹ️ After {schedule_date}, manually update Status → Posted in Notion")
      - Note: "In future: Postiz webhook could auto-update status when published"

      **Step 3: Add scheduling note**
      - update_content_property(
          metadata.notion.page_url,
          {"Description": f"Scheduled via Postiz to {len(selected_platforms)} platforms: {', '.join(selected_platforms)}"},
          "Zoro"
        )

      **Step 4: Link to Channels**
      - for platform in {{selected_platforms}}:
          channel_result = link_content_to_channel(metadata.notion.page_url, platform)
          if channel_result.success:
            display(f"✅ Linked to {channel_result.channel_name}")

      **Step 5: Log to session**
      - append_to_file("00-session/session-log.md",
          f"{timestamp} - Zoro: Scheduled to {len(selected_platforms)} platforms via Postiz for {schedule_date}\n"
        )

      display("✅ Notion updated with scheduling details")

    else:
      display("ℹ️ No Notion page linked (local-only project)")
    end if

    **Error Handling:**
    - Notion update fails: Log warning, scheduling still successful
  </action>
</step>

<step n="8" goal="Present confirmation and next steps">
  <action>Display final summary:

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ✅ Scheduling Complete!
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    **Platforms:** {len(selected_platforms)} platforms scheduled
    {{list each platform with schedule time}}

    **Content:** {len(post_content)} characters
    **Media:** {len(cloudinary_media_urls)} files (Cloudinary URLs)
    **Schedule Date:** {{schedule_date}}

    **Postiz Dashboard:** https://app.postiz.com/posts
    (View queue, modify timing, or cancel if needed)

    **After Publication:**
    1. Postiz will auto-publish at scheduled time
    2. Update Notion Status → Posted manually (or wait for webhook if configured)
    3. Add platform URLs to 05-published/{platform}/url.md
    4. Track analytics in Notion (Views, Likes, Comments)

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  </action>

  <template-output>workflow_complete</template-output>
</step>

<step n="9" goal="Post-Publication Analytics Tracking (Epic 2 Story 5.3)">
  <action>Display:

    📊 Post-Publication Analytics Tracking

    After Postiz publishes your content at the scheduled time:

    1. **Check Postiz Dashboard:** https://app.postiz.com/posts
       - View published status
       - Get platform URLs (LinkedIn, Twitter, Facebook posts)

    2. **Update Notion with Platform URLs:**
       - Add URLs to 05-published/{platform}/url.md
       - Update Notion Content Text or Description with live URLs

    3. **Track Performance Metrics:**
       - Wait 24-48 hours for initial performance data
       - Check Views, Likes, Comments on each platform
       - Update Notion with metrics

    **Would you like to track analytics now (for previously published content)?** [y/n]
  </action>

  <check if="yes">
    <action>**Analytics Tracking (Pattern 4):**

      Load {project-root}/.bmad-core/modules/notion-updates.md

      metadata = read_json("00-session/metadata.json")

      if metadata.notion.page_url exists:
        **Step 1: Prompt for platform URLs**
        - Ask: "Platform URLs (paste one per line, or 'skip'):"
        - Example:
            LinkedIn: https://linkedin.com/posts/...
            Twitter: https://twitter.com/user/status/...
            Facebook: https://facebook.com/...

        - Parse and save to 05-published/{platform}/url.md for each

        **Step 2: Prompt for performance metrics**
        - Ask: "Views (total across platforms):"
        - Ask: "Likes (total):"
        - Ask: "Comments (total):"

        **Step 3: Calculate performance tier**
        - views_tier = calculate_tier(views):
            if views > 500: "Great"
            elif views > 200: "Good"
            elif views > 50: "Okay"
            else: "Poor"

        **Step 4: Update Notion**
        - update_content_property(
            metadata.notion.page_url,
            {
              "Views": int(views),
              "Likes": int(likes),
              "Comments": int(comments),
              "View Performance": views_tier
            },
            "Zoro"
          )

        **Step 5: Update Status to Posted**
        - update_content_status(metadata.notion.page_url, "Posted", "Zoro", metadata)

        **Step 6: Save analytics file**
        - Create: "05-published/analytics-{date}.md"
        - Contents:
            # Analytics Report - {date}

            Platforms: {selected_platforms}

            ## Performance
            - Views: {views}
            - Likes: {likes}
            - Comments: {comments}
            - Performance Tier: {views_tier}

            ## Platform URLs
            {list all URLs}

        display("✅ Analytics tracked in Notion and saved locally")
        display(f"✅ Status updated: Editing → Posted")

      else:
        display("ℹ️ No Notion page linked - save analytics locally only")
      end if
    </action>
  </check>

  <check if="no or skip">
    <action>Display: "ℹ️ Analytics tracking skipped - you can add metrics to Notion manually later"</action>
  </check>

  <template-output>analytics_tracked</template-output>
</step>

</workflow>
