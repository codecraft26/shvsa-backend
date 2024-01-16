class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }


    
    filter(){
        const queryCopy={...this.queryStr};
        //removing fields from the query
        const removeFields=['sort','page','limit'];
        removeFields.forEach(el=>delete queryCopy[el]);
        //advance filter for price, ratings etc
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);
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
  