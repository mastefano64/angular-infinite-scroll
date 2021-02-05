
export class ResultItem {  
  LastItem: number;
  Items: Item[];

  constructor(){
    this.Items = [];
  }
} 

export class Item {  
  id: number;
  title: string;
  content: string;
  image: string;
} 
