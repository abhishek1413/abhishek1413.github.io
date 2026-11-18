export const stats = [
  { n: 88.6, d: 1, s: '%', label: 'Churn model accuracy (0.91 ROC-AUC)' },
  { n: 28, s: '%', label: 'Lower inventory holding costs (simulated)' },
  { n: 30, s: '%', label: 'Faster reporting with automated dashboards' },
  { n: 100, s: '+', label: 'SQL queries written across 10 projects' },
]

export const services = [
  ['🧹', 'Data cleaning & preparation', "Fix missing values, duplicates and inconsistencies. I've prepared 15+ real-world datasets of 50K+ rows each."],
  ['📊', 'Dashboards & reporting', 'Interactive Power BI and Excel dashboards: 25+ built, cutting manual reporting time by 30%.'],
  ['🔮', 'Predictive modeling', 'Churn and demand models with Scikit-learn, tuned to business cost, not just accuracy.'],
  ['🗄️', 'SQL analysis', 'Extract, filter and aggregate from SQL Server and MySQL to answer real business questions.'],
  ['⚙️', 'ETL & workflow automation', 'Repeatable pipelines with Airflow, dbt and n8n so reports refresh without manual effort.'],
  ['📦', 'Supply chain optimization', 'Safety-stock and reorder policy modeling that lowers holding cost while improving fill rates.'],
]

export const projects = [
  {
    tags: ['Insurance', 'Machine Learning'],
    title: 'Churn Prediction & Lifetime Value Optimization',
    metrics: [['88.6%', 'accuracy'], ['0.91', 'ROC-AUC'], ['10K', 'customers']],
    points: [
      'End-to-end churn and customer lifetime value pipeline for a 10,000-customer insurance portfolio.',
      'RandomForest classifier with cost-based threshold tuning to flag at-risk customers.',
      'Delivered a prioritized retention call list, a 25-question SQL answer set and an interactive Excel dashboard.',
    ],
    stack: ['Python', 'Scikit-learn', 'SQL', 'Excel'],
    href: 'https://github.com/abhishek1413/Churn-Prediction-Lifetime-Value-LTV-Optimization',
  },
  {
    tags: ['Supply Chain', 'Optimization'],
    title: 'Multi-Echelon Inventory Optimization',
    metrics: [['28%', 'lower holding cost'], ['180K+', 'transactions'], ['11K+', 'SKU pairs']],
    points: [
      'Optimization model across a 5-tier distribution network using the DataCo Smart Supply Chain dataset.',
      'Poisson / negative-binomial demand modeling to set safety stock and reorder policies.',
      'Validated with out-of-sample simulation; visualized in Excel and Power BI-ready dashboards.',
    ],
    stack: ['Python', 'Pandas', 'SciPy', 'Power BI'],
    href: 'https://github.com/abhishek1413/Multi-Echelon-Inventory-Optimization',
  },
]

export const job = {
  title: 'Data Analyst Trainee · Transcompe Educare Pvt. Ltd.',
  meta: 'May 2026 – Present',
  points: [
    'Cleaned and preprocessed 15+ real-world datasets (50K+ rows each), improving data accuracy.',
    'Ran EDA and statistical modeling in Python across 20 training datasets to surface trends and outliers.',
    'Built 25+ reports and dashboards in Power BI and Excel, cutting manual reporting time by 30%.',
    'Wrote 100+ SQL queries supporting 10 analysis projects.',
    'Worked with a 6-member cross-functional team, reporting data-quality issues clearly.',
  ],
}

export const skills = {
  Programming: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'SQL'],
  'BI & reporting': ['Power BI', 'Excel', 'PowerPoint', 'Word'],
  'Data & cloud': ['SQL Server', 'MySQL', 'Google Cloud (GCP)', 'Git & GitHub'],
  'Pipelines & automation': ['Apache Airflow', 'dbt', 'n8n', 'ETL'],
  Analysis: ['EDA', 'Statistical analysis', 'Predictive modeling', 'Data cleaning', 'Visualization'],
  Environments: ['Jupyter', 'Google Colab', 'Spyder', 'Anaconda'],
}

export const links = [
  ['LinkedIn', 'http://www.linkedin.com/in/abhishek-gupta-abhi007'],
  ['GitHub', 'https://github.com/abhishek1413'],
  ['LeetCode', 'https://leetcode.com/u/abhishek1413/'],
  ['HackerRank', 'https://www.hackerrank.com/profile/informabhishekg1'],
]
