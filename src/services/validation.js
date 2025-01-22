export function validateField(name, formData) {
    const errors = {};
  
    switch (name) {
      case "street":
        if (!formData.location.street) errors.street = "Street name is required.";
        break;
      case "houseNumber":
        if (!formData.location.houseNumber)
          errors.houseNumber = "House number is required.";
        break;
      case "zip":
        if (!formData.location.zip) errors.zip = "Postal code is required.";
        break;
      case "city":
        if (!formData.location.city) errors.city = "City is required.";
        break;
      case "price":
        if (!formData.price || isNaN(formData.price))
          errors.price = "Price must be a valid number.";
        break;
      case "size":
        if (!formData.size || isNaN(formData.size))
          errors.size = "Size must be a valid number.";
        break;
      case "bedrooms":
        if (!formData.rooms.bedrooms || isNaN(formData.rooms.bedrooms))
          errors.bedrooms = "Bedrooms must be a valid number.";
        break;
      case "bathrooms":
        if (!formData.rooms.bathrooms || isNaN(formData.rooms.bathrooms))
          errors.bathrooms = "Bathrooms must be a valid number.";
        break;
      case "constructionYear":
        if (!formData.constructionYear || isNaN(formData.constructionYear))
          errors.constructionYear = "Construction year must be a valid number.";
        break;
      case "description":
        if (!formData.description) errors.description = "Description is required.";
        break;
      case "image":
        if (!formData.previewUrl) errors.image = "Image is required.";
        break;
    }
  
    return errors;
  }