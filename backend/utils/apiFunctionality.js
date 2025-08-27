class APIFunctionality {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
      const queryCopy = { ...this.queryStr };
    
      // Remove fields that are not in schema
      const removeFields = ["keyword", "page", "limit", "minPrice", "maxPrice"];
      removeFields.forEach((key) => delete queryCopy[key]);
    
      let filterObj = {};
    
      // Category filter (case-insensitive)
      if (this.queryStr.category) {
        filterObj.category = { $regex: this.queryStr.category, $options: "i" };
      }
    
      // Color filter
      if (this.queryStr.color) {
        const colors = this.queryStr.color.split(",");
        filterObj.colors = { $in: colors };
      }
    
      // Size filter
      if (this.queryStr.size) {
        const sizes = this.queryStr.size.split(",");
        filterObj["sizes.size"] = { $in: sizes };
      }
    
      // Price filter
      if (this.queryStr.minPrice || this.queryStr.maxPrice) {
        filterObj.price = {};
        if (this.queryStr.minPrice) filterObj.price.$gte = Number(this.queryStr.minPrice);
        if (this.queryStr.maxPrice) filterObj.price.$lte = Number(this.queryStr.maxPrice);
      }
    
      // Advanced operators
      let advanced = JSON.stringify(queryCopy);
      advanced = advanced.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      const advancedFilters = JSON.parse(advanced);
    
      this.query = this.query.find({ ...advancedFilters, ...filterObj });
      return this;
    }
    


    pagination(resultsPerPage){
        const page = this.queryStr.page || 1;
        const limit = this.queryStr.limit || resultsPerPage;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}

export default APIFunctionality;