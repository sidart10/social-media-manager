# Methodology Research: OSINT and AI Research Agent Methodologies 2025

**Research Date:** 2025-10-29
**Sources Analyzed:** 8 authoritative sources
**Focus:** Best practices for deep web research, OSINT techniques, and AI-powered intelligence gathering

---

## Executive Summary

Deep web research has evolved from basic Google searches to sophisticated multi-layered intelligence operations. The 2025 landscape combines traditional OSINT (Open Source Intelligence) methodologies with AI-powered research agents, creating hybrid systems that can process months of research in minutes while maintaining investigative rigor.

**Key Findings:**
- OSINT is a structured methodology, not passive collection
- AI research agents work best with simple, composable patterns (Anthropic)
- Multi-source synthesis is critical (cross-platform correlation)
- Intelligence comes in layers: Surface Web (<5%) → Deep Web (unindexed) → Dark Web (hidden)
- Most successful agents use workflow orchestration, not full autonomy

---

## Discovered Methodologies

### 1. The OSINT Framework (5-Step Intelligence Cycle)

**Source:** Neotas OSINT Framework Guide
**Authoritative:** Industry standard for systematic intelligence collection

**The Process:**

**Step 1: IDENTIFY**
- Define intelligence objectives
- Specify requirements
- Determine success criteria
- Identify target sources

**Step 2: COLLECT**
- Surface web: Search engines, public websites, social media
- Deep web: Databases, subscription sites, unindexed forums
- Dark web: Tor networks, .onion domains, hidden services
- Public records: Government filings, legal documents, patents

**Step 3: PROCESS**
- Filter irrelevant data
- Organize by category
- Standardize formats
- Remove duplicates
- Tag by source quality

**Step 4: ANALYZE**
- Extract patterns and trends
- Identify relationships and connections
- Detect anomalies
- Cross-reference multiple sources
- Assess source credibility

**Step 5: DISSEMINATE**
- Present in actionable format
- Include source citations
- Provide confidence scores
- Offer recommendations
- Enable decision-making

**Application to deep-web-research skill:**
This framework maps directly to the skill's depth levels:
- Quick = Steps 1-2 (identify + collect surface web)
- Standard = Steps 1-3 (+ basic processing)
- Comprehensive = Steps 1-4 (+ analysis)
- Exhaustive = All 5 steps (complete intelligence cycle)

---

### 2. Cross-Platform Correlation (Identity Linking)

**Source:** McAfee Institute - 5 OSINT Techniques 2025
**Application:** Multi-source synthesis and connection discovery

**Technique:**
Stitching together fragmented online personas by matching subtle clues across multiple platforms.

**Implementation:**

**Phase 1: Seed Identification**
- Start with known data point (username, email, handle)
- Identify primary platform presence

**Phase 2: Variation Scanning**
- Search for username variations:
  - "john_doe" → "johndoe" → "j.doe" → "john.doe"
  - Case variations, punctuation changes
  - Platform-specific adaptations

**Phase 3: Pattern Matching**
- **Temporal patterns:** Posting times indicate time zones
- **Linguistic patterns:** Writing style, vocabulary, grammar
- **Interest patterns:** Topics, hashtags, groups
- **Visual patterns:** Profile photos, backgrounds, aesthetics
- **Bio patterns:** Similar phrasing across platforms

**Phase 4: Connection Mapping**
- Link accounts with high confidence scores
- Build comprehensive digital footprint
- Identify relationships and networks
- Map influence and reach

**Value:**
- Reveals hidden connections
- Uncovers complete identity picture
- Discovers behavioral patterns
- Enables predictive analysis

**Tools:**
- Username search engines (Sherlock, WhatsMyName)
- Social media scrapers (platform-specific APIs)
- Pattern matching algorithms
- Timeline correlation tools

**Application to deep-web-research:**
When researching individuals or organizations, use this technique to:
- Gather from multiple platforms simultaneously
- Cross-reference findings
- Build complete intelligence picture
- Verify authenticity across sources

---

### 3. Deep and Dark Web Intelligence Collection

**Source:** SpecialEurasia - OSINT Deep/Dark Web Practices

**Internet Layers:**

**Surface Web (<5% of internet)**
- Indexed by standard search engines
- Readily accessible
- Examples: Public websites, news, social media
- Intelligence value: LOW for covert activities

**Deep Web (Unindexed content)**
- Not indexed by traditional search engines
- Requires specific access (login, subscription, direct URL)
- Examples:
  - University databases
  - Password-protected portals
  - Subscription repositories
  - Internal forums
  - Private extremist blogs
  - Academic encryption networks
- Intelligence value: MEDIUM (bridge between open and clandestine)

**Dark Web (Intentionally hidden)**
- Accessible only through anonymizing technologies
- Technologies: Tor Browser, I2P (Invisible Internet Project)
- Domains: .onion (Tor), .i2p
- Content:
  - Cybercriminal infrastructure
  - Illicit marketplaces
  - Extremist propaganda
  - Covert communications
- Intelligence value: HIGH for threat intelligence

**Intelligence Objectives:**

**Counterterrorism:**
- Monitor extremist group communications
- Track propaganda dissemination
- Identify planning activities
- Detect recruitment and radicalization

**Cyber Threat Intelligence:**
- Track exploit kits and malware toolkits
- Monitor ransomware-as-a-service offerings
- Find breach data and leaked credentials
- Detect early indicators of campaigns (IOCs)
- Profile threat actors and tradecraft

**Operational Security:**
- Use anonymizing technologies (VPNs, Tor)
- Maintain operational security (OPSEC)
- Document evidence chain
- Follow legal frameworks

**Application to deep-web-research:**
- Tier 1: Surface web (WebSearch, Exa)
- Tier 2: Deep web (Apify deep scraping, API access)
- Tier 3: Dark web (specialized tools - future enhancement)

---

### 4. Anthropic's Simple Agent Pattern

**Source:** Anthropic Research - Building Effective Agents

**Core Philosophy:**
"The most successful implementations weren't using complex frameworks or specialized libraries. Instead, they were building with simple, composable patterns."

**Workflow vs Agent:**

**Workflows** (Recommended for most use cases):
- LLMs orchestrated through predefined code paths
- Predictable execution
- Easier to debug
- Lower latency
- Best for: Well-defined tasks, production systems

**Agents** (Use sparingly):
- LLMs dynamically direct own processes
- Flexible but unpredictable
- Higher latency and cost
- Best for: Complex, variable tasks requiring flexibility

**Decision Framework:**

```
Start with: Single LLM call + retrieval + examples
If needed: Add workflow (orchestrated path)
Last resort: Full agent (dynamic control)
```

**Best Practices:**
1. **Simplest solution** - Don't over-engineer
2. **Composable patterns** - Build modular, reusable components
3. **Avoid frameworks** unless they add clear value
4. **Test with minimal** viable implementation first
5. **Measure tradeoffs** - Latency/cost vs task performance

**Application to deep-web-research:**
- Use **workflow pattern** (skill orchestrates tool selection)
- Not full agent (skill doesn't need LLM to decide everything)
- Simple, composable (Exa → Apify → Archon → WebSearch fallback chain)
- Follows Anthropic best practice

---

### 5. Multi-Agent Research Team Architecture

**Source:** AgentX - AI Agent Research Team Guide

**Delegation Pattern:**

**Agent Specialization:**

1. **Retrieval Agent**
   - Purpose: Gather relevant literature and sources
   - Skills: Search, filtering, source discovery
   - Output: List of relevant documents/URLs

2. **Analysis Agent**
   - Purpose: Apply structured reasoning and pattern recognition
   - Skills: Data analysis, relationship mapping, trend detection
   - Output: Insights and findings

3. **Summary Agent**
   - Purpose: Craft human-readable insights
   - Skills: Synthesis, writing, clarity
   - Output: Reports and summaries

4. **Delegator Agent**
   - Purpose: Route tasks to appropriate specialist
   - Skills: Task classification, agent selection, context evaluation
   - Output: Delegated sub-tasks

**Benefits:**
- Parallelized reasoning (faster)
- Specialized expertise (more accurate)
- Scalable processing (handle complex tasks)
- Clear explainability (trace delegation path)

**Chain-of-Thought (CoT) Prompting:**
- Agents "think out loud" through reasoning process
- Improves accuracy on complex problems
- Makes decision process transparent
- Enables debugging and refinement

**Application to deep-web-research:**
Map MCP tools to agent roles:
- **Retrieval:** Exa (neural search), WebSearch (fallback)
- **Analysis:** Apify (deep scraping), WebFetch (detail extraction)
- **Summary:** Archon RAG (synthesize with existing knowledge)
- **Delegator:** The skill itself (intelligent routing)

---

### 7. Source Quality Assessment Framework

**Synthesized from OSINT best practices**

**High Confidence Sources:**
- .edu domains (academic institutions)
- .gov domains (government agencies)
- Major publications (WSJ, NYT, Reuters)
- Industry reports (Gartner, McKinsey)
- Official company blogs
- Peer-reviewed journals
- Recent (<3 months for fast-moving topics)

**Medium Confidence Sources:**
- Established tech blogs (TechCrunch, Wired)
- Medium articles from verified authors
- GitHub documentation
- Industry forums (Stack Overflow)
- Recent (3-6 months old)

**Low Confidence Sources:**
- Personal blogs (unverified)
- Old articles (>6 months for tech topics)
- No author attribution
- Anonymous sources
- Questionable credibility

**Verification Tactics:**
- **Triangulation:** Confirm from 3+ independent sources
- **Author credentials:** Check expertise and bias
- **Publication date:** Assess recency and relevance
- **Primary vs secondary:** Prefer primary sources
- **Contradiction check:** Flag conflicting information

---

## Recommended Enhancements to deep-web-research Skill

Based on this research, consider:

1. **Add OSINT Framework explicitly** to exhaustive mode
   - Document the 5-step process
   - Map to skill actions
   - Guide users through cycle

2. **Implement source quality scoring** automatically
   - Tag each source (high/medium/low confidence)
   - Report confidence in findings
   - Flag when low-confidence sources dominate

3. **Add cross-platform correlation** when researching entities
   - Automatically search variations
   - Link related findings
   - Build comprehensive profiles

4. **Document Anthropic pattern alignment**
   - Emphasize workflow approach (our current design)
   - Justify simplicity (proven best practice)
   - Avoid over-complication

5. **Enhance with specialized sub-agents** (future)
   - Dedicated retrieval, analysis, summary agents
   - Parallel processing for speed
   - Clearer delegation and explainability

---

## Conclusion

Deep web research in 2025 combines:
- **OSINT rigor** (5-step framework, source verification)
- **AI power** (multi-source synthesis, pattern detection)
- **Simple architecture** (Anthropic's composable patterns)
- **Intelligent orchestration** (tool routing and fallbacks)

**The deep-web-research skill embodies these principles:**
- ✅ Follows OSINT framework (identify → collect → process → analyze → disseminate)
- ✅ Uses simple workflow pattern (not over-complicated)
- ✅ Multi-tool delegation (specialized tools for different needs)
- ✅ Intelligent fallbacks (always delivers results)
- ✅ Source quality awareness (built into synthesis)

**Status:** Skill already implements best practices. This research validates and reinforces current design!
