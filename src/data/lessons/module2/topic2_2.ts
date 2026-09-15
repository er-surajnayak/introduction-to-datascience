import { LessonContent } from '@/types/lesson';

export const topic2_2: LessonContent = {
  id: 'm2-t2',
  topicNumber: '2.2',
  slug: 'web-scraping-and-parsing',
  moduleId: 'module-2',
  title: 'Web Scraping & Parsing',
  subtitle: 'From Raw HTML to Analytical Datasets: DOM Navigation, CSS Selectors, BeautifulSoup & Ethical Data Extraction',
  estimatedMinutes: 40,
  difficulty: 'Intermediate',
  tags: [
    'Web Scraping',
    'HTML',
    'DOM',
    'CSS Selectors',
    'BeautifulSoup',
    'find() vs find_all()',
    'HTML Tables',
    'Pandas',
    'Static vs Dynamic',
    'Ethical Scraping',
    'robots.txt',
  ],
  objectives: [
    'Explain what web scraping is and why it is indispensable for Data Science when no official API exists.',
    'Differentiate between human web browsing (visual interpretation) and programmatic web scraping (raw markup extraction).',
    'Recognize fundamental HTML markup elements (headings, paragraphs, divisions, anchors, images, tables).',
    'Understand how web browsers transform raw HTML text into an interactive tree known as the Document Object Model (DOM).',
    'Distinguish HTML elements, tags, attributes, classes, and unique IDs.',
    'Construct CSS selectors to precisely target single elements or groups of repetitive data cards.',
    'Explain the formal distinction between web scraping (network retrieval) and HTML parsing (structural interpretation).',
    'Use BeautifulSoup in Python to parse HTML documents into searchable Python object trees.',
    'Master the difference between soup.find() (first matching node) and soup.find_all() (ResultSet collection).',
    'Extract visible text with .get_text() and extract attribute values (such as href and src) via dictionary indexing.',
    'Parse HTML tables (<table>, <tr>, <th>, <td>) and convert tabular web records directly into Pandas DataFrames.',
    'Distinguish between static HTML pages and dynamic JavaScript-rendered applications.',
    'Evaluate ethical and legal scraping considerations: robots.txt, Terms of Service, server load, and API preference.',
  ],
  hook: {
    title: 'What If There Is No API?',
    story:
      'Imagine you are building a predictive machine learning model to estimate movie box-office returns. You need a rich dataset containing movie titles, audience ratings, genres, directors, and release years for over 5,000 films. You excitedly visit the leading film review websites and search for an official REST API. But there is no API. There are no JSON endpoints, no developer portals, and no downloadable CSV files. However, every single piece of information you need is clearly visible right there on the screen when you open the website in your browser. Are you stuck manually copy-pasting 5,000 titles and ratings one by one? Absolutely not. This is where Web Scraping enters the Data Science toolkit.',
    analogy:
      'Think of a webpage like a printed restaurant menu hung on a wall. A human walks up, reads the text, looks at the pictures, and chooses dinner. But a computer cannot "eat" visual pixels or understand a graphic layout directly. Web scraping is like an automated transcriber: it takes the raw printed structure of the menu, reads the headings and bullet points line by line, identifies the dish names and prices, and enters them cleanly into a digital spreadsheet for computation.',
    realWorldImpact:
      'Web scraping powers critical data feeds across global industries. E-commerce aggregators scrape millions of competitor prices hourly for dynamic repricing; real-estate analytics platforms track housing trends from property listings; hedge funds scrape job postings to gauge corporate growth; and academic researchers compile societal sentiment from news publications. When APIs do not exist, web scraping unlocks the vast, unstructured ocean of the public web for data science.',
  },
  coreConcept: {
    headline: 'Bridging the Gap: Transforming Human-Facing Webpages into Machine-Readable Datasets',
    explanation:
      'A webpage is fundamentally built for human beings to read with their eyes. Web scraping is the engineering discipline of programmatically fetching webpage markup (HTML), parsing its underlying tree structure (the DOM), selecting specific informational nodes, extracting their text and attributes, and reshaping that unstructured data into clean, tabular matrices ready for Data Science modeling.',
    keyPillars: [
      {
        title: 'The Webpage-to-Data Mental Model',
        description:
          'Data collection follows an unbroken pipeline: WEBPAGE → HTML → DOM → SELECT → EXTRACT → PARSE → STRUCTURED DATA → PANDAS DATAFRAME → ANALYSIS.',
      },
      {
        title: 'HTML & The DOM Tree',
        description:
          'HTML defines webpage content using nested tags (<h1>, <p>, <div>, <table>). When loaded, the browser constructs the Document Object Model (DOM)—a hierarchical tree of nodes that programs can navigate and query.',
      },
      {
        title: 'Targeted Selection (CSS Selectors & BeautifulSoup)',
        description:
          'Because webpages contain thousands of elements, we use CSS classes (.movie-title), IDs (#main-header), and tags to pinpoint target data. BeautifulSoup provides intuitive Python methods like .find() and .find_all().',
      },
      {
        title: 'Static vs Dynamic & Responsible Scraping',
        description:
          'Static HTML is fetched in a single request, while dynamic sites load content asynchronously via JavaScript. Respectful scrapers check robots.txt, respect rate limits, avoid overloading servers, and prefer official APIs whenever available.',
      },
    ],
  },
  interactiveType: 'scraping-lab',
  technicalExplanation: {
    title: 'The Anatomy of Web Scraping: Markup, DOM Traversal, BeautifulSoup & Ingestion Pipelines',
    deepDive:
      'The web scraping pipeline bridges raw internet markup and analytical Python matrices through systematic stages:\n\n1. Web Scraping vs. Human Browsing: When a human visits a website, the browser downloads HTML, CSS, and images, rendering a colorful visual document. When a data scientist scrapes a website, Python issues an HTTP GET request (via libraries like `requests`), receiving the raw textual HTML string. No visual browser rendering is required.\n\n2. HTML (HyperText Markup Language): HTML uses semantic tags to describe content structure:\n   • Headings: `<h1>` through `<h6>` for major section titles.\n   • Paragraphs: `<p>` for text blocks.\n   • Containers: `<div>` (division) and `<span>` (inline container) for grouping.\n   • Hyperlinks: `<a href="url">Link Text</a>` where `href` contains the destination URL.\n   • Images: `<img src="image.jpg" alt="Description">` where `src` holds the media URL.\n   • Tables: `<table>`, `<tr>` (table row), `<th>` (table header), and `<td>` (table data cell).\n\n3. The DOM (Document Object Model): When HTML is parsed, it forms a hierarchical tree. A root `<html>` element contains `<head>` and `<body>`. The `<body>` branches into parent containers, which contain child elements. Traversal allows navigations from parent to child, or querying specific branches by tag name, class attribute (`class="movie-card"`), or unique identifier (`id="featured"`).\n\n4. CSS Selectors: Selectors provide a concise syntax to match nodes:\n   • Tag selector: `h2` selects all `<h2>` elements.\n   • Class selector: `.movie-title` selects elements with `class="movie-title"`.\n   • Combined selector: `h2.movie-title` selects only `<h2>` elements with that specific class.\n   • Descendant selector: `.movie-card .rating` selects elements with class `rating` inside `.movie-card`.\n   • ID selector: `#top-rated` selects the single element with `id="top-rated"`.\n\n5. BeautifulSoup Workflow: BeautifulSoup (`bs4`) builds a navigable parse tree from raw HTML string:\n   • `soup = BeautifulSoup(html_doc, "html.parser")`\n   • `soup.find("tag", class_="name")`: Returns the very first matching element node (or `None`).\n   • `soup.find_all("tag", class_="name")`: Returns a collection (ResultSet) of all matching nodes.\n   • `element.get_text(strip=True)`: Extracts clean text content, stripping surrounding whitespace.\n   • `element["href"]` or `element.get("src")`: Extracts attribute values using dictionary syntax.\n\n6. HTML Tables to Pandas: HTML `<table>` structures represent pre-formatted grids. Using Python\'s `pandas.read_html(url_or_html)`, Pandas automatically identifies all `<table>` elements and converts them directly into a list of DataFrame objects.\n\n7. Static vs Dynamic Pages: In static websites, the data is directly embedded in the initial HTTP HTML response. In dynamic websites (built with React, Vue, or Angular), the initial HTML is merely an empty "shell"; client-side JavaScript then runs in the browser and calls underlying APIs to populate data. A basic `requests.get()` scraper only sees the empty shell. In such cases, inspecting the browser Network tab to find the direct underlying API is often the cleanest solution.\n\n8. Responsible Web Scraping: Automated scraping must be ethical:\n   • Always check the site\'s `robots.txt` file (e.g. `example.com/robots.txt`) to see allowed/disallowed paths.\n   • Throttle requests (e.g. `time.sleep(1)`) to avoid overwhelming remote servers.\n   • Include a descriptive `User-Agent` header in requests so site administrators can identify your script.\n   • Respect copyright, privacy, and Terms of Service (ToS).',
    bulletPoints: [
      'Web scraping is the programmatic extraction of data from human-oriented web pages.',
      'HTML structures webpage content; the DOM represents this content as a hierarchical, navigable tree.',
      'Elements consist of opening tags, attributes (class, id, href), inner content, and closing tags.',
      'CSS Selectors: Tag (`h2`), Class (`.movie-title`), ID (`#top-movie`), and Combined (`h2.movie-title`).',
      'Scraping vs. Parsing: Scraping fetches the raw HTML; Parsing interprets the structure for querying.',
      'BeautifulSoup: `soup.find()` extracts the first matching element; `soup.find_all()` extracts all matching elements.',
      'Extract text via `.get_text()`; extract attribute values (links, images) via dictionary indexing `node["href"]`.',
      'HTML tables (`<table>`) map directly into Pandas DataFrames using `pd.read_html()`.',
      'Dynamic pages load content with JavaScript; if data is missing from raw HTML, look for underlying APIs.',
      'Ethical scraping: Respect `robots.txt`, throttle request rates with `time.sleep()`, and prefer official APIs when available.',
    ],
  },
  codeExamples: [
    {
      title: '1. Ingesting & Parsing HTML with BeautifulSoup',
      description: 'The foundational Python workflow for parsing raw HTML markup, finding elements, and extracting text.',
      language: 'python',
      code: `from bs4 import BeautifulSoup

# Raw HTML markup (simulating what requests.get(url).text returns)
html_doc = """
<div class="movie-catalog">
    <h1 id="page-title">Top Rated Sci-Fi Films</h1>
    <div class="movie-card">
        <h2 class="movie-title">Interstellar</h2>
        <span class="rating">8.7</span>
        <p class="genre">Sci-Fi / Adventure</p>
    </div>
</div>
"""

# 1. Parse the HTML into a searchable BeautifulSoup tree
soup = BeautifulSoup(html_doc, "html.parser")

# 2. Extract the main heading using tag and ID
page_heading = soup.find("h1", id="page-title").get_text()
print(f"Heading: {page_heading}")

# 3. Extract the first movie title and rating
first_title = soup.find("h2", class_="movie-title").get_text()
first_rating = float(soup.find("span", class_="rating").get_text())
print(f"Featured Film: {first_title} (Rating: {first_rating})")`,
      lineExplanations: [
        { line: 1, text: 'Import BeautifulSoup from the bs4 library.' },
        { line: 15, text: 'Create the soup object using Python\'s built-in "html.parser".' },
        { line: 18, text: 'soup.find("h1", id="page-title") locates the exact heading by tag and unique ID.' },
        { line: 19, text: '.get_text() strips away the HTML tags and returns only the clean inner string.' },
        { line: 22, text: 'Note the use of class_="movie-title" (with an underscore) because "class" is a reserved keyword in Python.' },
        { line: 23, text: 'Cast the extracted rating string ("8.7") to a Python float for mathematical operations.' },
      ],
      output: `Heading: Top Rated Sci-Fi Films
Featured Film: Interstellar (Rating: 8.7)`,
    },
    {
      title: '2. Extracting Lists of Records & Attributes (find_all)',
      description: 'Iterating through multiple card elements, extracting both visible text and URL attributes into structured dictionaries.',
      language: 'python',
      code: `from bs4 import BeautifulSoup

html_doc = """
<div class="catalog">
    <div class="movie-card">
        <h2 class="title">Interstellar</h2>
        <span class="rating">8.7</span>
        <a class="link" href="/movies/interstellar">Details</a>
    </div>
    <div class="movie-card">
        <h2 class="title">Inception</h2>
        <span class="rating">8.8</span>
        <a class="link" href="/movies/inception">Details</a>
    </div>
    <div class="movie-card">
        <h2 class="title">Dune</h2>
        <span class="rating">8.0</span>
        <a class="link" href="/movies/dune">Details</a>
    </div>
</div>
"""

soup = BeautifulSoup(html_doc, "html.parser")

# Find all movie container cards (returns a ResultSet list)
movie_cards = soup.find_all("div", class_="movie-card")
print(f"Total movies found: {len(movie_cards)}\\n")

movies_dataset = []

for card in movie_cards:
    # Extract text from child elements within this card
    title = card.find("h2", class_="title").get_text(strip=True)
    rating = float(card.find("span", class_="rating").get_text(strip=True))
    
    # Extract attribute: href URL from the <a> tag
    details_url = card.find("a", class_="link")["href"]
    
    movies_dataset.append({
        "title": title,
        "rating": rating,
        "url": details_url
    })

for item in movies_dataset:
    print(f"• {item['title']:<14} | Rating: {item['rating']} | Path: {item['url']}")`,
      lineExplanations: [
        { line: 24, text: 'soup.find_all() searches the entire document and returns all 3 matching <div> elements.' },
        { line: 29, text: 'Iterate through each individual card container to extract its specific child fields.' },
        { line: 31, text: 'strip=True removes any unwanted surrounding whitespace or newline characters.' },
        { line: 35, text: 'Bracket notation link["href"] extracts the attribute value from the anchor tag.' },
        { line: 37, text: 'Construct a standardized dictionary record representing one observation row.' },
      ],
      output: `Total movies found: 3

• Interstellar   | Rating: 8.7 | Path: /movies/interstellar
• Inception      | Rating: 8.8 | Path: /movies/inception
• Dune           | Rating: 8.0 | Path: /movies/dune`,
    },
    {
      title: '3. Bridging HTML Tables Directly into Pandas DataFrames',
      description: 'Using pandas.read_html() to convert tabular HTML markup into clean analytical DataFrames in one step.',
      language: 'python',
      code: `import pandas as pd
from io import StringIO

# Sample HTML containing a structured data table
html_table = """
<table id="box-office">
    <thead>
        <tr>
            <th>Movie</th>
            <th>Year</th>
            <th>Budget ($M)</th>
            <th>Box Office ($M)</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Interstellar</td><td>2014</td><td>165</td><td>701.8</td></tr>
        <tr><td>Inception</td><td>2010</td><td>160</td><td>836.8</td></tr>
        <tr><td>Dune</td><td>2021</td><td>165</td><td>402.0</td></tr>
    </tbody>
</table>
"""

# Pandas parses all <table> tags and returns a list of DataFrames
dfs = pd.read_html(StringIO(html_table))
df = dfs[0]

# Add a calculated feature column: Return on Investment (ROI)
df["Profit ($M)"] = df["Box Office ($M)"] - df["Budget ($M)"]

print("Generated Pandas DataFrame:")
print(df.to_string(index=False))`,
      lineExplanations: [
        { line: 1, text: 'Import Pandas, the core tabular data manipulation library in Python.' },
        { line: 24, text: 'pd.read_html() scans the markup, parses <th> as column headers, and <td> as rows.' },
        { line: 25, text: 'Select the first DataFrame from the returned list of tables.' },
        { line: 28, text: 'Perform standard vector math across DataFrame columns: Box Office minus Budget.' },
        { line: 31, text: 'Display the clean tabular matrix ready for statistical exploration and machine learning.' },
      ],
      output: `Generated Pandas DataFrame:
      Movie  Year  Budget ($M)  Box Office ($M)  Profit ($M)
Interstellar  2014          165            701.8        536.8
   Inception  2010          160            836.8        676.8
        Dune  2021          165            402.0        237.0`,
    },
    {
      title: '4. Resilient & Responsible Scraping: Headers, Throttling & Safety',
      description: 'Writing ethical, production-grade scraping scripts with custom User-Agent headers, rate limiting, and exception guards.',
      language: 'python',
      code: `import requests
from bs4 import BeautifulSoup
import time

def fetch_and_parse_catalog(url: str):
    # 1. Provide a descriptive User-Agent header so site owners know who you are
    headers = {
        "User-Agent": "DataScienceEducationalScraper/1.0 (academic study; contact@example.edu)"
    }
    
    try:
        # 2. Issue the HTTP GET request with a strict timeout
        response = requests.get(url, headers=headers, timeout=10)
        
        # 3. Always check status code before parsing
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            titles = [h2.get_text(strip=True) for h2 in soup.find_all("h2", class_="title")]
            return titles
        elif response.status_code == 429:
            print("Warning: Rate limited (429)! Backing off...")
        else:
            print(f"Failed with HTTP Status: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"Network error encountered: {e}")
        
    return []

# 4. Respectful polite delay between page requests
pages = ["https://example.com/movies?page=1", "https://example.com/movies?page=2"]
for page_url in pages:
    data = fetch_and_parse_catalog(page_url)
    print(f"Fetched {len(data)} items from {page_url}")
    time.sleep(1.5)  # Polite 1.5-second interval between requests`,
      lineExplanations: [
        { line: 7, text: 'Custom User-Agent header declares your identity respectfully rather than hiding behind a generic bot.' },
        { line: 13, text: 'Specify timeout=10 to prevent the Python script from locking up if a server is unresponsive.' },
        { line: 16, text: 'Only parse HTML if the server returned a valid 200 OK status code.' },
        { line: 18, text: 'List comprehension succinctly extracts text from all matching <h2> headers.' },
        { line: 32, text: 'time.sleep(1.5) throttles request velocity, preventing server overload and IP bans.' },
      ],
      output: `# Diagnostic execution log:
# Fetched 3 items from https://example.com/movies?page=1
# (1.5s delay)
# Fetched 3 items from https://example.com/movies?page=2`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming web scraping means downloading an entire website.',
      why: 'Students often imagine scrapers as crawlers that download every single HTML page, CSS file, and asset on a server.',
      correction:
        'Web scraping in Data Science is precision extraction: we target specific data fields (e.g. titles, prices, ratings) from relevant pages, extracting only the values needed for our analytical model.',
      wrongCode: `# Misconception: "I must clone the entire website to disk"`,
      correctCode: `# Reality: Extracting only target fields into a structured dictionary
movie_data = {"title": soup.find("h2").text, "rating": soup.find(".rating").text}`,
    },
    {
      mistake: 'Believing that BeautifulSoup downloads webpages from the internet.',
      why: 'Because BeautifulSoup parses HTML, beginners assume calling BeautifulSoup("https://example.com") fetches the live site.',
      correction:
        'BeautifulSoup is strictly an HTML/XML parser. It cannot make network calls. You use an HTTP client like requests.get() to retrieve the raw HTML text, and then pass that text into BeautifulSoup.',
      wrongCode: `# ERROR: BeautifulSoup cannot make HTTP network requests
soup = BeautifulSoup("https://example.com/movies", "html.parser")`,
      correctCode: `# Correct: Use requests to download, then BeautifulSoup to parse
response = requests.get("https://example.com/movies")
soup = BeautifulSoup(response.text, "html.parser")`,
    },
    {
      mistake: 'Confusing HTML with the underlying data itself.',
      why: 'Students sometimes treat HTML tags as if they are dataset columns.',
      correction:
        'HTML is a visual and structural markup language for browsers. The data we want is embedded inside or between tags. We must extract the inner text (.get_text()) or attribute values (["href"]) to get pure data.',
      wrongCode: `# Mistake: Keeping the raw HTML tag in your dataset
dataset.append({"title": soup.find("h2")})  # Stores <h2>Interstellar</h2> as an object`,
      correctCode: `# Correct: Extract clean string value
dataset.append({"title": soup.find("h2").get_text(strip=True)})  # Stores "Interstellar"`,
    },
    {
      mistake: 'Assuming everything visible in your desktop browser is present in initial HTML.',
      why: 'Modern Single-Page Applications (React/Vue) load an empty HTML shell and fetch data later via JavaScript.',
      correction:
        'A basic Python requests.get() call only receives the initial HTML file sent by the server. If data is rendered asynchronously by JavaScript, the initial HTML will not contain it. You must inspect the Network tab for the underlying API or use browser automation.',
      wrongCode: `# Calling find() on an empty JS container returns None
soup.find("div", class_="dynamic-feed")  # None!`,
      correctCode: `# Check browser Network tab for the actual JSON endpoint or use automation
res = requests.get("https://example.com/api/v1/feed")  # Fetch direct JSON payload`,
    },
    {
      mistake: 'Assuming that if a webpage is publicly accessible, scraping it is automatically permitted.',
      why: 'Learners believe that anything viewable in a browser is free of all restrictions.',
      correction:
        'Public accessibility does not waive website Terms of Service, copyright protections, privacy laws (GDPR), or server capacity limits. Always check robots.txt, avoid scraping personal data, and throttle your requests.',
      wrongCode: `# Dangerous: Hammering a public site with 500 requests/second in a while loop`,
      correctCode: `# Responsible: Check robots.txt, add User-Agent, throttle with time.sleep(1)`,
    },
    {
      mistake: 'Believing that web scraping is always superior to using an official API.',
      why: 'Students think scraping gives them complete freedom without needing to sign up for API keys.',
      correction:
        'Web scraping is inherently fragile: if the website designer renames a CSS class or updates page layout tomorrow, your scraper will break instantly. Official APIs offer stable, documented, contract-backed data feeds.',
      wrongCode: `# Scraping fragile HTML when an official /api/v1/movies endpoint is readily available`,
      correctCode: `# Prefer API first for stability; use scraping when no official API exists`,
    },
  ],
  thinkingStrategies: [
    {
      question: 'How do I choose between an official API and web scraping for my project?',
      context: 'You have identified an empirical question and need to collect real-world observations.',
      reasoning:
        'Always check for an official REST API first. APIs provide structured JSON, clear documentation, and contractual stability. If no API exists, or if the API does not expose the required fields, web scraping is your primary tool.',
      ruleOfThumb:
        'Priority: 1. Official REST API → 2. Public Dataset Archive → 3. Ethical Web Scraping as the fallback.',
    },
    {
      question: 'How do I inspect a webpage to determine the right CSS selector?',
      context: 'You are looking at a webpage and need to know what tag and class wraps the data you want.',
      reasoning:
        'Right-click the target element in your browser and click "Inspect". Look at the highlighted element in the Elements tab: observe its tag name (e.g. <h2>), its class attribute (class="movie-title"), and check if multiple cards share the identical class pattern.',
      ruleOfThumb:
        'Find the repeating parent container first (e.g. .movie-card), then find the specific child field inside each container (e.g. .title).',
    },
    {
      question: 'When should I use soup.find() vs soup.find_all()?',
      context: 'Deciding which BeautifulSoup querying method to call.',
      reasoning:
        'Use .find() when you expect exactly one unique element on the page (such as the main title #page-title or the <table id="summary">). Use .find_all() when querying repeating items like a list of products, search results, or rows.',
      ruleOfThumb:
        'One unique header or parent → .find() | Many repetitive cards or rows → .find_all().',
    },
    {
      question: 'What should I do if my scraper returns None or empty lists?',
      context: 'Your selector looks correct in your browser, but BeautifulSoup finds nothing.',
      reasoning:
        'Check if the content is dynamically rendered by JavaScript. View the raw HTML source (Ctrl+U or Cmd+Option+U) rather than the browser Elements panel. If the text is missing from raw source, the page uses JavaScript. Inspect the Network tab to find the internal API.',
      ruleOfThumb:
        'If data appears in Elements but is missing from View Source → it is dynamic JavaScript content.',
    },
  ],
  quiz: [
    {
      id: 'm2-t2-q1',
      question: 'What is the primary definition of Web Scraping in Data Science?',
      options: [
        'Downloading the entire source code and binary assets of a web server to replace its database.',
        'The programmatic extraction of selected information from human-facing webpages into structured data.',
        'Designing cascading style sheets (CSS) to format browser fonts and colors.',
        'Encrypting passwords inside browser cookies using cryptographic hashes.',
      ],
      correctIndex: 1,
      explanation:
        'Web scraping is the process of programmatically requesting web pages, parsing their markup, and extracting specific information into structured formats suitable for computational analysis.',
    },
    {
      id: 'm2-t2-q2',
      question: 'How does web scraping fundamentally differ from human web browsing?',
      options: [
        'Humans view visually rendered pages with graphics and layouts, while scraping programs extract raw data from underlying HTML markup.',
        'Scraping programs can only read binary machine code, while humans read HTML.',
        'Humans connect via HTTP, while scraping programs use satellite telemetry.',
        'Browsing requires an internet connection, but web scraping works entirely offline without network access.',
      ],
      correctIndex: 0,
      explanation:
        'Browsers render HTML, CSS, and images into a visual canvas for human consumption. Web scrapers download the raw markup text and parse element nodes directly without needing visual rendering.',
    },
    {
      id: 'm2-t2-q3',
      question: 'What is the Document Object Model (DOM)?',
      options: [
        'A Python library used exclusively for training neural networks.',
        'A hierarchical, tree-like representation of a webpage constructed by browsers and parsers from HTML markup.',
        'A physical hard drive partition storing temporary internet files.',
        'A security certificate validating an SSL/TLS connection.',
      ],
      correctIndex: 1,
      explanation:
        'The DOM is a tree structure representing all HTML elements (nodes), their nested parent-child relationships, and attributes, allowing programs to navigate and query specific parts of a document.',
    },
    {
      id: 'm2-t2-q4',
      question: 'In the HTML snippet `<h2 class="movie-title">Interstellar</h2>`, which CSS selector targets this element by its class?',
      options: [
        '#movie-title',
        '.movie-title',
        'movie-title()',
        '<movie-title>',
      ],
      correctIndex: 1,
      explanation:
        'In CSS selector syntax, a period (.) denotes a class name (e.g. .movie-title), while a hash (#) denotes an ID.',
    },
    {
      id: 'm2-t2-q5',
      question: 'What is the primary role of the BeautifulSoup library in Python?',
      options: [
        'To send high-speed asynchronous network packets across routers.',
        'To parse raw HTML/XML text into a navigable Python tree for searching and extracting elements.',
        'To train linear regression models on structured data.',
        'To convert Python scripts into native mobile apps.',
      ],
      correctIndex: 1,
      explanation:
        'BeautifulSoup is an HTML/XML parser. It takes raw markup text and constructs a searchable tree of Python objects equipped with methods like .find() and .find_all().',
    },
    {
      id: 'm2-t2-q6',
      question: 'What is the key difference between soup.find("h2") and soup.find_all("h2") in BeautifulSoup?',
      options: [
        'find() returns the first matching element, while find_all() returns a collection (ResultSet) of all matching elements.',
        'find() searches for classes, while find_all() searches only for IDs.',
        'find() executes on the server, while find_all() executes on the client.',
        'find() returns a Pandas DataFrame, while find_all() returns a NumPy array.',
      ],
      correctIndex: 0,
      explanation:
        'find() scans the tree and returns the single first matching element (or None). find_all() scans the entire tree and returns a list-like ResultSet of all matching elements.',
    },
    {
      id: 'm2-t2-q7',
      question: 'Given the tag `<a href="/movies/interstellar">Interstellar</a>` stored in variable link, how do you extract the destination URL path in BeautifulSoup?',
      options: [
        'link.get_text()',
        'link["href"]',
        'link.url()',
        'link.to_string("href")',
      ],
      correctIndex: 1,
      explanation:
        'In BeautifulSoup, HTML attributes are accessed using dictionary bracket notation on the element (e.g. link["href"] or link.get("href")). .get_text() would only extract the inner string "Interstellar".',
    },
    {
      id: 'm2-t2-q8',
      question: 'Which Pandas function allows you to directly read and convert all HTML <table> elements into a list of DataFrames?',
      options: [
        'pd.read_csv()',
        'pd.read_html()',
        'pd.to_dataframe()',
        'pd.parse_table()',
      ],
      correctIndex: 1,
      explanation:
        'pd.read_html() searches an HTML string or URL for <table> elements and parses table headers (<th>) and rows (<tr>/<td>) directly into Pandas DataFrames.',
    },
    {
      id: 'm2-t2-q9',
      question: 'Why does a simple requests.get() scraper often fail to extract data from modern "Dynamic" websites?',
      options: [
        'Because dynamic websites do not use HTTP protocols.',
        'Because data is rendered asynchronously in the browser by JavaScript after the initial HTML shell is delivered.',
        'Because Python cannot interpret characters in UTF-8 encoding.',
        'Because BeautifulSoup cannot parse HTML tables.',
      ],
      correctIndex: 1,
      explanation:
        'Dynamic websites send a lightweight initial HTML shell and use client-side JavaScript to fetch data from APIs and populate the DOM. A simple HTTP GET request only downloads the initial empty shell.',
    },
    {
      id: 'm2-t2-q10',
      question: 'What is a fundamental rule of ethical and responsible web scraping?',
      options: [
        'Send at least 500 requests per second to finish the scraping job as fast as possible.',
        'Check robots.txt, respect server rate limits (throttle requests), and prefer an official API if available.',
        'Scrape private user accounts by bypassing authentication barriers.',
        'Always delete the website\'s server logs after scraping.',
      ],
      correctIndex: 1,
      explanation:
        'Responsible web scraping involves checking robots.txt, throttling request frequency with polite delays (time.sleep()), declaring a descriptive User-Agent, respecting Terms of Service, and choosing official APIs when they exist.',
    },
  ],
  summary: {
    takeaways: [
      'Web Scraping fills the gap: When no official REST API exists, scraping allows programmatic data collection from public web markup.',
      'The Core Mental Model: Webpage → HTML → DOM → Select → Extract → Parse → Structured Data → Pandas DataFrame → Analysis.',
      'HTML Anatomy: Content is organized into semantic elements (<h1>, <p>, <div>, <a>, <img>, <table>) with classes and IDs.',
      'The DOM Tree: Parsers represent HTML as a navigable hierarchy of parent, child, and sibling nodes.',
      'CSS Selectors: Use tag names (h2), classes (.movie-title), IDs (#top-rated), and combinations (h2.title) to target nodes.',
      'BeautifulSoup Workflow: soup.find() targets the first match; soup.find_all() returns a collection of all matches.',
      'Text vs. Attributes: Extract visible text using .get_text() and attribute metadata (links, image sources) using dictionary keys (node["href"]).',
      'HTML to Pandas: pd.read_html() directly parses <table> grids into analytical DataFrames.',
      'Static vs. Dynamic: Static HTML contains data immediately; dynamic apps load content via JavaScript (check the Network tab for underlying APIs).',
      'Ethical Practice: Respect robots.txt, throttle requests (time.sleep()), set descriptive User-Agent headers, and prioritize official APIs.',
    ],
    nextUpText:
      'Now that we can collect raw data from both REST APIs and Web Scraping pipelines, the next crucial question is: "What kind of data did we actually collect?" In Topic 2.3: Data Types and Sources, we explore structured, semi-structured, and unstructured data modalities, measurement scales, and file formats (CSV, Parquet, JSON, SQL).',
  },
  prevTopic: {
    slug: 'apis-and-data-streams',
    title: '2.1 APIs & Data Streams',
  },
  nextTopic: {
    slug: 'data-types-and-sources',
    title: '2.3 Data Types and Sources',
  },
};
