class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }


    filter() {
      const queryCopy = {...this.queryStr};
  
      // Removing fields from the query
      const removeFields = ['sort', 'page', 'limit'];
      removeFields.forEach(el => delete queryCopy[el]);
  
      // Iterate over each property in queryCopy
      for (let key in queryCopy) {
          // Check if the value is an empty string or a string with just two single quotes
          if (queryCopy[key] === "''" || queryCopy[key] === "") {
              // If so, delete the key from queryCopy
              delete queryCopy[key];
          }
      }
  
      // Advance filter for price, ratings, etc.
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
      this.query.find(JSON.parse(queryStr));
  
      return this;
  }


    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sorting
            this.query = this.query.sort('-dateCreated');
        }
        return this;
    }
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resultPerPage * (currentPage - 1);
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  export default ApiFeatures;
  