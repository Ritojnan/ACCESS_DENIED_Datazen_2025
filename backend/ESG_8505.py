import pandas as pd
import numpy as np
import requests
import streamlit as st
from textblob import TextBlob
import re

def generate_esg_report(company, esg_analysis, news_links):
    """Generates a CSV report of ESG analysis with article links."""
    if not esg_analysis:
        return None

    df = pd.DataFrame(esg_analysis, columns=["News Article", "ESG Category", "Sentiment"])
    df["Article Link"] = news_links

    csv = df.to_csv(index=False)
    return csv

def display_top_news(esg_analysis, news_links):
    """Displays top 2-3 relevant ESG news headlines with links."""
    st.write("### Top ESG-Related News")
    
    for i, (article, category, sentiment) in enumerate(esg_analysis[:3]):
        sentiment_emoji = "🟢" if sentiment > 0 else "🔴" if sentiment < 0 else "⚪"
        st.markdown(f"{sentiment_emoji} **{article}** → _{category}_  \n[Read more]({news_links[i]})")

def fetch_esg_news(company):
    """Fetch ESG-related news headlines and URLs for a given company using NewsAPI."""
    api_key = "86343fd53880418d958f0fe82cee671e"
    
    # ESG-related keywords for better filtering
    keywords = [
        "ESG", "sustainability", "sustainable", "green energy", "climate",
        "carbon neutral", "renewable", "environment", "social impact",
        "governance", "ethical", "diversity", "inclusion"
    ]
    
    query = f"{company} " + " OR ".join(keywords)
    url = f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&apiKey={api_key}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        
        data = response.json()
        articles = data.get("articles", [])
        
        if not articles:
            return ["No ESG-related news found."], []

        headlines = [article["title"] for article in articles[:5]]
        links = [article["url"] for article in articles[:5]]
        
        return headlines, links

    except requests.exceptions.RequestException as e:
        st.error(f"Error fetching news: {str(e)}")
        return ["Error fetching news."], []

def categorize_esg_content(text):
    """Categorize text into ESG categories based on keyword matching."""
    text = text.lower()
    
    environmental_keywords = ["environment", "climate", "carbon", "green", "renewable", "sustainability"]
    social_keywords = ["social", "community", "diversity", "inclusion", "employee", "health", "safety"]
    governance_keywords = ["governance", "board", "ethics", "compliance", "transparency", "management"]
    
    env_score = sum(1 for keyword in environmental_keywords if keyword in text)
    soc_score = sum(1 for keyword in social_keywords if keyword in text)
    gov_score = sum(1 for keyword in governance_keywords if keyword in text)
    
    if max(env_score, soc_score, gov_score) == 0:
        return "General ESG"
    elif env_score >= max(soc_score, gov_score):
        return "Environmental"
    elif soc_score >= max(env_score, gov_score):
        return "Social"
    else:
        return "Governance"

def analyze_esg_content(news_articles):
    """Analyze news articles for ESG categories and sentiment."""
    analysis = []
    
    for article in news_articles:
        # Clean the text
        clean_text = re.sub(r'[^\w\s]', '', article)
        
        # Get sentiment using TextBlob
        blob = TextBlob(clean_text)
        sentiment = blob.sentiment.polarity
        
        # Categorize the content
        category = categorize_esg_content(clean_text)
        
        analysis.append((article, category, sentiment))
    
    return analysis

def compute_esg_score(analysis):
    """Compute ESG score based on news sentiment and categories."""
    if not analysis:
        return 50.0  # Default neutral score
        
    # Category weights
    weights = {
        "Environmental": 1.2,
        "Social": 1.0,
        "Governance": 1.1,
        "General ESG": 1.0
    }
    
    # Calculate weighted score
    total_weight = 0
    weighted_sum = 0
    
    for _, category, sentiment in analysis:
        weight = weights.get(category, 1.0)
        total_weight += weight
        weighted_sum += (sentiment + 1) * 50 * weight  # Convert sentiment to 0-100 scale
    
    if total_weight == 0:
        return 50.0
        
    final_score = weighted_sum / total_weight
    return round(max(0, min(100, final_score)), 2)

# Streamlit UI
st.title("Sustainable Investing")

company_name = st.text_input("Enter Company Name for ESG Analysis:")

if company_name:
    with st.spinner("Fetching ESG news and reports..."):
        esg_news, news_links = fetch_esg_news(company_name)
        esg_analysis = analyze_esg_content(esg_news)
        esg_score = compute_esg_score(esg_analysis)

    st.write(f"### ESG Score for {company_name}: {esg_score}/100")
    
    if esg_score > 70:
        st.success(f"{company_name} is highly ESG-compliant! 🌱✅")
    elif esg_score > 40:
        st.warning(f"{company_name} has a moderate ESG standing. ⚖️")
    else:
        st.error(f"{company_name} may not meet sustainability criteria. 🚨❌")

    display_top_news(esg_analysis, news_links)

    csv_report = generate_esg_report(company_name, esg_analysis, news_links)

    if csv_report:
        st.download_button(
            "Download ESG Report",
            data=csv_report,
            file_name=f"{company_name}_ESG_Report.csv",
            mime="text/csv"
        )
    else:
        st.warning("No relevant ESG news found. Report not generated.")

