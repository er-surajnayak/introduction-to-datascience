import { LessonContent } from '@/types/lesson';

export const topic2_1: LessonContent = {
  id: 'm2-t1',
  topicNumber: '2.1',
  slug: 'apis-and-data-streams',
  moduleId: 'module-2',
  title: 'APIs & Data Streams',
  subtitle: 'Where Data Originates: Request-Response, REST Endpoints, JSON Pipelines & Live Event Streams',
  estimatedMinutes: 30,
  difficulty: 'Intermediate',
  tags: ['APIs', 'REST', 'Requests', 'JSON', 'Endpoints', 'Data Streams', 'Streaming vs Batch', 'Data Ingestion'],
  objectives: [
    'Explain what an API is and why it is the primary engine for real-world automated data collection.',
    'Master the Request-Response lifecycle and the client-server interaction model.',
    'Identify what an API endpoint is and how URL paths expose specific resources.',
    'Understand the HTTP GET method and why it is the dominant method for Data Science ingestion.',
    'Construct and interpret query parameters to request targeted subsets of data.',
    'Recognize JSON as the universal structured data exchange format and inspect keys, values, and types.',
    'Translate external API responses into native Python dictionaries using requests.get() and .json().',
    'Aggregate multiple individual API responses into structured multi-row datasets for analysis.',
    'Diagnose essential HTTP status codes (200, 400, 401, 404, 429, 500) and handle failures gracefully.',
    'Understand API authentication and strictly protect secret API keys from public exposure.',
    'Distinguish between discrete batch processing and continuous, real-time data streams.',
    'Compare official APIs with Web Scraping to choose the most reliable data collection strategy.',
  ],
  hook: {
    title: 'When Your Weather App Shows 28°C, Did Someone Manually Type It In?',
    story:
      'Imagine waking up on a cloudy morning. You tap your weather app and immediately see: "28°C, 72% Humidity, Belagavi". Did a meteorologist sit at a desk and manually type that number into millions of smartphone screens before sunrise? Of course not. Your weather app sent an automated electronic message across the web to a remote meteorological server, requested the latest sensor telemetry for your location, received a structured data payload back in 40 milliseconds, and displayed it. In Module 1, you learned how to manipulate variables, loops, functions, and NumPy arrays on your local computer. But in the real world, data does not originate inside your computer—it resides in databases, cloud services, satellites, and sensors scattered across the globe. Before you can clean, transform, or analyze data, you have to collect it. That is where APIs enter the story.',
    analogy:
      'Think of an API like a professional waiter in a busy restaurant. You (the client application) sit at a dining table. You cannot walk directly into the kitchen (the private database and server) to forage through the refrigerators or fiddle with the stove. Instead, you look at the menu (the API documentation), pick what you want, and give your order to the waiter (the API). The waiter carries your specific request into the kitchen, the chefs prepare your meal (data retrieval and computation), and the waiter carries the finished plate (the JSON response) back to your table. The waiter is not the kitchen, not the chef, and not the food—the waiter is the standardized communication interface.',
    realWorldImpact:
      'Over 80% of enterprise data workflows rely on APIs. Financial algorithms query market APIs (Bloomberg, AlphaVantage) every millisecond; autonomous vehicle fleets stream telematics to cloud navigation APIs; e-commerce platforms ingest live inventory from logistics APIs; and AI systems consume training feeds via streaming endpoints. Understanding APIs connects your Python code to the living, breathing global internet.',
  },
  coreConcept: {
    headline: 'The Structured Bridge Between Remote Services and Python Data Pipelines',
    explanation:
      'An Application Programming Interface (API) is a formal set of rules and protocols allowing one software application to request data or functionality from another software application. An API is not a database, nor is it a user interface. It is an exposed doorway. In Data Science, we predominantly interact with Web APIs (specifically RESTful APIs) that transfer structured data payloads—usually formatted as JSON—over standard HTTP network protocols.',
    keyPillars: [
      {
        title: 'The Request-Response Model',
        description:
          'Software communication operates as a structured dialogue: the client transmits an HTTP request specifying an endpoint and parameters; the remote server processes the query and returns an HTTP response containing a status code and payload.',
      },
      {
        title: 'Endpoints & Query Parameters',
        description:
          'An endpoint is a specific URL doorway into a service (e.g. /weather). Query parameters (e.g. ?city=Belagavi&units=metric) append key-value filters to tell the server precisely which slice of data to deliver.',
      },
      {
        title: 'JSON: The Universal Data Cargo',
        description:
          'JavaScript Object Notation (JSON) is a lightweight, human-readable format for representing structured records. It maps seamlessly into Python data structures: JSON objects become Python dicts, and JSON arrays become Python lists.',
      },
      {
        title: 'Data Streams vs. Batch Collections',
        description:
          'Data collection occurs in two primary temporal paradigms: Batch ingestion (gathering historical blocks of accumulated data at scheduled intervals) and Streaming ingestion (processing an endless sequence of events in real time as they occur).',
      },
    ],
  },
  interactiveType: 'api-lab',
  technicalExplanation: {
    title: 'The Architecture of Data Ingestion: Requests, JSON Payloads & Streaming Telemetry',
    deepDive:
      'The foundational mental model of modern data collection follows an unbroken pipeline:\n\nQUESTION → API REQUEST → API SERVER → RESPONSE (JSON) → PYTHON DATA → DATASET → ANALYSIS\n\n1. The HTTP Request: When a Python script or mobile app contacts an API, it issues an HTTP request. The request includes a Uniform Resource Identifier (URI), an HTTP method (such as GET to retrieve information or POST to submit information), optional request headers (which may carry authentication credentials or content specifications), and optional query parameters.\n\n2. Endpoints: An API exposes specific resources at dedicated paths called endpoints. For example, a single weather service might expose `/v1/current` for real-time readings, `/v1/forecast` for multi-day predictions, and `/v1/air-quality` for pollution indices. Each endpoint acts as a distinct doorway.\n\n3. Query Parameters: Appended to the URL after a question mark `?`, query parameters specify criteria. In `https://api.example.com/weather?city=Belagavi&units=metric`, the server parses two parameters: `city` with value `"Belagavi"`, and `units` with value `"metric"`.\n\n4. The HTTP Response & Status Codes: The server responds with metadata and a body. The three-digit status code immediately informs the client of the outcome:\n   • 200 OK: Request succeeded; data is attached in the response body.\n   • 400 Bad Request: The client sent malformed syntax or unrecognized parameters.\n   • 401 Unauthorized: The request lacks valid authentication credentials (e.g., missing API key).\n   • 404 Not Found: The requested endpoint URL or specific resource does not exist on the server.\n   • 429 Too Many Requests: The client exceeded rate limits; the server demands a backoff period.\n   • 500 Internal Server Error: The server crashed while trying to process the request.\n\n5. JSON to Python: The response body is almost universally serialized as JSON (JavaScript Object Notation). Using Python\'s `requests` library, invoking `response.json()` deserializes the text string directly into native Python dictionaries and lists. From there, standard key indexing like `data["temperature"]` allows immediate mathematical processing or conversion into Pandas DataFrames.\n\n6. Data Streams: Traditional analytics work with static, bounded files (like CSVs loaded from disk). However, many modern data sources—such as stock exchanges, IoT weather stations, and social media feeds—produce data continuously. A data stream is an infinite, unbounded sequence of data items delivered over time, requiring real-time consumption and rolling aggregation.',
    bulletPoints: [
      'HTTP GET is the standard method for data scientists because it retrieves data without altering server state.',
      'Endpoints function like URL doorways; query parameters (?key=value&key2=val2) filter and customize the query.',
      'JSON organizes data into key-value pairs (maps/dicts) and ordered sequences (arrays/lists).',
      'Python deserialization: `import requests; res = requests.get(url); data = res.json()` turns network text into live Python dictionaries.',
      'Status codes provide instant diagnostics: 200 (Success), 401 (Auth Error), 404 (Missing Resource), 429 (Rate Limited).',
      'API Key Security: Never commit raw API secrets into git repositories or frontend code; store them in server-side environment variables.',
      'Batch vs Streaming: Batch processes accumulated snapshots (e.g. daily sales reports); Streaming processes continuous event sequences (e.g. sensor readings every second).',
      'API vs Web Scraping: APIs provide structured, intended, contract-backed data access; web scraping parses raw HTML and is fragile to layout changes.',
    ],
  },
  codeExamples: [
    {
      title: '1. Ingesting Data from an API with Python requests',
      description: 'The standard, idiomatic pattern for fetching data from a REST endpoint and parsing JSON.',
      language: 'python',
      code: `import requests

# 1. Define the API endpoint and target query parameters
url = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": 15.8497,
    "longitude": 74.4977,
    "current_weather": True
}

# 2. Send the HTTP GET request
response = requests.get(url, params=params)

# 3. Check status code and deserialize the JSON payload
if response.status_code == 200:
    data = response.json()
    current = data["current_weather"]
    print(f"Belagavi Temperature: {current['temperature']}°C")
    print(f"Windspeed: {current['windspeed']} km/h")
else:
    print(f"API Error: Status {response.status_code}")`,
      lineExplanations: [
        { line: 1, text: 'Import the requests library, Python\'s premier tool for HTTP communication.' },
        { line: 4, text: 'The base endpoint URL providing weather forecasts.' },
        { line: 5, text: 'A Python dictionary containing query parameters automatically converted to ?key=value format.' },
        { line: 12, text: 'requests.get() issues the HTTP GET request across the network to the remote server.' },
        { line: 15, text: 'Check that the status code is 200 OK before processing data.' },
        { line: 16, text: 'response.json() parses the raw JSON string into a nested Python dictionary.' },
        { line: 17, text: 'Access nested dictionary keys using standard Python bracket notation: data["current_weather"].' },
      ],
      output: `Belagavi Temperature: 28.2°C
Windspeed: 12.4 km/h`,
    },
    {
      title: '2. From Multiple API Responses to a Structured Dataset',
      description: 'Requesting data for multiple entities in a loop and constructing a tabular dataset ready for analysis.',
      language: 'python',
      code: `import requests

cities = [
    {"name": "Belagavi", "lat": 15.85, "lon": 74.50},
    {"name": "Mumbai",   "lat": 19.07, "lon": 72.87},
    {"name": "Delhi",    "lat": 28.61, "lon": 77.20},
    {"name": "Bengaluru","lat": 12.97, "lon": 77.59}
]

weather_records = []

for city in cities:
    params = {"latitude": city["lat"], "longitude": city["lon"], "current_weather": True}
    res = requests.get("https://api.open-meteo.com/v1/forecast", params=params)
    
    if res.status_code == 200:
        temp = res.json()["current_weather"]["temperature"]
        weather_records.append({
            "city": city["name"],
            "temperature_c": temp
        })

# The result is a clean list of records ready for Pandas or NumPy!
print("Collected Dataset:")
for row in weather_records:
    print(f" - {row['city']:<12}: {row['temperature_c']}°C")`,
      lineExplanations: [
        { line: 3, text: 'A list of dictionaries representing our study cohort of geographic locations.' },
        { line: 10, text: 'An empty accumulator list to hold our structured records.' },
        { line: 12, text: 'Iterate over each target city and formulate custom query parameters.' },
        { line: 17, text: 'Extract the specific numerical measurement from the JSON dictionary.' },
        { line: 18, text: 'Append a standardized row representation into the dataset.' },
        { line: 24, text: 'Print the synthesized tabular dataset collected from 4 separate API calls.' },
      ],
      output: `Collected Dataset:
 - Belagavi    : 28.2°C
 - Mumbai      : 31.4°C
 - Delhi       : 34.1°C
 - Bengaluru   : 25.6°C`,
    },
    {
      title: '3. Robust API Ingestion: Handling Status Codes & Rate Limits',
      description: 'Writing resilient production code that gracefully detects 404, 429, and network timeouts.',
      language: 'python',
      code: `import requests
import time

def fetch_sensor_data(sensor_id):
    endpoint = f"https://api.sensors.org/v1/telemetry/{sensor_id}"
    headers = {"Authorization": "Bearer SECURE_TOKEN_FROM_ENV"}
    
    try:
        response = requests.get(endpoint, headers=headers, timeout=5)
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print(f"Warning: Sensor {sensor_id} does not exist (404).")
        elif response.status_code == 429:
            print("Rate limit reached (429)! Backing off for 10 seconds...")
            time.sleep(10)
        else:
            print(f"Server error: {response.status_code}")
            
    except requests.exceptions.Timeout:
        print("Request timed out! Server took longer than 5 seconds.")
    except requests.exceptions.ConnectionError:
        print("Network error: Could not reach the host.")
        
    return None`,
      lineExplanations: [
        { line: 6, text: 'Authentication token passed in HTTP headers rather than exposed in the URL.' },
        { line: 9, text: 'Always specify a timeout (e.g. 5 seconds) so your script does not hang indefinitely.' },
        { line: 13, text: 'Explicitly check for 404 Not Found to catch bad sensor IDs.' },
        { line: 15, text: '429 indicates rate limiting; respectful scripts back off and wait before retrying.' },
        { line: 20, text: 'Handle connection timeouts and network drops with structured try/except blocks.' },
      ],
      output: `# Diagnostic output depends on server conditions.
# Returns clean parsed dict on 200, or gracefully logs errors.`,
    },
    {
      title: '4. Processing a Live Data Stream Event Queue',
      description: 'Consuming simulated incoming readings over time and maintaining running summary statistics.',
      language: 'python',
      code: `import numpy as np

class TemperatureStreamConsumer:
    def __init__(self, window_size=5):
        self.window_size = window_size
        self.buffer = []
        
    def ingest_event(self, reading: float):
        self.buffer.append(reading)
        if len(self.buffer) > self.window_size:
            self.buffer.pop(0)  # Maintain sliding window of latest readings
            
        arr = np.array(self.buffer)
        print(f"Ingested: {reading:.1f}°C | "
              f"Window Mean: {arr.mean():.2f}°C | "
              f"Window Max: {arr.max():.1f}°C")

consumer = TemperatureStreamConsumer(window_size=3)
stream_events = [28.1, 28.4, 28.2, 28.9, 29.3]

for reading in stream_events:
    consumer.ingest_event(reading)`,
      lineExplanations: [
        { line: 4, text: 'Maintain a finite sliding window buffer to process unbounded data streams in limited memory.' },
        { line: 8, text: 'Ingest a single reading as it arrives from an event stream.' },
        { line: 10, text: 'Evict older readings once the buffer limit is reached (sliding window).' },
        { line: 12, text: 'Compute real-time rolling statistics (mean, max) using NumPy vector operations.' },
      ],
      output: `Ingested: 28.1°C | Window Mean: 28.10°C | Window Max: 28.1°C
Ingested: 28.4°C | Window Mean: 28.25°C | Window Max: 28.4°C
Ingested: 28.2°C | Window Mean: 28.23°C | Window Max: 28.4°C
Ingested: 28.9°C | Window Mean: 28.50°C | Window Max: 28.9°C
Ingested: 29.3°C | Window Mean: 28.80°C | Window Max: 29.3°C`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming the API is the database itself.',
      why: 'Students often believe an API stores records directly like a SQL table or MongoDB collection.',
      correction:
        'An API is simply an interface (a protocol and set of doorways). The remote server uses the API to translate requests into internal database queries, enforce permissions, and return clean output.',
      wrongCode: `# Misconception: "I am writing directly to the database"
requests.get("https://api.example.com/database")`,
      correctCode: `# Reality: Asking an exposed service endpoint to query its internal systems
requests.get("https://api.example.com/v1/weather?city=Belagavi")`,
    },
    {
      mistake: 'Confusing JSON with the API itself.',
      why: 'Students frequently refer to "the JSON" as if it were the remote service.',
      correction:
        'The API is the communication system and interface. JSON (JavaScript Object Notation) is merely the textual format used to package and serialize the data being transported.',
      wrongCode: `# Saying: "Let me call the JSON"`,
      correctCode: `# Saying: "I sent a request to the API, and it returned a JSON payload"`,
    },
    {
      mistake: 'Believing that an HTTP GET request always returns JSON.',
      why: 'Since modern data science APIs return JSON, learners assume GET equals JSON.',
      correction:
        'GET describes the action ("retrieve resource"). An API can return JSON, XML, plain text, CSV, an image, or HTML depending on the Content-Type header.',
      wrongCode: `# Blindly calling .json() without verifying content type
data = response.json()  # Crashes if the response was HTML or an error page!`,
      correctCode: `# Check status and verify content
if response.status_code == 200:
    data = response.json()`,
    },
    {
      mistake: 'Hardcoding secret API keys in client-side code or public GitHub repositories.',
      why: 'Learners paste private credentials directly into JavaScript files or push notebooks with tokens to public repos.',
      correction:
        'Public client code is visible to anyone inspecting network traffic or web source. Bots constantly scrape GitHub for tokens. Keep API keys in server-side environment variables (.env files) that are never committed to version control.',
      wrongCode: `// DANGEROUS: Visible to every user and web scraper
const API_KEY = "sk-live-938472918374928174912";`,
      correctCode: `# Safe: Stored in server environment variable
import os
api_key = os.getenv("METEO_API_KEY")`,
    },
    {
      mistake: 'Assuming every API request succeeds without inspecting status codes.',
      why: 'Beginners write scripts assuming status 200, causing catastrophic crashes when a 404 or 429 occurs.',
      correction:
        'Always check response.status_code before attempting to parse or access payload keys. Implement retry mechanisms or logging for 4xx and 5xx errors.',
      wrongCode: `response = requests.get(url)
temp = response.json()["temperature"]  # KeyError if server returned 404 or 429!`,
      correctCode: `response = requests.get(url)
if response.status_code == 200:
    temp = response.json().get("temperature")
elif response.status_code == 429:
    print("Rate limit reached. Please wait.")`,
    },
    {
      mistake: 'Believing that data streaming means data is retained forever.',
      why: 'Learners conflate continuous data arrival with unbounded storage.',
      correction:
        'Streaming describes the dynamic mechanism of transmission and processing—events arrive in sequence. Storing high-velocity stream data long-term requires dedicated pipelines, aggregations, or sliding-window buffers.',
      wrongCode: `# Assuming stream data automatically persists in RAM forever
infinite_stream = []  # Will eventually crash with Out Of Memory (OOM)!`,
      correctCode: `# Process stream events in sliding windows or write them to persistent storage
buffer.append(new_reading)
if len(buffer) > MAX_WINDOW:
    buffer.pop(0)`,
    },
  ],
  thinkingStrategies: [
    {
      question: 'Where should I look first when collecting data for a project?',
      context: 'You have identified an empirical question and need real-world observations to test your hypothesis.',
      reasoning:
        'Always check if an official, well-documented REST API exists before resorting to manual data entry or web scraping. Official APIs are structured, versioned, contract-bound, and much less likely to break unexpectedly.',
      ruleOfThumb:
        'Official API first → Public Dataset (Kaggle/Government) second → Web Scraping third as a last resort.',
    },
    {
      question: 'How do I know what query parameters an endpoint supports?',
      context: 'You have found a base URL like api.weather.org/v1/forecast but do not know how to request specific cities or metrics.',
      reasoning:
        'Never guess parameter names. Always inspect the official API documentation. Documentation lists available endpoints, required parameters, optional filters, authentication headers, and sample JSON responses.',
      ruleOfThumb:
        'Treat API documentation like a formal contract: it dictates exact parameter spellings, supported units, and rate limits.',
    },
    {
      question: 'How do I bridge a JSON response into a tabular Data Science matrix?',
      context: 'Your API call returns an object with nested metadata, headers, coordinates, and an array of hourly readings.',
      reasoning:
        'Identify which key holds the repeating array of observations. In Python, unpack the target list and map each element into a clean, flat dictionary containing only the features you need for your model.',
      ruleOfThumb:
        'Extract the target list from the top-level JSON dict, map it into a list of row dicts, and convert to a Pandas DataFrame.',
    },
    {
      question: 'When does a project require a streaming architecture instead of batch processing?',
      context: 'Deciding whether to write a script that runs once per day or set up a continuous listener.',
      reasoning:
        'Consider the required decision latency. If insights are needed within seconds (e.g. high-frequency trading alerts, medical emergency alarms, real-time traffic rerouting), you need streaming. If decisions can be made daily or hourly (e.g. quarterly sales reporting, monthly churn analysis), batch processing is simpler, cheaper, and more robust.',
      ruleOfThumb:
        'If action latency is measured in seconds or milliseconds → Streaming. If latency is measured in hours or days → Batch.',
    },
  ],
  quiz: [
    {
      id: 'm2-t1-q1',
      question: 'What is the primary function of an Application Programming Interface (API) in Data Science?',
      options: [
        'To serve as a relational database that stores SQL tables directly inside Python.',
        'To act as a standardized interface allowing software to request data or services from another system.',
        'To compile Python code into machine language for high-speed matrix multiplications.',
        'To design interactive graphical user interfaces and CSS web styling.',
      ],
      correctIndex: 1,
      explanation:
        'An API is an interface—a defined set of rules and protocols—that allows one software program to request data or services from another remote system without needing direct access to its internal database or hardware.',
    },
    {
      id: 'm2-t1-q2',
      question: 'In the restaurant analogy, which component represents the API?',
      options: [
        'The dining customer who sits at the table.',
        'The kitchen stoves and refrigerators where food is prepared.',
        'The waiter who takes the order, delivers it to the kitchen, and returns with the meal.',
        'The physical restaurant building and furniture.',
      ],
      correctIndex: 2,
      explanation:
        'The waiter is the communication interface. The customer (your client app) gives an order (the request) to the waiter (the API), who brings it to the kitchen (server/database) and delivers the prepared meal (the response) back to the table.',
    },
    {
      id: 'm2-t1-q3',
      question: 'What is an API endpoint?',
      options: [
        'The final line of code executed in a Python script.',
        'A specific URL/path through which an API exposes a particular resource or operation.',
        'The physical Ethernet cable connecting a server to a router.',
        'The database index that terminates a SQL query.',
      ],
      correctIndex: 1,
      explanation:
        'An endpoint is a specific URL path (e.g. /v1/weather or /v1/air-quality) representing a dedicated doorway or resource exposed by the API.',
    },
    {
      id: 'm2-t1-q4',
      question: 'Why is the HTTP GET method the primary method used in introductory Data Science data collection?',
      options: [
        'Because GET is the only method that can encrypt passwords.',
        'Because GET is used to retrieve data from a server without modifying the server state.',
        'Because GET automatically deletes old records from the database.',
        'Because GET bypasses all network firewalls and rate limits.',
      ],
      correctIndex: 1,
      explanation:
        'GET is designed for safe data retrieval. It asks the server: "Give me this data," without altering, inserting, or deleting any records on the remote server.',
    },
    {
      id: 'm2-t1-q5',
      question: 'In the URL `https://api.weather.org/v1/forecast?city=Belagavi&units=metric`, what is `city=Belagavi`?',
      options: [
        'An HTTP header defining authorization credentials.',
        'A query parameter providing specific filter criteria to the endpoint.',
        'The top-level domain name of the hosting server.',
        'A Python dictionary variable.',
      ],
      correctIndex: 1,
      explanation:
        'Text following the `?` consists of query parameters separated by `&`. Here, `city=Belagavi` is a query parameter telling the endpoint which city\'s forecast to return.',
    },
    {
      id: 'm2-t1-q6',
      question: 'What data structure does a JSON object `{ "city": "Belagavi", "temperature": 28 }` deserialize into in Python?',
      options: [
        'A Python tuple: `("Belagavi", 28)`.',
        'A Python dictionary: `{"city": "Belagavi", "temperature": 28}`.',
        'A NumPy 2D array: `np.array([["city", "Belagavi"]])`.',
        'A Python set: `{"Belagavi", 28}`.',
      ],
      correctIndex: 1,
      explanation:
        'JSON objects consist of key-value pairs enclosed in curly braces, which deserialize directly into standard Python dictionaries when processed with `response.json()`.',
    },
    {
      id: 'm2-t1-q7',
      question: 'What does an HTTP status code of 429 indicate?',
      options: [
        'Success! The request completed and valid data is attached.',
        'Bad Request: The server encountered a syntax error in your request.',
        'Too Many Requests: You have exceeded the allowable rate limit for the API.',
        'Internal Server Error: The remote server crashed unexpectedly.',
      ],
      correctIndex: 2,
      explanation:
        'Status code 429 indicates "Too Many Requests". The API server is notifying your application that it is sending queries too rapidly or has exceeded its rate limit quota.',
    },
    {
      id: 'm2-t1-q8',
      question: 'Why should secret API keys NEVER be hardcoded into public frontend JavaScript or committed to GitHub?',
      options: [
        'Because frontend browsers cannot interpret text strings longer than 10 characters.',
        'Because anyone can inspect web source code or scan public repositories to steal your credentials and quota.',
        'Because API keys only work on Linux operating systems.',
        'Because hardcoding keys slows down mathematical NumPy array operations.',
      ],
      correctIndex: 1,
      explanation:
        'Frontend code is fully exposed to client browsers, and automated bots continuously scan public git repositories for credentials. Leaked keys can lead to identity theft, quota exhaustion, and severe financial charges.',
    },
    {
      id: 'm2-t1-q9',
      question: 'Which of the following describes a continuous "Data Stream"?',
      options: [
        'Downloading a static CSV containing historical census records from 1990.',
        'A meteorological sensor transmitting fresh temperature and pressure readings every 2 seconds.',
        'A hard drive storing backup files in an offline cabinet.',
        'A printed academic textbook containing statistical formulas.',
      ],
      correctIndex: 1,
      explanation:
        'A data stream is an ongoing, unbounded flow of data points generated continuously over time, such as live sensor telemetry or real-time stock ticker ticks.',
    },
    {
      id: 'm2-t1-q10',
      question: 'If an official API and a public website both contain the data you need, why is the API generally preferred?',
      options: [
        'APIs always cost more money, making the data inherently higher quality.',
        'APIs provide structured, intended, machine-readable data that does not break when website HTML changes.',
        'Web scraping is faster because HTML files never contain formatting code.',
        'APIs allow you to execute arbitrary Python code directly inside the remote server.',
      ],
      correctIndex: 1,
      explanation:
        'Official APIs are engineered specifically for programmatic access, delivering structured data (like JSON) under a stable contract that does not break when a webpage undergoes a visual redesign.',
    },
  ],
  summary: {
    takeaways: [
      'Data Collection is Step 1: Before data can be cleaned, scaled, or modeled, it must be ingested from real-world sources.',
      'The API Model: APIs provide a structured interface (endpoints + methods + parameters) through which software requests data from services.',
      'The Request-Response Cycle: Client sends an HTTP GET request → Server routes and computes → Server returns status code + JSON body.',
      'JSON to Python: JSON key-value pairs seamlessly deserialize into native Python dictionaries accessible with standard bracket syntax.',
      'HTTP Status Codes: 200 (Success), 400 (Bad Syntax), 401 (Auth Failed), 404 (Not Found), 429 (Rate Limit), 500 (Server Error).',
      'API Key Security: Never expose secret tokens in public repositories or frontend code; always inject them via server-side environment variables.',
      'Batch vs. Streaming: Batch handles accumulated historical blocks; Streaming ingests real-time, continuous events as they occur.',
      'API vs Web Scraping: When an official API is available, it is always the preferred, stable, and contract-backed ingestion path.',
    ],
    nextUpText:
      'Sometimes the data you need is not exposed through an official API. In Topic 2.2: Web Scraping & Parsing, we explore how to ethically extract structured information from raw web pages using HTML inspection, DOM traversal, and parsing libraries.',
  },
  prevTopic: {
    slug: 'numpy-basics-and-vectorization',
    title: '1.7 NumPy Basics & Vectorization',
  },
  nextTopic: {
    slug: 'web-scraping-and-parsing',
    title: '2.2 Web Scraping & Parsing',
  },
};
