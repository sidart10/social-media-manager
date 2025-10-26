# Hook A/B Testing Workflow

<workflow>

<step n="1" goal="Base content">
<ask response="main_script">What's your main video script/message?</ask>
<ask response="hook_duration">How long should each hook test be? [4s/8s]</ask>
</step>

<step n="2" goal="Generate 3 hook variations">
<action>Create 3 different opening variations:</action>

<action>Hook 1: Question-based ("Did you know...?")</action>
<action>Hook 2: Statement-based ("Here's why...")</action>
<action>Hook 3: Action-based ("Watch what happens...")</action>

<ask response="hook_1_prompt">Describe hook variation 1:</ask>
<ask response="hook_2_prompt">Describe hook variation 2:</ask>
<ask response="hook_3_prompt">Describe hook variation 3:</ask>

<action>Generate all 3 with Veo (fast model for speed)</action>
<action>Use mcp__veo__generate_video for each variation</action>

<template-output>hook_1_url, hook_2_url, hook_3_url</template-output>
</step>

<step n="3" goal="Review and select">
<action>Display all 3 hooks with URLs</action>
<ask>Which hook performed best or felt right? [1/2/3]</ask>
<action>Save winning hook ID for future use</action>
</step>

</workflow>
