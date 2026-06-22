I have initialized a new astrois Project use astro docs mcp and tailwind-4-docs & web-design-guidelines skills for creating the website
ALso use @DESIGN.md file and keep the website design Like verceli
Name: free world time converter
Domain: freeworldtimeconverter.com

Build a modern web application called "freeworldtimeconverter".

Goal:
Create the fastest and easiest time zone conversion tool on the internet.

Core Principle:
Users should never need to understand time zones, UTC offsets, DST rules, or city selection complexity.

Primary Features:

1. Natural Language Time Conversion
   Examples:

* "Tomorrow 4pm Mumbai in London"
* "Next Friday 9am PST to India"
* "What time is 2pm New York in Sydney"

2. Smart Location Search

* Search cities, countries, airports, and time zones
* Fuzzy matching
* Fast keyboard navigation

3. Live Multi-City Comparison

* Add unlimited cities
* Real-time updates
* DST aware
* 12h and 24h format

4. Human-Friendly Context
   Show:

* Working hours
* Early morning
* Evening
* Sleeping hours
* Weekend indicator

5. Meeting Pain Score
   Calculate inconvenience for each participant.
   Display overall score from 0–100.

6. AI Meeting Finder
   Input:
   "Find best time for Mumbai, London, New York"

Output:

* Best overall
* Fairest
* Earliest
* Latest

7. Beautiful Share Cards
   Generate images optimized for:

* Slack
* Teams
* WhatsApp
* Email

8. Saved People
   Store:

* Manager
* Client
* Team members

Then support:
"What time is 3pm for my manager?"

9. DST Intelligence
   Warn users:
   "This meeting changes by 1 hour next week because London enters DST."

10. Mobile First UX

* Extremely fast
* One-hand use
* No login required for basic usage

Tech Stack:

* Next.js 15
* TypeScript
* Tailwind
* shadcn/ui
* PostgreSQL
* Prisma
* OpenAI API
* IANA timezone database

Design:

* Linear.app quality
* Clean minimal interface
* Dark mode
* Responsive
* Focus on speed and simplicity

Success Metric:
A user should be able to convert time between countries in less than 3 seconds without understanding time zones.

