interface CategoryDTO {
    Id: number;
    Name: string;
    Heroes: any[];
  }
  
  interface GetCategoryDTO extends CategoryDTO {}
  