import { LessonContent } from '@/types/lesson';

export const topic3_3: LessonContent = {
  id: 'm3-t3',
  topicNumber: '3.3',
  slug: 'data-visualization',
  moduleId: 'module-3',
  title: 'Data Visualization with Matplotlib & Seaborn',
  subtitle:
    'Visualizing Structure, Patterns, and Stories: Figure Anatomy, Core Charts, Customization, Statistical Encodings, and Dashboard Design',
  estimatedMinutes: 40,
  difficulty: 'Intermediate',
  tags: [
    'Data Visualization',
    'Exploratory Data Analysis',
    'Matplotlib',
    'Seaborn',
    'Figure and Axes',
    'Line Chart',
    'Bar Chart',
    'Histogram',
    'Scatter Plot',
    'Box Plot',
    'Pie Chart',
    'Subplots',
    'Count Plot',
    'KDE & Density',
    'Violin Plot',
    'Hue Encodings',
    'Correlation Heatmap',
    'Chart Selection Matrix',
    'Misleading Visualizations',
    'Data Storytelling',
  ],
  objectives: [
    'Explain the core data visualization axiom: "A good visualization does not merely make data look beautiful; it makes complex patterns immediately understandable."',
    'Deconstruct the hierarchical anatomy of Matplotlib: Figure container, Axes plotting area, Axis scales, Ticks, Titles, Labels, and Legends.',
    'Write clean, idiomatic object-oriented Matplotlib code utilizing the `fig, ax = plt.subplots()` pattern.',
    'Select and construct appropriate core charts (Line, Bar, Histogram, Scatter, Box, Pie) based on data scale and analytical objectives.',
    'Understand why Bar Charts require zero-baselines for honest area comparisons, whereas Line Charts track sequential changes over continuous domains.',
    'Diagnose relationships between continuous numerical variables using Scatter Plots, reinforcing that association does not establish causation.',
    'Inspect distribution quartiles, IQR, and 1.5×IQR whisker bounds with Box Plots to spot anomalies and median trends.',
    'Utilize Seaborn for statistical modeling: DataFrame column mapping, count plots, kernel density estimates (KDE), and multidimensional hue encodings.',
    'Construct mirrored probability distributions using Violin Plots and matrix relationships using Correlation Heatmaps.',
    'Audit and rectify misleading charts (truncated baselines, 3D distortions, inappropriate pie splits, overplotting, and inconsistent scales).',
    'Build a full multi-chart exploratory dashboard using Matplotlib subplots for real-world e-commerce and student performance datasets.',
    'Prepare for Topic 3.4: Correlation and Multicollinearity.',
  ],
  hook: {
    title: 'The 20-Number Blindspot: When Summary Tables Conceal the Truth',
    story:
      'Imagine an academic dean reviewing midterm exam records for an engineering cohort of 20 students: [35, 42, 48, 50, 55, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92, 98]. The spreadsheet displays an average of 69.8 marks. Staring at the 20 raw digits in a column, the human mind struggles to hold all numbers simultaneously in working memory. But the moment those 20 numbers are grouped into contiguous intervals and projected onto an interactive histogram, the entire cognitive burden evaporates: the class exhibits a steady, approximately uniform progression from 30s to 90s, with no clustering around the center. A single chart converted 20 isolated numbers into instant visual cognition.',
    analogy:
      'Reading raw data is like reading musical notes one by one off a silent sheet: you can inspect individual pitch numbers, but you cannot hear the symphony. A data visualization is playing the music aloud: the melody (trends), harmony (correlations), and discordant notes (outliers) become instantly perceptible to human perception without manual arithmetic.',
    realWorldImpact:
      'In medical imaging, astronomical surveys, financial algorithmic trading, and climate modeling, humans cannot scan 10 million rows per second. Data visualization translates multi-gigabyte data matrices into spatial coordinate geometries and color encodings that human visual cortexes process in under 200 milliseconds, accelerating life-saving discoveries and preventing catastrophic misinterpretations.',
  },
  coreConcept: {
    headline: 'Visual Encodings Map Abstract Data Dimensions into Spatial Geometries',
    explanation:
      'Every chart is a systematic mathematical mapping between data columns and visual attributes: position on an X/Y axis, bar height, marker shape, line thickness, or color palette (hue). Matplotlib provides foundational low-level control over canvas geometry, while Seaborn provides high-level statistical convenience directly integrated with Pandas DataFrames.',
    keyPillars: [
      {
        title: '1. The Container Hierarchy (Figure vs Axes)',
        description:
          'A Figure is the entire top-level canvas (window or saved image file). An Axes is a specific coordinate bounding box inside the Figure where data is plotted. A single Figure can hold one, two, or a grid of twenty distinct Axes subplots.',
      },
      {
        title: '2. The Categorical vs Numerical Grammar',
        description:
          'Categorical data requires discrete encodings (bars, counts, slices), whereas continuous numerical data requires interval or coordinate mappings (lines, histograms, scatter plots, box plots, density curves). Violating this grammar produces distorted charts.',
      },
      {
        title: '3. Statistical Semantics (Seaborn)',
        description:
          'Seaborn automates statistical aggregation: computing frequencies in countplot, fitting Gaussian kernels in kdeplot, plotting 5-number summaries in boxplot, and conditioning color by category via the `hue` parameter.',
      },
      {
        title: '4. Integrity & Honest Storytelling',
        description:
          'Visualizations must communicate truth. Truncating bar chart baselines exaggerates differences; connecting unordered categorical points falsely implies temporal continuity; omitting units blinds the audience. Clear titles, labels, and legends are non-negotiable.',
      },
    ],
  },
  interactiveType: 'visualization-lab',
  technicalExplanation: {
    title: 'Mathematical Foundations of Chart Construction & Statistical Encodings',
    deepDive:
      'A visualization pipeline transforms a data vector X into display device coordinates via affine transformations and statistical estimators. For a histogram, data is partitioned into k contiguous intervals of equal width h = (max(X) - min(X)) / k, computing bin counts. For Kernel Density Estimation (KDE), a continuous probability density f(x) is estimated using a Gaussian kernel:\n\n$$\\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n \\frac{1}{\\sqrt{2\\pi}} \\exp\\left(-\\frac{1}{2}\\left(\\frac{x - x_i}{h}\\right)^2\\right)$$\n\nwhere h is the smoothing bandwidth. For box plots, the interquartile range IQR = Q_3 - Q_1 establishes Tukey whisker thresholds [Q_1 - 1.5\\times\\text{IQR}, Q_3 + 1.5\\times\\text{IQR}], beyond which points are flagged as individual outliers. In scatter plots, bivariate coordinates (x_i, y_i) reveal linear or monotonic associations quantified by the Pearson correlation coefficient r:\n\n$$r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}$$\n\nHeatmaps color-code the resulting symmetric n x n correlation matrix, enabling rapid visual scanning of multicollinearity.',
    bulletPoints: [
      'Matplotlib Architecture: Backend (rendering engine), Artist (every visible component: Figure, Axes, Line2D, Text), and Scripting Layer (pyplot).',
      'Object-Oriented API: Always prefer `fig, ax = plt.subplots()` over stateful `plt.plot()` for modularity and multi-axis flexibility.',
      'Bar Charts vs Histograms: Bar charts compare discrete levels with spaces between bars; histograms represent continuous intervals with touching rectangles.',
      'Scatter Plot Diagnostics: Identify positive slope, negative slope, clustering, non-linear curvature, heteroscedastic fan shapes, and isolated points.',
      'Seaborn Integration: Accepts tidy Pandas DataFrames where columns correspond to variables and rows to observations, automatically labeling axes from column names.',
      'Accessibility: Never rely on hue alone; combine distinct color contrasts with markers, line styles, or direct annotations for colorblind accessibility.',
    ],
    equations: [
      '\\text{Bin Width: } h = \\frac{\\max(X) - \\min(X)}{k}',
      '\\text{KDE Density: } \\hat{f}_h(x) = \\frac{1}{n h} \\sum_{i=1}^n \\frac{1}{\\sqrt{2\\pi}} e^{-\\frac{(x - x_i)^2}{2h^2}}',
      '\\text{Tukey Whisker Bounds: } [Q_1 - 1.5 \\cdot \\text{IQR}, \\; Q_3 + 1.5 \\cdot \\text{IQR}]',
      '\\text{Pearson Correlation: } r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2 \\sum (y_i - \\bar{y})^2}}',
    ],
  },
  codeExamples: [
    {
      title: '1. Object-Oriented Matplotlib: Line & Bar Charts',
      description: 'Creating structured, customized charts using Figure and Axes objects.',
      language: 'python',
      code: `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [120, 150, 140, 190, 220]

# Create Figure and Axes
fig, ax = plt.subplots(figsize=(7, 4))

# Plot styled line chart
ax.plot(months, sales, color="royalblue", marker="o", linestyle="--", linewidth=2, label="Sales (₹k)")

# Annotate chart elements
ax.set_title("Monthly Sales Trend", fontsize=14, fontweight="bold")
ax.set_xlabel("Month", fontsize=11)
ax.set_ylabel("Sales in Thousands", fontsize=11)
ax.grid(True, linestyle=":", alpha=0.6)
ax.legend(loc="upper left")

plt.tight_layout()
plt.show()`,
      lineExplanations: [
        { line: 1, text: 'Import matplotlib.pyplot with conventional alias plt.' },
        { line: 7, text: 'Create figure container and axes coordinate box with 7x4 inch dimensions.' },
        { line: 10, text: 'Draw line connecting months with circular markers and dashed line style.' },
        { line: 13, text: 'Apply descriptive title and explicit axis labels with units.' },
        { line: 16, text: 'Enable grid with light opacity for readability.' },
        { line: 19, text: 'Render plot without clipping margins.' },
      ],
      output: `[Figure rendered: Clean line chart with labeled points from Jan (120k) to May (220k)]`,
    },
    {
      title: '2. Multi-Panel Subplots: 1x2 Dashboard Layout',
      description: 'Arranging multiple complementary visualizations into a unified figure.',
      language: 'python',
      code: `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
revenue = [120, 150, 140, 190, 220]
orders = [80, 95, 90, 110, 145]

# 1 row, 2 columns of subplots
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Left panel: Revenue trend
axes[0].plot(months, revenue, color="royalblue", marker="o")
axes[0].set_title("Revenue Growth")
axes[0].set_ylabel("Revenue (₹k)")
axes[0].grid(True, alpha=0.3)

# Right panel: Order count comparison
axes[1].bar(months, orders, color="#005d5d", edgecolor="black")
axes[1].set_title("Orders Received")
axes[1].set_ylabel("Count")

plt.tight_layout()
plt.show()`,
      lineExplanations: [
        { line: 8, text: 'Initialize 1 row and 2 columns returning an array of 2 Axes objects.' },
        { line: 11, text: 'Plot line chart on first subplot (axes[0]).' },
        { line: 17, text: 'Plot bar chart on second subplot (axes[1]).' },
        { line: 21, text: 'Automatically optimize spacing between subplots.' },
      ],
      output: `[Figure rendered: 2 side-by-side plots displaying revenue line and order volume bars]`,
    },
    {
      title: '3. Statistical Seaborn: Grouped Boxplots and Scatter with Hue',
      description: 'Leveraging Seaborn for semantic grouping and multi-variable exploration.',
      language: 'python',
      code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Student": ["Rahul", "Priya", "Arjun", "Sneha", "Kabir", "Meera", "Riya", "Aman"],
    "StudyHours": [3, 5, 2, 6, 4, 7, 5, 3],
    "Marks": [65, 82, 55, 92, 74, 95, 85, 62],
    "Class": ["A", "A", "B", "A", "B", "A", "B", "B"]
})

sns.set_theme(style="whitegrid")
fig, ax = plt.subplots(figsize=(8, 4.5))

# Scatter plot with categorical hue encoding
sns.scatterplot(
    data=df,
    x="StudyHours",
    y="Marks",
    hue="Class",
    style="Class",
    s=90,
    palette="deep",
    ax=ax
)

ax.set_title("Study Hours vs Marks by Class Section", fontweight="bold")
plt.tight_layout()
plt.show()`,
      lineExplanations: [
        { line: 13, text: 'Configure modern Seaborn grid aesthetic.' },
        { line: 17, text: 'Map StudyHours to X, Marks to Y, and Class to both color (hue) and shape (style).' },
        { line: 26, text: 'Seaborn automatically generates an accessible legend combining color and marker shape.' },
      ],
      output: `[Figure rendered: Scatter plot displaying positive trend with Class A and B clearly distinguished]`,
    },
  ],
  commonMistakes: [
    {
      mistake: 'Assuming Matplotlib and Seaborn are mutually exclusive competitors',
      why: 'Students think they must choose either Matplotlib OR Seaborn for their entire project.',
      correction:
        'Seaborn is built directly on top of Matplotlib. You use Seaborn for fast statistical plotting and use Matplotlib Axes methods (`ax.set_title`, `ax.set_xlabel`, `fig.savefig`) to customize the output.',
      wrongCode: '# Inefficient rewrite\nimport seaborn as sns\n# Ignoring Matplotlib figure controls',
      correctCode: 'import seaborn as sns\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsns.scatterplot(..., ax=ax)\nax.set_title("Customized via Matplotlib")',
    },
    {
      mistake: 'Using a Line Chart for unordered categorical variables',
      why: 'Connecting independent categories (e.g., Apple, Banana, Orange) with lines implies a continuous temporal trend.',
      correction: 'Use a Bar Chart for discrete categories; reserve Line Charts for ordered sequences like time or distance.',
      wrongCode: 'plt.plot(["Mumbai", "Delhi", "Bengaluru"], [100, 150, 120])',
      correctCode: 'plt.bar(["Mumbai", "Delhi", "Bengaluru"], [100, 150, 120])',
    },
    {
      mistake: 'Truncating the Y-axis baseline on magnitude Bar Charts',
      why: 'Starting a bar chart at 90 instead of 0 visually multiplies minor percentage differences into deceptive towers.',
      correction: 'Always anchor bar chart baselines at zero so rectangle area accurately reflects numerical magnitude.',
      wrongCode: 'ax.set_ylim(90, 100) # Misleading bar comparison',
      correctCode: 'ax.set_ylim(0, 105) # Honest zero-anchored baseline',
    },
    {
      mistake: 'Confusing Histograms with Bar Charts',
      why: 'Both use rectangles, leading students to use `plt.bar` for continuous distributions.',
      correction:
        'Histograms group continuous numerical data into contiguous touching intervals; bar charts show discrete category counts separated by spaces.',
      wrongCode: 'plt.bar(raw_marks) # Incorrect data structure',
      correctCode: 'plt.hist(raw_marks, bins=5, edgecolor="black")',
    },
    {
      mistake: 'Assuming a high correlation on a Scatter Plot proves causation',
      why: 'Strong linear slope does not indicate variable X causes variable Y.',
      correction: 'Always state that scatter plots demonstrate statistical association, not causative physical mechanisms.',
      wrongCode: '# Reporting: "Higher study hours directly causes exam score increase"',
      correctCode: '# Reporting: "Study hours and exam scores exhibit a strong positive linear association (r = 0.94)"',
    },
    {
      mistake: 'Overusing Pie Charts with more than 5 slices',
      why: 'Human angles perception is notoriously weak compared to linear height comparison.',
      correction: 'Use a sorted horizontal Bar Chart when comparing more than 3 to 4 categories.',
      wrongCode: 'ax.pie(values_with_12_categories, labels=labels)',
      correctCode: 'ax.barh(labels, values) # Instant readability',
    },
    {
      mistake: 'Interpreting KDE peak height as exact raw frequency count',
      why: 'KDE Y-axis represents probability density, not integer student counts.',
      correction: 'Remember that area under a continuous density curve integrates to 1.0; height is density per unit.',
      wrongCode: '# Stating: "A KDE height of 0.04 means 4 students"',
      correctCode: '# Stating: "KDE height reflects probability density at that value under bandwidth h"',
    },
    {
      mistake: 'Forgetting to call `plt.tight_layout()` or setting axis labels',
      why: 'Subplot titles and tick labels frequently overlap, rendering exported figures illegible.',
      correction: 'Always set clear X/Y labels with units and call `plt.tight_layout()` before displaying or saving.',
      wrongCode: 'plt.plot(x, y)\nplt.show() # Missing labels and cramped layout',
      correctCode: 'ax.set_xlabel("Time (s)")\nax.set_ylabel("Speed (m/s)")\nplt.tight_layout()\nplt.show()',
    },
    {
      mistake: 'Using unannotated Heatmaps without fixed vmin/vmax scale',
      why: 'Default color bounds can stretch misleadingly if extreme values are missing.',
      correction: 'For correlation matrices, always set `vmin=-1, vmax=1` with a diverging colormap like `coolwarm`.',
      wrongCode: 'sns.heatmap(corr_df) # Dynamic unpinned color bounds',
      correctCode: 'sns.heatmap(corr_df, annot=True, vmin=-1, vmax=1, cmap="coolwarm")',
    },
    {
      mistake: 'Using stateful `plt.plot()` inside complex loops instead of object-oriented Axes',
      why: 'Stateful calls bleed across figures and make subplot indexing bug-prone.',
      correction: 'Consistently create explicit `fig, ax = plt.subplots()` pairs.',
      wrongCode: 'plt.subplot(1, 2, 1); plt.plot(...); plt.subplot(1, 2, 2); plt.plot(...)',
      correctCode: 'fig, axes = plt.subplots(1, 2)\naxes[0].plot(...)\naxes[1].plot(...)',
    },
    {
      mistake: 'Relying exclusively on rainbow color scales (Jet) that distort data',
      why: 'Rainbow colormaps lack perceptual uniformity and are inaccessible to colorblind viewers.',
      correction: 'Use perceptually uniform sequential (Viridis) or diverging (Coolwarm) palettes.',
      wrongCode: 'cmap="jet" # Perceptually non-uniform',
      correctCode: 'cmap="viridis" # Perceptually uniform and accessible',
    },
    {
      mistake: 'Assuming a single visualization answers every analytical question',
      why: 'Students attempt to cram 6 dimensions into a single illegible chart.',
      correction: 'Construct a coordinated multi-plot dashboard where each chart answers one specific question cleanly.',
      wrongCode: '# Cramming size, color, alpha, shape, text, and 3D into 1 scatter plot',
      correctCode: '# Constructing a 2x2 subplot dashboard of specialized, readable charts',
    },
  ],
  thinkingStrategies: [
    {
      question: 'Which chart should I select for this specific dataset and question?',
      context: 'You have a tabular dataset with mixed categorical and numerical columns.',
      reasoning:
        'Ask two questions: 1. What are the data types (one categorical, one numerical, two numerical, etc.)? 2. What is the analytical goal (distribution, relationship, comparison, composition, or trend over time)?',
      ruleOfThumb:
        'Trend over time -> Line; Compare categories -> Bar; Continuous distribution -> Histogram / KDE; Numerical relationship -> Scatter; Spread and outliers -> Box plot; Matrix relationships -> Heatmap.',
    },
    {
      question: 'Should I use Matplotlib or Seaborn for this visualization task?',
      context: 'Deciding which Python library to import for your analysis script.',
      reasoning:
        'If you are working with a tidy Pandas DataFrame and want instant statistical aggregation (grouping by category, hue coloring, KDE smoothing), use Seaborn. If you need low-level canvas layout, custom annotations, or multi-axis subplots, use Matplotlib.',
      ruleOfThumb: 'Use Seaborn to calculate and draw; use Matplotlib to size, arrange, and polish.',
    },
    {
      question: 'How do I ensure this visualization does not mislead the audience?',
      context: 'Reviewing a draft chart before presenting insights to stakeholders.',
      reasoning:
        'Check that the baseline is honest (zero for bars), scales are uniform across comparison panels, units are labeled, sample sizes are noted, and the narrative does not claim causation without controlled experimental evidence.',
      ruleOfThumb: 'If deleting the labels makes the chart convey the opposite impression, redesign it.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'What is the primary difference between a Figure and an Axes in Matplotlib?',
      options: [
        'A Figure is a 2D line, while an Axes is a 3D bar.',
        'A Figure is the overall top-level canvas/window, while an Axes is a specific plot/coordinate bounding box within that Figure.',
        'An Axes is created in Python, while a Figure is only created in Jupyter.',
        'There is no difference; they are exact aliases for each other.',
      ],
      correctIndex: 1,
      explanation:
        'In Matplotlib’s object-oriented architecture, the Figure is the top-level container that holds everything, while an Axes is the actual plot region with its own coordinate system, title, and data artists.',
    },
    {
      id: 'q2',
      question: 'Which of the following is the standard idiom for creating an object-oriented Matplotlib figure and subplot?',
      options: [
        'fig = plt.new_plot()',
        'ax = matplotlib.make_axes()',
        'fig, ax = plt.subplots(figsize=(8, 4))',
        'fig, ax = plt.draw_all_charts()',
      ],
      correctIndex: 2,
      explanation:
        '`fig, ax = plt.subplots()` is the official, clean idiom that returns both the parent Figure object and the child Axes object ready for plotting.',
    },
    {
      id: 'q3',
      question: 'Why is connecting discrete, unordered categories (e.g., Apple, Banana, Orange) with a Line Chart considered poor visualization practice?',
      options: [
        'Because line charts can only plot floating-point numbers.',
        'Because connecting categorical points falsely implies a continuous, ordered progression (such as time) between unrelated categories.',
        'Because Python will throw an unhandled syntax error.',
        'Because line charts always require a 3D projection.',
      ],
      correctIndex: 1,
      explanation:
        'Line charts visually encode continuity and sequential rate of change. Connecting unordered categories misleads viewers into inferring a gradient or temporal transition that does not exist.',
    },
    {
      id: 'q4',
      question: 'What is the crucial geometric distinction between a Histogram and a standard Bar Chart?',
      options: [
        'Bar charts use circular slices; histograms use straight lines.',
        'Histograms group continuous numerical data into contiguous touching intervals, while bar charts compare discrete categories separated by gaps.',
        'Histograms can only be plotted in Seaborn, never in Matplotlib.',
        'Bar charts show probability density; histograms show sample standard deviation.',
      ],
      correctIndex: 1,
      explanation:
        'Histograms partition continuous numeric variables into touching bins where area represents frequency; bar charts plot separate categories where bar separation signifies independence.',
    },
    {
      id: 'q5',
      question: 'In a standard Tukey Box Plot, where do the upper and lower whiskers terminate by default?',
      options: [
        'Always at the absolute minimum and maximum data values, regardless of outliers.',
        'At the 1st and 99th percentiles.',
        'At the most extreme data points located within 1.5 × IQR from the quartiles (Q1 and Q3).',
        'At exactly 3 standard deviations from the sample mean.',
      ],
      correctIndex: 2,
      explanation:
        'In standard Tukey box plots, whiskers extend to the furthest observed data point within [Q1 - 1.5×IQR, Q3 + 1.5×IQR]. Any observations beyond that threshold are plotted as distinct outlier points.',
    },
    {
      id: 'q6',
      question: 'In Seaborn, what does the `hue` parameter accomplish when passed to `sns.scatterplot()` or `sns.boxplot()`?',
      options: [
        'It changes the background color of the entire Jupyter notebook.',
        'It maps a categorical or numerical grouping variable to color, automatically splitting and coloring data groups.',
        'It converts the plot into a 3D holographic projection.',
        'It removes missing NaN values from the DataFrame.',
      ],
      correctIndex: 1,
      explanation:
        '`hue` is Seaborn’s semantic color encoding parameter that groups observations by a specified column and assigns distinct palette colors with an automated legend.',
    },
    {
      id: 'q7',
      question: 'What does a Kernel Density Estimation (KDE) curve represent?',
      options: [
        'The exact integer count of observations in each discrete bucket.',
        'A continuous, smoothed mathematical estimate of the underlying probability density function.',
        'The cumulative sum of squared deviations from the mean.',
        'The linear regression slope between two variables.',
      ],
      correctIndex: 1,
      explanation:
        'A KDE plot uses kernel functions (typically Gaussian) placed at each data point to compute a smooth continuous probability density curve integrating to 1.0.',
    },
    {
      id: 'q8',
      question: 'Why should standard magnitude Bar Charts always anchor their numerical axis at zero (0)?',
      options: [
        'Because non-zero axes crash the Matplotlib rendering engine.',
        'Because human visual cognition compares bar lengths and areas; truncating the baseline exaggerates minor differences deceptively.',
        'Because zero is the only mathematically defined point in Euclidean space.',
        'Because Seaborn does not support negative numbers.',
      ],
      correctIndex: 1,
      explanation:
        'Because viewers perceive magnitude by comparing the total length and area of bars, starting at a non-zero value visually distorts proportions and misinforms stakeholders.',
    },
    {
      id: 'q9',
      question: 'Which visualization is most effective for inspecting pairwise linear correlation values across 10 numerical features?',
      options: [
        'A single Pie Chart with 10 slices.',
        'An annotated Correlation Heatmap with a diverging colormap (e.g., `coolwarm`) bounded from -1 to +1.',
        'A 10-line overlapping Line Chart.',
        'A stacked Count Plot.',
      ],
      correctIndex: 1,
      explanation:
        'A correlation heatmap organizes the symmetric 10×10 correlation matrix into an annotated color grid, allowing immediate visual detection of strong positive (+1) and negative (-1) multicollinearity.',
    },
    {
      id: 'q10',
      question: 'What does the Violin Plot combine to provide deeper insight than a standard Box Plot?',
      options: [
        'A pie chart and a scatter plot.',
        'A box plot (median, IQR) combined with a mirrored Kernel Density Estimation (KDE) curve showing distribution shape.',
        'A bar chart and an API request log.',
        'A line chart and a decision tree.',
      ],
      correctIndex: 1,
      explanation:
        'Violin plots combine summary box plot markers (median dot, IQR bar) with a symmetric kernel density curve on both sides, revealing multi-modal peaks that box plots conceal.',
    },
    {
      id: 'q11',
      question: 'What does `plt.subplots(2, 2, figsize=(10, 8))` return?',
      options: [
        'A list of 4 independent Figure windows.',
        'A single Figure and a 2×2 NumPy array containing 4 distinct Axes objects.',
        'An empty DataFrame with 4 rows.',
        'A 3D coordinate mesh.',
      ],
      correctIndex: 1,
      explanation:
        '`plt.subplots(2, 2)` constructs a single Figure with a 2-row by 2-column grid of 4 subplots, returning `(fig, axes)` where `axes` is a 2D array of Axes objects indexed as `axes[row, col]`.',
    },
    {
      id: 'q12',
      question: 'A junior analyst plots a Scatter Plot showing a strong positive correlation between ice cream sales and shark attacks, concluding that ice cream causes shark attacks. What is the fundamental error?',
      options: [
        'The analyst should have used a pie chart instead.',
        'Scatter plots can only plot negative numbers.',
        'Confusing correlation with causation: both variables are influenced by a confounding third variable (warm weather / beach attendance).',
        'The axes were not normalized between 0 and 1.',
      ],
      correctIndex: 2,
      explanation:
        'Correlation indicates statistical co-movement, never direct causation. Confounding variables (hot summer weather) drive both beach attendance and ice cream sales independently.',
    },
  ],
  summary: {
    takeaways: [
      'A good visualization maps abstract data columns into clear spatial geometries and visual encodings.',
      'Matplotlib follows a container hierarchy: Figure is the canvas; Axes is the plot coordinate region.',
      'Always prefer object-oriented `fig, ax = plt.subplots()` over stateful `plt.plot()` scripting.',
      'Line Charts display sequential continuous trends; Bar Charts compare discrete independent categories.',
      'Histograms plot continuous numerical intervals with touching bars; Bar Charts compare separate categorical counts.',
      'Scatter Plots explore bivariate numerical relationships; remember that correlation does NOT imply causation.',
      'Box Plots summarize 5-number distributions and highlight outliers beyond 1.5 × IQR whiskers.',
      'Seaborn automates statistical plotting from DataFrames: countplot, histplot (with KDE), boxplot, and violinplot.',
      'The `hue` parameter adds categorical grouping via color palettes with automated legends.',
      'Correlation Heatmaps project multi-variable matrices onto an annotated color grid for rapid feature scanning.',
      'Misleading charts (truncated baselines, overplotting, poor palettes, missing units) undermine analytical trust.',
      '"A good visualization does not merely make data look beautiful; it makes data easier to understand."',
    ],
    nextUpText:
      '3.4 Correlation & Multicollinearity — Moving from visual scatter plots to mathematical Pearson, Spearman, and Kendall correlation matrices.',
  },
  prevTopic: {
    slug: 'distributions',
    title: '3.2 Distributions',
  },
  nextTopic: {
    slug: 'correlation-and-multicollinearity',
    title: '3.4 Correlation & Multicollinearity',
  },
};
