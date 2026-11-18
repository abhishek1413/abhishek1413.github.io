// All content comes from the resume. Edit here, the page updates.

export const person = {
  name: 'Abhishek Gupta',
  role: 'Data Analyst Trainee',
  location: 'Lucknow, Uttar Pradesh, India',
  email: 'informabhishekgupta@gmail.com',
  phone: '+91 6306891413',
  phoneHref: 'tel:+916306891413',
}

export const links = [
  ['LinkedIn', 'http://www.linkedin.com/in/abhishek-gupta-abhi007'],
  ['GitHub', 'https://github.com/abhishek1413'],
  ['LeetCode', 'https://leetcode.com/u/abhishek1413/'],
  ['HackerRank', 'https://www.hackerrank.com/profile/informabhishekg1'],
]

export const stats = [
  { n: 88.6, d: 1, s: '%', label: 'Churn model accuracy, 0.91 ROC-AUC' },
  { n: 28, s: '%', label: 'Reduction in simulated inventory holding costs' },
  { n: 30, s: '%', label: 'Faster reporting with automated Power BI dashboards' },
  { n: 100, s: '+', label: 'SQL queries written across 10 analysis projects' },
]

export const summary = [
  'Data Analyst Trainee applying programming, mathematics, critical thinking, and research-driven analysis to build analytics and business intelligence solutions, from cleaning and exploring large data sets to predictive modeling and stakeholder-ready presentations.',
  'Delivered insightful, data-driven results: a churn-prediction model at 88.6% accuracy, a 28% reduction in simulated inventory holding costs, and automated Power BI dashboards that cut reporting turnaround by 30%, using Python, SQL, and MS Office.',
  "Completed a Bachelor's degree (BCA) in Computer Science with a specialization in Data Science and AI in May 2026. Brings creativity and clear communication to cross-functional teams, working to evaluate performance, identify trends, and turn raw data into measurable business impact.",
]

export const education = {
  degree: 'Bachelor of Computer Applications (BCA), Computer Science',
  spec: 'Data Science & AI Specialization',
  school: 'Shri Ramswaroop Memorial University',
  meta: 'CGPA: 7.57 | 2023 - May 2026',
}

export const certs = [
  ['Data Analytics Essentials', 'Cisco Networking Academy'],
  ['Data Analytics Job Simulation', 'Deloitte, via Forage'],
]

export const services = [
  ['Data cleaning & preprocessing', '15+ real-world datasets of 50K+ rows each, with missing values, duplicates and inconsistencies resolved.'],
  ['Dashboards & reporting', '25+ visual reports and dashboards in Power BI and Excel, cutting manual reporting time by 30%.'],
  ['Predictive modeling', 'Scikit-learn models such as a churn classifier at 0.91 ROC-AUC, tuned on business cost, not just accuracy.'],
  ['SQL analysis', '100+ queries on SQL Server and MySQL to extract, filter and aggregate data for real business questions.'],
  ['ETL & workflow automation', 'ETL pipelines and workflow automation with Apache Airflow, dbt and n8n.'],
  ['Supply chain optimization', 'Multi-echelon inventory models for safety stock and reorder policy, with 28% lower simulated holding costs.'],
]

export const projects = [
  {
    domain: 'Insurance Domain',
    title: 'Churn Prediction & Lifetime Value (LTV) Optimization',
    bars: [['Model accuracy', 88.6, '88.6%'], ['ROC-AUC', 91, '0.91']],
    facts: [['10,000', 'customer portfolio'], ['25', 'SQL business questions']],
    points: [
      'Engineered an end-to-end churn prediction and customer lifetime value (CLV) optimization pipeline for a 10,000-customer insurance portfolio, combining real risk and pricing data with a documented behavioral model.',
      'Trained a Scikit-learn RandomForest classifier (88.6% accuracy, 0.91 ROC-AUC) with cost-based decision threshold tuning to flag at-risk customers.',
      'Translated model output into a prioritized retention call list, a 25-question SQL business-answer set, and an interactive Excel dashboard for stakeholders.',
    ],
    stack: ['Python', 'Scikit-learn', 'SQL', 'Excel'],
    href: 'https://github.com/abhishek1413/Churn-Prediction-Lifetime-Value-LTV-Optimization',
  },
  {
    domain: 'Supply Chain Domain',
    title: 'Multi-Echelon Inventory Optimization',
    bars: [['Holding cost reduction', 28, '28%']],
    facts: [['180K+', 'transactions'], ['11,000+', 'warehouse-SKU pairs'], ['5', 'distribution tiers']],
    points: [
      'Designed a multi-echelon inventory optimization model across a real 5-tier distribution network using 180K+ transactions from the DataCo Smart Supply Chain dataset.',
      'Applied Python (Pandas, NumPy, SciPy) and Poisson/negative-binomial demand modeling to optimize safety stock and reorder policies for 11,000+ warehouse-SKU pairs.',
      'Reduced holding costs by 28% while improving fill rates, validated via out-of-sample simulation and visualized through Excel and Power BI-ready dashboards.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Excel', 'Power BI'],
    href: 'https://github.com/abhishek1413/Multi-Echelon-Inventory-Optimization',
  },
]

export const job = {
  role: 'Data Analyst Trainee',
  company: 'Transcompe Educare Pvt. Ltd.',
  when: 'May 2026 - Present',
  points: [
    'Cleaned and preprocessed 15+ real-world datasets (50K+ rows each), resolving missing values, duplicates, and inconsistencies to improve data accuracy.',
    'Conducted exploratory data analysis (EDA) and statistical modeling using Python (Pandas, NumPy, Matplotlib) across 20 training datasets to identify trends, patterns, and outliers.',
    'Built 25+ visual reports and dashboards in Power BI and Excel for stakeholder presentations, cutting manual reporting time by 30%.',
    'Wrote 100+ SQL queries to extract, filter, and aggregate data from structured datasets, supporting 10 analysis projects.',
    'Collaborated with a 6-member cross-functional team, communicating data-quality issues through clear, structured reporting.',
  ],
}

export const skills = [
  ['Programming Languages', ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'SQL']],
  ['Databases & Querying', ['SQL Server', 'MySQL Workbench']],
  ['Version Control', ['Git', 'GitHub']],
  ['Cloud', ['Google Cloud Platform (GCP)']],
  ['Development Environments', ['Jupyter Notebook', 'Google Colab', 'Spyder IDE', 'Anaconda Navigator']],
  ['Tools', ['Microsoft Excel', 'MS Office (Word, PowerPoint)', 'Power BI', 'Apache Airflow', 'dbt', 'n8n']],
  ['Core Competencies', [
    'Data Cleaning & Preprocessing', 'Exploratory Data Analysis (EDA)', 'Statistical Analysis', 'Predictive Modeling',
    'Machine Learning Fundamentals', 'Data Visualization & Reporting', 'ETL Pipelines', 'Workflow Automation',
    'Performance Evaluation', 'Critical Thinking', 'Creativity', 'Problem-Solving', 'Attention to Detail',
  ]],
]
