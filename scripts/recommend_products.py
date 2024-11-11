from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def filter_products(products, inputs):
    # Extract user input
    skinType = inputs.get('skinType')
    productType = inputs.get('productType')
    majorSkinIssue = inputs.get('majorSkinIssue')
    otherSkinIssues = inputs.get('otherSkinIssues', [])

    # Combine notable effects and skin types for TF-IDF
    combined_features = [f"{product['notable_effects']} {product['skintype']}" for product in products]
    
    # Create TF-IDF Vectorizer
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(combined_features)
    
    # Transform user input for similarity comparison
    user_input = f"{majorSkinIssue} {skinType}"
    user_tfidf_vector = vectorizer.transform([user_input])
    
    # Calculate cosine similarity
    similarity_scores = cosine_similarity(user_tfidf_vector, tfidf_matrix)
    
    # Filter products based on product type and skin type
    filtered_products = [
        product for index, product in enumerate(products)
        if product['product_type'] == productType and skinType in product['skintype'].split(',')
    ]
    
    # Sort filtered products based on similarity scores
    filtered_with_scores = [(product, similarity_scores[0][index]) for index, product in enumerate(products) if product in filtered_products]
    
    # Sort by similarity score in descending order
    sorted_filtered = sorted(filtered_with_scores, key=lambda x: x[1], reverse=True)
    
    # Return top recommended products
    top_recommended = [product for product, score in sorted_filtered]
    return top_recommended
