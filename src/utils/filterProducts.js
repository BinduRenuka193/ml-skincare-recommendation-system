export function filterProducts(products, inputs) {
    const { skinType, productType, majorSkinIssue, otherSkinIssues } = inputs;
  
    return products.filter(product => {
      const matchesSkinType = product.skintype.split(',').some(type => type.trim() === skinType);
      const matchesProductType = product.product_type === productType;
      const matchesMajorSkinIssue = product.notable_effects.includes(majorSkinIssue);
      const matchesOtherSkinIssues = otherSkinIssues.every(issue => product.notable_effects.includes(issue));
  
      return matchesSkinType && matchesProductType && matchesMajorSkinIssue && matchesOtherSkinIssues;
    });
  }