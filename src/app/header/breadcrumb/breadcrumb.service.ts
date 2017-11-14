import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {

  constructor() { }

  isValid: boolean;
    getBreadcrumb(){
        return breadcrumb;
    }

    getValid(){
        return isValid;
    }
}

const isValid = {
    value: false
};
const breadcrumb = {
    id: 1,
    name: '',
    url: ''
};
