def filter_products(products, inputs):
    skinType = inputs.get('skinType')
    productType = inputs.get('productType')
    majorSkinIssue = inputs.get('majorSkinIssue')
    otherSkinIssues = inputs.get('otherSkinIssues', [])

    filtered = [
        product for product in products
        if (skinType in product['skintype'].split(',') and
            product['product_type'] == productType and
            majorSkinIssue in product['notable_effects'] and
            all(issue in product['notable_effects'] for issue in otherSkinIssues))
    ]

    return filtered
