from pypdf import PdfReader
import utilities as util

pdf_path = util.get_path("../../data/sample_cv.pdf")

reader = PdfReader(pdf_path)
pages = reader.pages

# text = " ".join([ page.extract_text() for page in pages ])

text = """MARCUS VANCE
Senior Data Engineer | Contact: marcus.vance@example.com

PROFESSIONAL SUMMARY
Results-driven Data Engineer with 5+ years of experience building scalable data pipelines, streaming architectures, and enterprise data warehouses. I excel at data modeling and love to stream real-time analytics to empower business decision-making. Fluent in English, conversational in Spanish, and native in German.

TECHNICAL SKILLS
- Programming Languages: Python, Scala, Java, SQL, PL/SQL, Bash
- Big Data Frameworks: Apache Spark, PySpark, Hadoop, Apache Flink, Kafka
- Data Warehousing & ETL: Snowflake, BigQuery, Amazon Redshift, dbt, Apache Airflow
- Databases: PostgreSQL, MongoDB, Cassandra, Redis
- Cloud & Infrastructure: AWS, Docker, Kubernetes, Terraform

WORK EXPERIENCE
Lead Data Engineer | DataCloud Solutions (2022 - Present)
- Designed and deployed real-time data ingestion pipelines using PySpark, Kafka, and Apache Flink to process 500GB+ daily.
- Architected enterprise data warehouses on Snowflake and BigQuery, leveraging dbt for automated transformations.
- Managed distributed databases including PostgreSQL and Cassandra for low-latency querying.

Data Engineer | Analytics Works (2019 - 2022)
- Built automated ETL workflows using Apache Airflow, Python, and SQL to aggregate multi-source data.
- Optimized slow SQL and PL/SQL queries, reducing pipeline execution time by 35%.
- Containerized data pipelines using Docker and deployed workloads on AWS EC2 and Kubernetes.

EDUCATION & LANGUAGES
Bachelor of Science in Computer Science | Tech University (2019)
Languages Spoken: English (Fluent), Spanish (Intermediate), German (Native)"""