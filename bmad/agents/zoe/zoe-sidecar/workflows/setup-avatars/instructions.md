# Avatar Setup & Consent Workflow

<workflow>

<step n="1" goal="List all avatars">
<action>Call MCP tool: mcp__heygen__get_avatar_groups</action>
<action>Display all avatar groups with preview images</action>

<action>For each group, call mcp**heygen**get_avatars_in_avatar_group</action>
<action>Display avatar details with IDs</action>
</step>

<step n="2" goal="Consent verification">
<action>For each avatar, ask:</action>
<ask response="consent_confirmed">Do you consent to use avatar "{avatar_name}" (ID: {avatar_id})? [y/n]</ask>

<check if="consent_confirmed == 'y'">
  <action>Save consent artifact to {consent_folder}/{avatar_id}-consent.json</action>
  <action>Include: {avatar_id, avatar_name, consent_date, consent_granted: true}</action>
</check>

<check if="consent_confirmed == 'n'">
  <action>Save blocked status: {consent_granted: false}</action>
</check>

</step>

<step n="3" goal="Set defaults">
<ask response="default_avatar">Which avatar should be your default? (Enter avatar_id)</ask>
<ask response="default_voice">Which voice should be your default? (Enter voice_id)</ask>

<action>Update {config_source} with defaults:</action>
<action>- default_avatar_id: {default_avatar}</action>
<action>- default_voice_id: {default_voice}</action>

<template-output>consented_avatars, default_avatar, default_voice</template-output>
</step>

</workflow>
